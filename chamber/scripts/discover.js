document.addEventListener('DOMContentLoaded', () => {
    const visitEl = document.getElementById('visitMessage');
    const last = localStorage.getItem('lastVisit');
    const now = new Date();
    let msg;

    if (!last) {
        msg = "Welcome! Let us know if you have any questions.";
    } else {
        const prev = new Date(last);
        const diffMs = now - prev;
        if (diffMs < 24 * 60 * 60 * 1000) {
            msg = "Back so soon! Awesome!";
        } else {
            const days = Math.floor(diffMs / (24 * 60 * 60 * 1000));
            msg = `You last visited ${days} day${days === 1 ? "" : "s"} ago.`;
        }
    }

    visitEl.textContent = msg;
    localStorage.setItem('lastVisit', now.toISOString());

});


document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('menuToggle');
    const nav = document.querySelector('.nav-menu');
    btn.addEventListener('click', () => {
        nav.classList.toggle('show');
        btn.setAttribute('aria-expanded', btn.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
    });

    fetch('data/places.json')
        .then(r => {
            if (!r.ok) throw new Error('Couldn’t load data');
            return r.json();
        })
        .then(items => {
            const grid = document.getElementById('discoverGrid');
            items.forEach(item => {
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
          <h2>${item.title}</h2>
          <figure><img src="${item.image}" alt="${item.title}"></figure>
          <address>${item.address}</address>
          <p>${item.description}</p>
          <button type="button" class="learn-btn">Learn More</button>
        `;
                grid.appendChild(card);

                const dlg = document.createElement('dialog');
                dlg.className = 'discover-dialog';
                dlg.innerHTML = `
          <button class="close-btn" aria-label="Close">&times;</button>
          <h2>${item.title}</h2>
          <figure><img src="${item.image}" alt="${item.title}"></figure>
          <address>${item.address}</address>
          <p>${item.description}</p>
          ${item.hours ? `<p><strong>Hours:</strong> ${item.hours}</p>` : ''}
          ${item.phone ? `<p><strong>Phone:</strong> <a href="tel:${item.phone.replace(/[^0-9]/g, '')}">${item.phone}</a></p>` : ''}
          ${item.website ? `<p><strong>Website:</strong> <a href="${item.website}" target="_blank" rel="noopener">${item.website}</a></p>` : ''}
          ${item.length ? `<p><strong>Length:</strong> ${item.length}</p>` : ''}
          ${item.parking ? `<p><strong>Parking:</strong> ${item.parking}</p>` : ''}
          ${item.fees ? `<p><strong>Fees:</strong> ${item.fees}</p>` : ''}
        `;
                document.body.appendChild(dlg);

                card.querySelector('.learn-btn').onclick = () => dlg.showModal();
                dlg.querySelector('.close-btn').onclick = () => dlg.close();
                dlg.addEventListener('click', e => {
                    const r = dlg.getBoundingClientRect();
                    if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) {
                        dlg.close();
                    }
                });
            });
        })
        .catch(err => {
            console.error(err);
            document.getElementById('discoverGrid').innerHTML = '<p>Error loading items.</p>';
        });
});
