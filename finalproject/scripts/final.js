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

(function initLocalDateTime() {
    const els = document.querySelectorAll('.js-local-time');
    if (!els.length) return;

    const fmt = new Intl.DateTimeFormat(undefined, {
        dateStyle: 'full',
        timeStyle: 'medium'
    });

    function tick() {
        const now = new Date();
        const text = fmt.format(now);
        els.forEach(el => {
            el.textContent = text;
            el.setAttribute('datetime', now.toISOString());
            el.title = `Your local date & time`;
        });
    }

    tick();
    setInterval(tick, 1000);
})();

