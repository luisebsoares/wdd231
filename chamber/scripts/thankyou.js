document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('currentyear').textContent = new Date().getFullYear();
    document.getElementById('lastModified').textContent = `Last Modified: ${document.lastModified}`;

    const params = new URLSearchParams(window.location.search);
    ['firstName', 'lastName', 'email', 'phone', 'organization', 'timestamp'].forEach(key => {
        const el = document.getElementById(key);
        if (el) el.textContent = params.get(key) || 'N/A';
    });
});
