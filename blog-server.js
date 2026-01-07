// blog-server.js - Node.js server to save blog HTML files
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Serve static files (your admin UI)
app.use(express.static(__dirname));

// API endpoint to save blog HTML
// In blog-server.js
app.post('/api/save-blog', (req, res) => {
    try {
        const { slug, html, title } = req.body;
        
        if (!slug || !html) {
            return res.status(400).json({ 
                success: false, 
                error: 'Slug and HTML content are required' 
            });
        }
        
        // Sanitize filename
        const cleanSlug = slug.toLowerCase()
            .replace(/[^a-z0-9\-]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
        
        const filename = `${cleanSlug}.html`;
        const filepath = path.join(__dirname, filename);
        
        // Save file automatically
        fs.writeFileSync(filepath, html, 'utf8');
        
        console.log(`✅ AUTO-SAVED: ${filename}`);
        
        res.json({
            success: true,
            file: filename,
            path: filepath,
            message: `Blog auto-saved as ${filename}`
        });
        
    } catch (error) {
        console.error('❌ Auto-save error:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

app.post('/api/save-blogs', (req, res) => {
    try {
        const blogs = req.body.blogs;
        
        if (!Array.isArray(blogs) || blogs.length === 0) {
            return res.status(400).json({
                success: false,
                error: 'Array of blogs is required'
            });
        }
        
        const results = [];
        
        blogs.forEach((blog, index) => {
            try {
                const cleanSlug = blog.slug.toLowerCase()
                    .replace(/[^a-z0-9\-]/g, '-')
                    .replace(/-+/g, '-')
                    .replace(/^-|-$/g, '');
                
                const filename = `${cleanSlug}.html`;
                const filepath = path.join(__dirname, filename);
                
                // Auto-save each file
                fs.writeFileSync(filepath, blog.html, 'utf8');
                results.push({
                    title: blog.title,
                    file: filename,
                    success: true
                });
                
                console.log(`✅ AUTO-SAVED ${index + 1}. ${filename}`);
                
            } catch (error) {
                results.push({
                    title: blog.title,
                    error: error.message,
                    success: false
                });
            }
        });
        
        res.json({
            success: true,
            count: results.filter(r => r.success).length,
            total: blogs.length,
            results: results
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// API endpoint to save multiple blogs

// Add to blog-server.js (after other API endpoints)
app.post('/api/delete-blog', (req, res) => {
    try {
        const { filename } = req.body;
        
        if (!filename) {
            return res.status(400).json({ 
                success: false, 
                error: 'Filename is required' 
            });
        }
        
        // Security: Only allow .html files
        if (!filename.endsWith('.html')) {
            return res.status(400).json({ 
                success: false, 
                error: 'Only .html files can be deleted' 
            });
        }
        
        const filepath = path.join(__dirname, filename);
        
        // Check if file exists
        if (!fs.existsSync(filepath)) {
            return res.json({
                success: true,
                message: `File ${filename} does not exist (already deleted?)`
            });
        }
        
        // Delete the file
        fs.unlinkSync(filepath);
        
        console.log(`🗑️  File deleted: ${filename}`);
        
        res.json({
            success: true,
            message: `File ${filename} deleted successfully`
        });
        
    } catch (error) {
        console.error('❌ Error deleting file:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Also add bulk deletion endpoint
app.post('/api/delete-blogs', (req, res) => {
    try {
        const { filenames } = req.body;
        
        if (!Array.isArray(filenames)) {
            return res.status(400).json({ 
                success: false, 
                error: 'Array of filenames is required' 
            });
        }
        
        const results = [];
        let deletedCount = 0;
        
        filenames.forEach(filename => {
            try {
                // Security check
                if (!filename.endsWith('.html')) {
                    results.push({ filename, error: 'Not an HTML file', success: false });
                    return;
                }
                
                const filepath = path.join(__dirname, filename);
                
                if (fs.existsSync(filepath)) {
                    fs.unlinkSync(filepath);
                    results.push({ filename, success: true });
                    deletedCount++;
                    console.log(`🗑️  Deleted: ${filename}`);
                } else {
                    results.push({ filename, message: 'File not found', success: true });
                }
                
            } catch (error) {
                results.push({ filename, error: error.message, success: false });
            }
        });
        
        res.json({
            success: true,
            deletedCount: deletedCount,
            total: filenames.length,
            results: results
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});
// Add to blog-server.js
app.get('/api/get-blogs', async (req, res) => {
    try {
        // If using Supabase
        const { data, error } = await supabaseClient
            .from('blog_posts')
            .select('*')
            .order('created_at', { ascending: false });
        
        if (error) {
            console.error('Supabase error:', error);
            
            // Fallback: Read from local files
            const files = fs.readdirSync(__dirname);
            const blogFiles = files.filter(file => 
                file.endsWith('.html') && 
                file !== 'index.html' && 
                file !== 'admin-blogs.html'
            );
            
            const blogs = blogFiles.map(filename => {
                const content = fs.readFileSync(path.join(__dirname, filename), 'utf8');
                
                // Extract metadata from HTML
                const titleMatch = content.match(/<h1[^>]*>([^<]+)<\/h1>/);
                const excerptMatch = content.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"/);
                const slug = filename.replace('.html', '');
                
                return {
                    id: slug,
                    slug: slug,
                    title: titleMatch ? titleMatch[1] : slug.replace(/-/g, ' '),
                    excerpt: excerptMatch ? excerptMatch[1] : '',
                    image_url: 'wp-content/uploads/2024/06/blog-explore.jpg',
                    created_at: fs.statSync(path.join(__dirname, filename)).mtime.toISOString()
                };
            });
            
            return res.json(blogs);
        }
        
        res.json(data || []);
        
    } catch (error) {
        console.error('Error fetching blogs:', error);
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
});

// Add to blog-server.js
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    'https://uskimhkxfrsshmqsnyjd.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVza2ltaGt4ZnJzc2htcXNueWpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU4ODAwNDUsImV4cCI6MjA4MTQ1NjA0NX0.b-QY0KnPBJ10VICATu2xB124ehL8c9ZToj8js6g5DJk'
);

// Add this endpoint
app.get('/api/latest-blog', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('blog_posts')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(1)
            .single();
        
        if (error) {
            console.error('Supabase error:', error);
            return res.json({
                success: false,
                error: error.message
            });
        }
        
        res.json({
            success: true,
            blog: data
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Blog Server running at http://localhost:${PORT}`);
    console.log(`📁 Serving files from: ${__dirname}`);
    console.log(`🔗 Admin UI: http://localhost:${PORT}/admin-blogs.html`);
    console.log(`📝 API Endpoints:`);
    console.log(`   POST http://localhost:${PORT}/api/save-blog`);
    console.log(`   POST http://localhost:${PORT}/api/save-blogs`);
    console.log(`   POST http://localhost:${PORT}/admin-combined.html`);
});

// Add to blog-server.js after other endpoints
app.post('/api/update-homepage-blog', (req, res) => {
    try {
        const { blogs } = req.body;
        
        if (!Array.isArray(blogs)) {
            return res.status(400).json({
                success: false,
                error: 'Array of blogs is required'
            });
        }

        // Read the current homepage
        const homepagePath = path.join(__dirname, 'index.html');
        let homepageContent = fs.readFileSync(homepagePath, 'utf8');

        // Extract the blog section (find between markers)
        const blogStartMarker = '<!-- BLOG SECTION START -->';
        const blogEndMarker = '<!-- BLOG SECTION END -->';
        
        // If markers don't exist, create them
        if (!homepageContent.includes(blogStartMarker)) {
            // Find where the blog section is in your homepage
            // Look for the blog item structure
            const blogSectionSearch = /<div class="col item " style="padding:0; margin:0;">[\s\S]*?<div class="blog-item wow fadeInUp delay-0-2s explore-c-2"[\s\S]*?<h6[\s\S]*?BLOG[\s\S]*?<\/div>[\s\S]*?<\/div>[\s\S]*?<\/div>/;
            
            if (blogSectionSearch.test(homepageContent)) {
                homepageContent = homepageContent.replace(
                    blogSectionSearch,
                    blogStartMarker + '$&' + blogEndMarker
                );
            }
        }

        // Get the latest blog
        const latestBlog = blogs[blogs.length - 1]; // Get the most recent blog
        
        // Create the new blog HTML
        const newBlogHTML = `
<div class="col item " style="padding:0; margin:0;">
    <div class="blog-item wow fadeInUp delay-0-2s explore-c-2" style=" color: #fff;">
        <div class="content">
            <h6 style="text-align: center;">
                <a href="${latestBlog.slug}.html" style="color: #fff; text-decoration: none; text-align: center;">BLOG</a>
            </h6>
            <hr style="border-color: rgba(0,0,0,0.1);">
            <span style="color: #fff;text-align: center; margin-top: -25px;">
                <i class="fal fa-calendar-alt" style="text-align: center;"></i>
                ${new Date().getFullYear()}</span>
            <div class="image">
                <img
                    class="explore-img"
                    decoding="async"
                    src="${latestBlog.image || 'wp-content/uploads/2024/06/blog-explore.jpg'}"
                    alt="Blog"
                    style="width: 100%; border-radius: 6px; height: 220px !important; margin-top: 5px;">
            </div>
            <p style="color: #fff; line-height: 1.5; margin-top: -5px;">
                <b>"${latestBlog.title}"</b>
                <br><br>
                ${latestBlog.excerpt || latestBlog.content.substring(0, 150) + '...'}
            </p>
            <a
                href="${latestBlog.slug}.html"
                class="theme-btn"
                style="background: #000; color: #fff; padding: 8px 16px; display: inline-block; text-decoration: none;">Read More</a>
        </div>
    </div>
</div>
        `;

        // Find the blog section and replace the blog item
        const blogSectionRegex = new RegExp(`${blogStartMarker}([\\s\\S]*?)${blogEndMarker}`);
        const currentBlogSection = homepageContent.match(blogSectionRegex)[1];
        
        // Find and replace the specific blog div
        const blogItemRegex = /<div class="col item " style="padding:0; margin:0;">[\s\S]*?<div class="blog-item wow fadeInUp delay-0-2s explore-c-2"[\s\S]*?<\/div>[\s\S]*?<\/div>/;
        const updatedBlogSection = currentBlogSection.replace(blogItemRegex, newBlogHTML);
        
        homepageContent = homepageContent.replace(
            blogSectionRegex,
            blogStartMarker + updatedBlogSection + blogEndMarker
        );

        // Save the updated homepage
        fs.writeFileSync(homepagePath, homepageContent, 'utf8');

        res.json({
            success: true,
            message: 'Homepage blog section updated',
            updatedBlog: latestBlog.title
        });

    } catch (error) {
        console.error('❌ Error updating homepage:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});
