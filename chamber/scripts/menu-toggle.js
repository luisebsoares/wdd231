document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('menuToggle');
    const nav = document.querySelector('.nav-menu');

    btn.addEventListener('click', () => {
        nav.classList.toggle('show');
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!expanded));
    });
});
