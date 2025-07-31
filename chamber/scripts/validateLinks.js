window.addEventListener('load', () => {
    document.querySelectorAll('a[href]').forEach(a => {
        const href = a.getAttribute('href');
        if (!href || href.startsWith('http') || href.startsWith('#')) return;
        fetch(href, { method: 'HEAD' })
            .then(res => {
                if (!res.ok) console.warn(`Broken link: ${href} (${res.status})`);
            })
            .catch(() => console.warn(`Error checking link: ${href}`));
    });
});
