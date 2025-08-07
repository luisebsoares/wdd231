document.getElementById("currentyear").textContent = new Date().getFullYear();

document.getElementById("lastModified").textContent = `Last Modified: ${document.lastModified}`;

window.addEventListener('DOMContentLoaded', () => {
    const lastVisit = localStorage.getItem('lastVisit');
    const now = Date.now();

    if (lastVisit) {
        const daysSince = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
        console.log(`Days since last visit: ${daysSince}`);
    } else {
        console.log('Welcome, first time visitor!');
    }

    localStorage.setItem('lastVisit', now);
});
