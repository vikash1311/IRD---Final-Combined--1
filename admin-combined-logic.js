// IRD Combined Admin Panel Logic - Preserving Original Functionality

// Supabase Configuration
const SUPABASE_URL = 'https://uskimhkxfrsshmqsnyjd.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVza2ltaGt4ZnJzc2htcXNueWpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU4ODAwNDUsImV4cCI6MjA4MTQ1NjA0NX0.b-QY0KnPBJ10VICATu2xB124ehL8c9ZToj8js6g5DJk';

const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);

// Global Variables
const STORAGE_BUCKET = 'blog-images';
let selectedFile = null;
let editingId = null;
let editingArchiveId = null;
let allBlogs = [];
let allArchives = [];

// Initialize
checkAuth();

// ==================== AUTH FUNCTIONS ====================
async function checkAuth() {
    try {
        const { data: { session }, error } = await supabaseClient.auth.getSession();
        
        if (error) {
            console.error('Auth error:', error);
            showLogin();
            return;
        }
        
        if (session) {
            showDashboard(session.user.email);
            await loadBlogs();
            await loadArchives();
        } else {
            showLogin();
        }
    } catch (error) {
        console.error('Auth check error:', error);
        showLogin();
    }
}

function showLogin() {
    document.getElementById('loginScreen').style.display = 'flex';
    document.getElementById('adminDashboard').style.display = 'none';
}

function showDashboard(email) {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('adminDashboard').style.display = 'block';
    document.getElementById('userEmail').textContent = email;
}

// Login Form
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const errorDiv = document.getElementById('loginError');
    const loginBtn = document.getElementById('loginBtn');
    
    errorDiv.style.display = 'none';
    loginBtn.disabled = true;
    loginBtn.innerHTML = '<span class="material-icons">hourglass_empty</span> Logging in...';
    
    try {
        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email,
            password
        });
        
        if (error) throw error;
        await checkAuth();
    } catch (error) {
        console.error('Login error:', error);
        errorDiv.textContent = error.message || 'Login failed. Please check your credentials.';
        errorDiv.style.display = 'flex';
    } finally {
        loginBtn.disabled = false;
        loginBtn.innerHTML = '<span class="material-icons">lock_open</span> Login';
    }
});

async function logout() {
    await supabaseClient.auth.signOut();
    location.reload();
}

// ==================== TAB SWITCHING ====================
function switchTab(tab) {
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.closest('.tab-btn').classList.add('active');
    
    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    document.getElementById(`${tab}-tab`).classList.add('active');
}

// ==================== BLOG MANAGEMENT ====================
async function loadBlogs() {
    const list = document.getElementById('blogsList');
    const loading = document.getElementById('loadingState');
    const empty = document.getElementById('emptyState');
    const setupWarning = document.getElementById('setupWarning');
    
    list.innerHTML = '';
    loading.style.display = 'flex';
    empty.style.display = 'none';
    setupWarning.style.display = 'none';
    
    try {
        const { data, error } = await supabaseClient
            .from('blog_posts')
            .select('*')
            .order('year', { ascending: false })
            .order('created_at', { ascending: false });
        
        loading.style.display = 'none';
        
        if (error) {
            console.error('Load error:', error);
            
            if (error.code === 'PGRST116' || error.message.includes('relation') || error.message.includes('does not exist')) {
                setupWarning.style.display = 'flex';
            } else {
                showError('Error loading blog posts: ' + error.message);
            }
            return;
        }
        
        allBlogs = data || [];
        updateStats(allBlogs);
        populateYearFilter(allBlogs);
        renderBlogs(allBlogs);
        
    } catch (error) {
        loading.style.display = 'none';
        console.error('Unexpected error:', error);
        showError('Unexpected error loading blog posts.');
    }
}
// Add this function to your admin UI JavaScript
async function updateHomepageWithNewBlog(blogData) {
    try {
        // First, get all existing blogs
        const response = await fetch('/api/get-blogs'); // You'll need to create this endpoint
        const allBlogs = await response.json();
        
        // Add the new blog to the list
        allBlogs.push(blogData);
        
        // Update the homepage
        const updateResponse = await fetch('/api/update-homepage-blog', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ blogs: allBlogs })
        });
        
        const result = await updateResponse.json();
        
        if (result.success) {
            console.log('✅ Homepage updated with new blog');
            alert('Blog saved and homepage updated!');
        } else {
            console.error('❌ Failed to update homepage:', result.error);
        }
        
    } catch (error) {
        console.error('❌ Error updating homepage:', error);
    }
}

// Modify your save function to call this
async function saveBlog() {
    const blogData = {
        title: document.getElementById('blogTitle').value,
        slug: document.getElementById('blogSlug').value,
        content: document.getElementById('blogContent').value,
        excerpt: document.getElementById('blogExcerpt').value || '',
        image: document.getElementById('blogImage').value || 'wp-content/uploads/2024/06/blog-explore.jpg',
        date: new Date().toISOString()
    };
    
    // Save the blog file
    const saveResponse = await fetch('/api/save-blog', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            slug: blogData.slug,
            html: generateBlogHTML(blogData),
            title: blogData.title
        })
    });
    
    const result = await saveResponse.json();
    
    if (result.success) {
        // Update the homepage
        await updateHomepageWithNewBlog(blogData);
    }
}
function updateStats(blogs) {
    document.getElementById('totalBlogs').textContent = blogs.length;
    
    const currentYear = new Date().getFullYear();
    const yearBlogs = blogs.filter(blog => blog.year == currentYear).length;
    document.getElementById('yearBlogs').textContent = yearBlogs;
    
    if (blogs.length > 0) {
        const latest = blogs[0];
        document.getElementById('lastUpdated').textContent = latest.year;
    }
    
    const storageMB = Math.round(blogs.length * 0.5);
    document.getElementById('storageUsed').textContent = storageMB + 'MB';
}

function populateYearFilter(blogs) {
    const filterSelect = document.getElementById('filterYear');
    if (!filterSelect) return;
    
    const years = [...new Set(blogs.map(blog => blog.year))].sort((a, b) => b - a);
    
    filterSelect.innerHTML = '<option value="">All Years</option>';
    
    years.forEach(year => {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        filterSelect.appendChild(option);
    });
}

function renderBlogs(blogs) {
    const list = document.getElementById('blogsList');
    const empty = document.getElementById('emptyState');
    
    if (!list) return;
    
    list.innerHTML = '';
    
    if (blogs.length === 0) {
        empty.style.display = 'block';
        return;
    }
    
    empty.style.display = 'none';
    
    blogs.forEach(blog => {
        const card = document.createElement('div');
        card.className = 'blog-card';
        
        const blogJson = JSON.stringify(blog).replace(/"/g, '&quot;');
        
// In renderBlogs function, update the delete button:
        card.innerHTML = `
            <div class="blog-image-container">
                <img src="${escapeHtml(blog.image_url)}" class="blog-image" alt="${escapeHtml(blog.title)}" onerror="this.src='https://placehold.co/600x400/1a1a1a/808080?text=No+Image'">
                <span class="blog-badge">${blog.year}</span>
            </div>
            <div class="blog-content">
                <div class="blog-year">Year ${blog.year}</div>
                <h3 class="blog-title">${escapeHtml(blog.title)}</h3>
                <p class="blog-excerpt">${escapeHtml(blog.excerpt?.substring(0, 150) || 'No excerpt provided')}${blog.excerpt?.length > 150 ? '...' : ''}</p>
                <div class="blog-slug">/${blog.slug}.html</div>
                <div class="blog-actions">
                    <button class="btn btn-edit" onclick="editBlog(${blog.id})">
                        <span class="material-icons">edit</span>
                        Edit
                    </button>
                    <button class="btn btn-delete" onclick="deleteBlogWithImages(${blog.id})">
                        <span class="material-icons">delete</span>
                        Delete Blog & Images
                    </button>
                    <button class="btn btn-primary" onclick='generateSingleBlog(${blogJson})'>
                        <span class="material-icons">code</span>
                        Generate HTML
                    </button>
                </div>
            </div>
        `;
        
        list.appendChild(card);
    });
}

function filterBlogs() {
    const searchTerm = document.getElementById('searchBlogs')?.value.toLowerCase() || '';
    const selectedYear = document.getElementById('filterYear')?.value || '';
    const sortBy = document.getElementById('filterSort')?.value || 'newest';
    
    let filteredBlogs = allBlogs.filter(blog => {
        const matchesSearch = blog.title.toLowerCase().includes(searchTerm) || 
                            blog.excerpt.toLowerCase().includes(searchTerm) ||
                            blog.slug.toLowerCase().includes(searchTerm) ||
                            blog.content.toLowerCase().includes(searchTerm);
        const matchesYear = !selectedYear || blog.year.toString() === selectedYear;
        
        return matchesSearch && matchesYear;
    });
    
    switch(sortBy) {
        case 'newest':
            filteredBlogs.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            break;
        case 'oldest':
            filteredBlogs.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
            break;
        case 'year-desc':
            filteredBlogs.sort((a, b) => b.year - a.year);
            break;
        case 'year-asc':
            filteredBlogs.sort((a, b) => a.year - b.year);
            break;
    }
    
    renderBlogs(filteredBlogs);
}

function openAddModal() {
    editingId = null;
    document.getElementById('modalTitleText').textContent = 'Add New Blog Post';
    document.getElementById('blogForm').reset();
    document.getElementById('imagePreviewContainer').style.display = 'none';
    document.getElementById('uploadProgress').style.display = 'none';
    document.getElementById('blogModal').classList.add('active');
}

async function editBlog(id) {
    editingId = id;
    document.getElementById('modalTitleText').textContent = 'Edit Blog Post';
    
    try {
        const { data, error } = await supabaseClient
            .from('blog_posts')
            .select('*')
            .eq('id', id)
            .single();
        
        if (error) throw error;
        
        document.getElementById('blogId').value = data.id;
        document.getElementById('blogYear').value = data.year || '';
        document.getElementById('blogTitle').value = data.title || '';
        document.getElementById('blogSlug').value = data.slug || '';
        document.getElementById('blogImage').value = data.image_url || '';
        document.getElementById('blogExcerpt').value = data.excerpt || '';
        document.getElementById('blogContent').value = data.content || '';
        // Set image URL in the URL input field
        document.getElementById('imageUrlInput').value = data.image_url || '';
                
                // Show preview
        const preview = document.getElementById('imagePreview');
        const previewContainer = document.getElementById('imagePreviewContainer');
        if (data.image_url) {
            preview.src = data.image_url;
            previewContainer.style.display = 'block';
        }
                
                // Clear file upload
        document.getElementById('imageUpload').value = '';
        selectedFile = null;
        document.getElementById('blogModal').classList.add('active');
    } catch (error) {
        console.error('Edit error:', error);
        showError('Error loading blog post: ' + error.message);
    }
}

function closeModal() {
    document.getElementById('blogModal').classList.remove('active');
}


document.getElementById('imageUpload').addEventListener('change', handleImageSelect);
document.getElementById('useUrlBtn').addEventListener('click', useImageUrl);
// Drag and drop for image upload
        const imageUploadContainer = document.getElementById('imageUploadContainer');
        if (imageUploadContainer) {
            imageUploadContainer.addEventListener('dragover', (e) => {
                e.preventDefault();
                imageUploadContainer.classList.add('drag-over');
            });
            
            imageUploadContainer.addEventListener('dragleave', () => {
                imageUploadContainer.classList.remove('drag-over');
            });
            
            imageUploadContainer.addEventListener('drop', (e) => {
                e.preventDefault();
                imageUploadContainer.classList.remove('drag-over');
                
                if (e.dataTransfer.files.length) {
                    document.getElementById('imageUpload').files = e.dataTransfer.files;
                    handleImageSelect({ target: document.getElementById('imageUpload') });
                }
            });
        }
async function handleImageSelect(e) {
            selectedFile = e.target.files[0];
            
            if (!selectedFile) return;
            
            // Validate file
            if (selectedFile.size > 5 * 1024 * 1024) {
                showError('File size must be less than 5MB');
                return;
            }
            
            const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
            if (!validTypes.includes(selectedFile.type)) {
                showError('Please upload a valid image file (JPG, PNG, GIF, WebP)');
                return;
            }
            
            // Show preview
            const reader = new FileReader();
            reader.onload = function(e) {
                const preview = document.getElementById('imagePreview');
                preview.src = e.target.result;
                document.getElementById('imagePreviewContainer').style.display = 'block';
            };
            reader.readAsDataURL(selectedFile);
            
            // Upload image
            await uploadImage();
        }
        
        async function uploadImage() {
            if (!selectedFile) return;
            
            const uploadProgress = document.getElementById('uploadProgress');
            const progressBar = document.getElementById('progressBar');
            const progressPercent = document.getElementById('progressPercent');
            const submitBtn = document.getElementById('submitBtn');
            
            uploadProgress.style.display = 'block';
            submitBtn.disabled = true;
            
            try {
                // Generate unique filename
                const fileExt = selectedFile.name.split('.').pop().toLowerCase();
                const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
                const filePath = fileName;
                
                // Upload to Supabase Storage
                const { data, error } = await supabaseClient.storage
                    .from(STORAGE_BUCKET)
                    .upload(filePath, selectedFile, {
                        cacheControl: '3600',
                        upsert: false
                    });
                
                if (error) throw error;
                
                // Get public URL
                const { data: urlData } = supabaseClient.storage
                    .from(STORAGE_BUCKET)
                    .getPublicUrl(filePath);
                
                const publicUrl = urlData.publicUrl;
                
                // Set the image URL
                document.getElementById('blogImage').value = publicUrl;
                document.getElementById('imageUrlInput').value = publicUrl;
                
                // Show success
                progressBar.style.width = '100%';
                progressPercent.textContent = '100%';
                
                setTimeout(() => {
                    uploadProgress.style.display = 'none';
                    showSuccess('Image uploaded successfully!');
                }, 500);
                
            } catch (error) {
                console.error('Upload error:', error);
                showError(`Upload failed: ${error.message}`);
            } finally {
                submitBtn.disabled = false;
            }
        }
        
        function useImageUrl() {
            const url = document.getElementById('imageUrlInput').value.trim();
            
            if (!url) {
                showError('Please enter a valid URL');
                return;
            }
            
            // Validate URL
            try {
                new URL(url);
            } catch (e) {
                showError('Please enter a valid URL (include http:// or https://)');
                return;
            }
            
            // Set the image URL
            document.getElementById('blogImage').value = url;
            
            // Update preview
            const preview = document.getElementById('imagePreview');
            const previewContainer = document.getElementById('imagePreviewContainer');
            preview.src = url;
            previewContainer.style.display = 'block';
            
            // Clear file selection
            document.getElementById('imageUpload').value = '';
            selectedFile = null;
            
            showSuccess('URL set successfully!');
        }
        
        function clearImage() {
            document.getElementById('blogImage').value = '';
            document.getElementById('imageUrlInput').value = '';
            document.getElementById('imageUpload').value = '';
            document.getElementById('imagePreviewContainer').style.display = 'none';
            selectedFile = null;
        }
document.getElementById('blogTitle').addEventListener('input', function(e) {
    if (!editingId) {
        const title = e.target.value.trim();
        if (title) {
            const slug = title
                .toLowerCase()
                .replace(/[^\w\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-');
            
            document.getElementById('blogSlug').value = slug;
            updateSlugPreview();
        }
    }
});

document.getElementById('generateSlugBtn').addEventListener('click', function() {
    const title = document.getElementById('blogTitle').value.trim();
    if (title) {
        const slug = title
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-');
        
        document.getElementById('blogSlug').value = slug;
        updateSlugPreview();
    } else {
        showError('Please enter a title first');
    }
});

document.getElementById('blogSlug').addEventListener('input', function() {
    updateSlugPreview();
});

function updateSlugPreview() {
    const slug = document.getElementById('blogSlug').value.trim();
    document.getElementById('slugPreview').textContent = `/${slug || 'blog-slug'}.html`;
}

document.getElementById('blogForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="material-icons">hourglass_empty</span> Saving...';
    
    try {
        const year = parseInt(document.getElementById('blogYear').value);
        const title = document.getElementById('blogTitle').value.trim();
        const slug = document.getElementById('blogSlug').value.trim().toLowerCase().replace(/\s+/g, '-');
        const imageUrl = document.getElementById('blogImage').value.trim();
        const excerpt = document.getElementById('blogExcerpt').value.trim();
        const content = document.getElementById('blogContent').value.trim();
        
        if (!slug) throw new Error('Slug is required');
        if (!imageUrl) throw new Error('Image URL is required');
        
        if (!editingId) {
            const { data: existingPosts, error: checkError } = await supabaseClient
                .from('blog_posts')
                .select('slug')
                .eq('slug', slug);
            
            if (checkError) throw checkError;
            
            if (existingPosts && existingPosts.length > 0) {
                throw new Error(`Slug "${slug}" already exists. Please use a different slug.`);
            }
        }
        
        const blogData = { year, title, slug, image_url: imageUrl, excerpt, content };
        
        if (editingId) {
            const { data: currentPost, error: fetchError } = await supabaseClient
                .from('blog_posts')
                .select('slug')
                .eq('id', editingId)
                .single();
            
            if (fetchError) throw fetchError;
            
            if (currentPost.slug !== slug) {
                const { data: existingPosts, error: slugCheckError } = await supabaseClient
                    .from('blog_posts')
                    .select('slug')
                    .eq('slug', slug)
                    .neq('id', editingId);
                
                if (slugCheckError) throw slugCheckError;
                
                if (existingPosts && existingPosts.length > 0) {
                    throw new Error(`Slug "${slug}" already exists. Please use a different slug.`);
                }
            }
            
            const { error } = await supabaseClient
                .from('blog_posts')
                .update(blogData)
                .eq('id', editingId);
            
            if (error) throw error;
            
            showSuccess('Blog post updated successfully!');
        } else {
            const { error } = await supabaseClient
                .from('blog_posts')
                .insert([blogData]);
            
            if (error) throw error;
            
            showSuccess('Blog post created successfully!');
        }
        
        closeModal();
        await loadBlogs();
        
    } catch (error) {
        console.error('Save error:', error);
        showError('Error: ' + error.message);
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span class="material-icons">save</span> Save Blog Post';
    }
});

async function deleteBlog(id, slug) {
    if (!confirm('Are you sure you want to delete this blog post? This will also delete the generated HTML file.')) return;
    
    try {

        const { data: blog, error: fetchError } = await supabaseClient
            .from('blog_posts')
            .select('slug, title, image_url')
            .eq('id', id)
            .single();
        
        if (fetchError) throw fetchError;
        
        // Step 1: Delete the image from Supabase Storage (if it's in our bucket)
        let storageDeleted = false;
        if (blog.image_url && isOurStorageImage(blog.image_url)) {
            storageDeleted = await deleteImageFromStorage(blog.image_url);
        }

        // Step 2: Delete the blog post from the database
        const { error: deleteError } = await supabaseClient
            .from('blog_posts')
            .delete()
            .eq('id', id);
            
        
        if (deleteError) throw deleteError;
        
        try {
            await fetch('http://localhost:3000/api/delete-blog', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ filename: `${slug}.html` })
            });
        } catch (fileError) {
            console.warn('HTML file deletion failed:', fileError);
        }
        
        showSuccess('Blog post deleted successfully!');
        await loadBlogs();
    } catch (error) {
        console.error('Delete error:', error);
        showError('Error deleting blog: ' + error.message);
    }
}
function isOurStorageImage(imageUrl) {
    return imageUrl.includes('supabase.co/storage/v1/object/public/blog-images/');
}
async function deleteImageFromStorage(imageUrl) {
    try {
        // Extract the file path from the URL
        const url = new URL(imageUrl);
        const pathParts = url.pathname.split('/');
        
        // Find the path after 'blog-images/'
        const blogImagesIndex = pathParts.indexOf('blog-images');
        if (blogImagesIndex === -1) return false;
        
        // Get the file path relative to bucket
        const filePath = pathParts.slice(blogImagesIndex + 1).join('/');
        
        console.log('Deleting image from storage:', filePath);
        
        // Delete from Supabase Storage
        const { data, error } = await supabaseClient.storage
            .from('blog-images')
            .remove([filePath]);
        
        if (error) {
            console.warn('Failed to delete image from storage:', error.message);
            return false;
        }
        
        console.log('✅ Image deleted from storage:', filePath);
        return true;
        
    } catch (error) {
        console.error('Error deleting image from storage:', error);
        return false;
    }
}
// Function to extract all image URLs from blog content
function extractImageUrlsFromContent(content) {
    const imageUrls = [];
    
    try {
        // Parse HTML content to find img tags
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = content;
        
        const imgTags = tempDiv.querySelectorAll('img');
        imgTags.forEach(img => {
            const src = img.getAttribute('src');
            if (src && isOurStorageImage(src)) {
                imageUrls.push(src);
            }
        });
        
        // Also look for image URLs in the content text
        const urlRegex = /https:\/\/[^\s"']+\.(jpg|jpeg|png|gif|webp)/gi;
        const matches = content.match(urlRegex) || [];
        matches.forEach(url => {
            if (isOurStorageImage(url)) {
                imageUrls.push(url);
            }
        });
        
    } catch (error) {
        console.error('Error extracting image URLs:', error);
    }
    
    return [...new Set(imageUrls)]; // Remove duplicates
}

// Enhanced delete function that handles all images
async function deleteBlogWithImages(id) {
    if (!confirm('Are you sure? This will delete the blog and all its images from storage.')) return;
    
    try {
        // Get complete blog data
        const { data: blog, error: fetchError } = await supabaseClient
            .from('blog_posts')
            .select('*')
            .eq('id', id)
            .single();
        
        if (fetchError) throw fetchError;
        
        // Collect all image URLs to delete
        const imagesToDelete = [];
        
        // 1. Featured image
        if (blog.image_url && isOurStorageImage(blog.image_url)) {
            imagesToDelete.push(blog.image_url);
        }
        
        // 2. Images in content
        if (blog.content) {
            const contentImages = extractImageUrlsFromContent(blog.content);
            imagesToDelete.push(...contentImages);
        }
        
        // Delete all images from storage
        let deletedImageCount = 0;
        for (const imageUrl of [...new Set(imagesToDelete)]) { // Remove duplicates
            const deleted = await deleteImageFromStorage(imageUrl);
            if (deleted) deletedImageCount++;
        }
        
        // Delete from database
        const { error: deleteError } = await supabaseClient
            .from('blog_posts')
            .delete()
            .eq('id', id);
        
        if (deleteError) throw deleteError;
        
        // Delete HTML file
        await deleteBlogFile(blog.slug);
        
        // Show success message
        let message = `Blog "${blog.title}" deleted successfully!`;
        if (deletedImageCount > 0) {
            message += ` ${deletedImageCount} image(s) removed from storage.`;
        }
        
        showSuccess(message);
        await loadBlogs();
        
    } catch (error) {
        console.error('Delete error:', error);
        showError('Error deleting blog: ' + error.message);
    }
}
// Improved error handling for delete
async function safeDeleteBlog(id) {
    try {
        const result = await deleteBlogWithImages(id);
        return result;
    } catch (error) {
        console.error('Safe delete error:', error);
        
        // Try to at least delete from database
        try {
            await supabaseClient
                .from('blog_posts')
                .delete()
                .eq('id', id);
            
            showWarning('Blog deleted from database but some files may remain. Check console for details.');
            
        } catch (dbError) {
            showError('Complete deletion failed: ' + error.message);
        }
    }
}

async function exportBlogs() {
    try {
        const { data, error } = await supabaseClient
            .from('blog_posts')
            .select('*')
            .order('year', { ascending: false });
        
        if (error) throw error;
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `blogs-backup-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        showSuccess(`Exported ${data.length} blog posts successfully!`);
    } catch (error) {
        showError('Export failed: ' + error.message);
    }
}

document.getElementById('importFile').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    if (!confirm('This will import blogs. Existing posts with same slugs will be skipped. Continue?')) {
        e.target.value = '';
        return;
    }
    
    const reader = new FileReader();
    reader.onload = async (e) => {
        try {
            const blogs = JSON.parse(e.target.result);
            let imported = 0;
            let skipped = 0;
            
            for (const blog of blogs) {
                const { data: existing } = await supabaseClient
                    .from('blog_posts')
                    .select('id')
                    .eq('slug', blog.slug)
                    .single();
                
                if (!existing) {
                    const { error } = await supabaseClient
                        .from('blog_posts')
                        .insert([blog]);
                    
                    if (!error) imported++;
                } else {
                    skipped++;
                }
            }
            
            showSuccess(`Import complete! Imported: ${imported}, Skipped (duplicates): ${skipped}`);
            await loadBlogs();
        } catch (error) {
            showError('Import failed: ' + error.message);
        }
    };
    reader.readAsText(file);
    e.target.value = '';
});

async function generateSingleBlog(blogData) {
    try {
        const fileName = await generateBlogHTML(blogData);
        showSuccess(`Generated: ${fileName}`);
    } catch (error) {
        console.error('Generate blog error:', error);
        showError('Failed to generate HTML: ' + error.message);
    }
}

async function generateAllBlogs() {
    if (!allBlogs || allBlogs.length === 0) {
        showError('No blogs to generate');
        return;
    }
    
    if (!confirm(`Generate HTML files for all ${allBlogs.length} blogs?`)) return;
    
    try {
        const result = await generateAllBlogsHTML(allBlogs);
        showSuccess(`Generated HTML files for ${result.count} blogs!`);
    } catch (error) {
        showError('Bulk generation failed: ' + error.message);
    }
}

function refreshBlogs() {
    loadBlogs();
    showSuccess('Blog list refreshed!');
}

// Event listeners for search and filter
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('searchBlogs')?.addEventListener('input', filterBlogs);
    document.getElementById('filterYear')?.addEventListener('change', filterBlogs);
    document.getElementById('filterSort')?.addEventListener('change', filterBlogs);
    document.getElementById('clearFilters')?.addEventListener('click', function() {
        document.getElementById('searchBlogs').value = '';
        document.getElementById('filterYear').value = '';
        document.getElementById('filterSort').value = 'newest';
        filterBlogs();
    });
    
    updateSlugPreview();
});

document.getElementById('blogModal').addEventListener('click', (e) => {
    if (e.target.id === 'blogModal') {
        closeModal();
    }
});

// ==================== ARCHIVES MANAGEMENT ====================
async function loadArchives() {
    const list = document.getElementById('archivesList');
    const loading = document.getElementById('archivesLoading');
    const empty = document.getElementById('archivesEmpty');
    const setupWarning = document.getElementById('archivesSetupWarning');
    
    list.innerHTML = '';
    loading.style.display = 'flex';
    empty.style.display = 'none';
    setupWarning.style.display = 'none';
    
    try {
        const { data, error } = await supabaseClient
            .from('press_articles')
            .select('*')
            .order('year', { ascending: false })
            .order('created_at', { ascending: false });
        
        loading.style.display = 'none';
        
        if (error) {
            console.error('Load error:', error);
            
            if (error.code === 'PGRST116' || error.message.includes('relation') || error.message.includes('does not exist')) {
                setupWarning.style.display = 'flex';
            } else {
                showError('Error loading articles: ' + error.message);
            }
            return;
        }
        
        allArchives = data || [];
        updateArchiveStats(allArchives);
        renderArchives(allArchives);
        
    } catch (error) {
        loading.style.display = 'none';
        console.error('Unexpected error:', error);
        showError('Unexpected error loading articles.');
    }
}

function updateArchiveStats(archives) {
    document.getElementById('totalArticles').textContent = archives.length;
    
    const currentYear = new Date().getFullYear();
    const yearArticles = archives.filter(article => article.year == currentYear).length;
    document.getElementById('yearArticles').textContent = yearArticles;
}

function renderArchives(archives) {
    const list = document.getElementById('archivesList');
    const empty = document.getElementById('archivesEmpty');
    
    if (!list) return;
    
    list.innerHTML = '';
    
    if (archives.length === 0) {
        empty.style.display = 'block';
        return;
    }
    
    empty.style.display = 'none';
    
    archives.forEach(article => {
        const card = document.createElement('div');
        card.className = 'article-card';
        card.innerHTML = `
            <div class="article-year">${article.year}</div>
            ${article.date ? `<div style="color: var(--black-50); font-size: 12px; margin-bottom: 5px;">${escapeHtml(article.date)}</div>` : ''}
            <div class="article-title">${escapeHtml(article.title)}${article.subtitle ? ` - ${escapeHtml(article.subtitle)}` : ''}</div>
            <div class="article-content" style="white-space: pre-wrap;">${escapeHtml(article.content?.substring(0, 200) || '')}${article.content?.length > 200 ? '...' : ''}</div>
            <div class="article-actions">
                <button class="btn btn-edit" onclick="editArchive(${article.id})">
                    <span class="material-icons" style="font-size: 16px;">edit</span>
                    Edit
                </button>
                <button class="btn btn-delete" onclick="deleteArchive(${article.id})">
                    <span class="material-icons" style="font-size: 16px;">delete</span>
                    Delete
                </button>
            </div>
        `;
        list.appendChild(card);
    });
}

function openArchiveModal() {
    editingArchiveId = null;
    document.getElementById('archiveModalTitle').textContent = 'Add Article';
    document.getElementById('archiveForm').reset();
    document.getElementById('archiveModal').classList.add('active');
}

async function editArchive(id) {
    editingArchiveId = id;
    document.getElementById('archiveModalTitle').textContent = 'Edit Article';
    
    try {
        const { data, error } = await supabaseClient
            .from('press_articles')
            .select('*')
            .eq('id', id)
            .single();
        
        if (error) throw error;
        
        document.getElementById('archiveId').value = data.id;
        document.getElementById('archiveYear').value = data.year || '';
        document.getElementById('archiveDate').value = data.date || '';
        document.getElementById('archiveTitle').value = data.title || '';
        document.getElementById('archiveSubtitle').value = data.subtitle || '';
        document.getElementById('archiveContent').value = data.content || '';
        document.getElementById('articleLinks').value = data.links?.join('\n') || '';
        document.getElementById('archiveModal').classList.add('active');
    } catch (error) {
        console.error('Edit error:', error);
        showError('Error loading article: ' + error.message);
    }
}

function closeArchiveModal() {
    document.getElementById('archiveModal').classList.remove('active');
}

document.getElementById('archiveForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = document.getElementById('archiveSubmitBtn');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="material-icons">hourglass_empty</span> Saving...';
    
    try {
        const year = parseInt(document.getElementById('archiveYear').value);
        const date = document.getElementById('archiveDate').value.trim();
        const title = document.getElementById('archiveTitle').value.trim();
        const subtitle = document.getElementById('archiveSubtitle').value.trim();
        const content = document.getElementById('archiveContent').value.trim();
        const linksText = document.getElementById('articleLinks').value.trim();
        const links = linksText ? linksText.split('\n').map(l => l.trim()).filter(l => l) : [];

        const articleData = {
            year,
            date: date || null,
            title,
            subtitle: subtitle || null,
            content,
            links
        };
        
        if (editingArchiveId) {
            const { error } = await supabaseClient
                .from('press_articles')
                .update(articleData)
                .eq('id', editingArchiveId);
            
            if (error) throw error;
            showSuccess('Article updated successfully!');
        } else {
            const { error } = await supabaseClient
                .from('press_articles')
                .insert([articleData]);
            
            if (error) throw error;
            showSuccess('Article created successfully!');
        }
        
        closeArchiveModal();
        await loadArchives();
        
    } catch (error) {
        console.error('Save error:', error);
        showError('Error: ' + error.message);
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span class="material-icons">save</span> Save Article';
    }
});

async function deleteArchive(id) {
    if (!confirm('Are you sure you want to delete this article? This action cannot be undone.')) return;
    
    try {
        const { error } = await supabaseClient
            .from('press_articles')
            .delete()
            .eq('id', id);
        
        if (error) throw error;
        
        showSuccess('Article deleted successfully!');
        await loadArchives();
    } catch (error) {
        console.error('Delete error:', error);
        showError('Error deleting article: ' + error.message);
    }
}

function refreshArchives() {
    loadArchives();
    showSuccess('Archives refreshed!');
}

document.getElementById('archiveModal').addEventListener('click', (e) => {
    if (e.target.id === 'archiveModal') {
        closeArchiveModal();
    }
});

// ==================== UTILITY FUNCTIONS ====================
// ==================== UTILITY FUNCTIONS ====================
// ... existing functions ...

async function deleteBlogFile(slug) {
    try {
        const response = await fetch('http://localhost:3000/api/delete-blog', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ filename: `${slug}.html` })
        });
        
        const result = await response.json();
        
        if (result.success) {
            console.log(`✅ HTML file deleted: ${slug}.html`);
            return true;
        } else {
            console.warn(`⚠️ HTML file deletion failed: ${result.error}`);
            return false;
        }
    } catch (error) {
        console.warn('HTML file deletion failed:', error);
        return false;
    }
}

// ... continue with existing code ...
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'status-message status-success';
    successDiv.style.cssText = 'position: fixed; top: 20px; right: 20px; z-index: 10000; max-width: 400px;';
    successDiv.innerHTML = `
        <span class="material-icons">check_circle</span>
        <div>${escapeHtml(message)}</div>
    `;
    
    document.body.appendChild(successDiv);
    setTimeout(() => successDiv.remove(), 5000);
}

function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'status-message status-error';
    errorDiv.style.cssText = 'position: fixed; top: 20px; right: 20px; z-index: 10000; max-width: 400px;';
    errorDiv.innerHTML = `
        <span class="material-icons">error</span>
        <div>${escapeHtml(message)}</div>
    `;
    
    document.body.appendChild(errorDiv);
    setTimeout(() => errorDiv.remove(), 7000);
}

function showWarning(message) {
    const warningDiv = document.createElement('div');
    warningDiv.className = 'status-message status-warning';
    warningDiv.style.cssText = 'position: fixed; top: 20px; right: 20px; z-index: 10000; max-width: 400px;';
    warningDiv.innerHTML = `
        <span class="material-icons">warning</span>
        <div>${escapeHtml(message)}</div>
    `;
    
    document.body.appendChild(warningDiv);
    setTimeout(() => warningDiv.remove(), 7000);
}
