const menuToggle = document.querySelector('.menu-toggle');
const sidebar = document.getElementById('sidebar');

menuToggle.addEventListener('click', () => {
  sidebar.style.display = sidebar.style.display === 'flex' ? 'none' : 'flex';
});