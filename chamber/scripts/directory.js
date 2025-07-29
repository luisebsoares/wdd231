const gridBtn = document.getElementById('gridBtn');
const listBtn = document.getElementById('listBtn');
const members = document.getElementById('members');
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('menuToggle');
    const nav = document.querySelector('.nav-menu');

    btn.addEventListener('click', () => {
        nav.classList.toggle('show');
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!expanded));
    });
});

gridBtn.addEventListener('click', () => setView('grid'));
listBtn.addEventListener('click', () => setView('list'));

function setView(view) {
    if (view === 'grid') {
        members.classList.add('grid-view');
        members.classList.remove('list-view');
        gridBtn.classList.add('active');
        listBtn.classList.remove('active');
    } else {
        members.classList.add('list-view');
        members.classList.remove('grid-view');
        listBtn.classList.add('active');
        gridBtn.classList.remove('active');
    }
}

async function loadMembers() {
    try {
        const response = await fetch('data/members.json');
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        displayMembers(data);
        setView('grid');
    } catch (err) {
        console.error(err);
        members.innerHTML = "<p>Error loading member data.</p>";
    }
}

function displayMembers(membersData) {
    members.innerHTML = '';
    membersData.forEach(member => {
        const card = document.createElement('div');
        card.classList.add('member-card');
        card.setAttribute('data-membership', member.membershipLevel);

        card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo">
      <h3>${member.name}</h3>
      <p>${member.description}</p>
      <p><strong>Address:</strong> ${member.address}</p>
      <p><strong>Phone:</strong> ${member.phone}</p>
      <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
    `;

        members.appendChild(card);
    });
}

loadMembers();
