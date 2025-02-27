const body = document.querySelector('body');
const daynight = document.getElementById('daynight');
const kartochki = document.getElementById('kartochki');
const searchInput = document.getElementById('searchInput');

daynight.addEventListener('click', () => {
    if (body.classList.toggle('dark-mode')) {
        daynight.style.backgroundColor = 'white';
        daynight.style.color = 'black';
    } else {
        daynight.style.backgroundColor = 'black';
        daynight.style.color = 'white';
    }

    document.querySelectorAll('.card').forEach(card => {
        card.classList.toggle('card2');
    });
});

function generator(data = users) {
    kartochki.innerHTML = '';

    if (data.length === 0) {
        const notFound = document.createElement('p');
        notFound.textContent = "User not found";
        notFound.style.color = "red";
        notFound.style.fontSize = "18px";
        kartochki.appendChild(notFound);
        return;
    }

    data.forEach(element => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
        <h3>${element.name}</h3>
        <h1>👤</h1>
        <h2>📧${element.email}</h2>
        <h4>📞${element.phone}</h4>
        <h5>🏠${element.address.city},${element.address.street}</h5>
        `;
        kartochki.appendChild(card);
    });
}

function loadUsers() {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(res => res.json())
        .then(data => {
            users = data;
            generator();
        });
}

function searchUser() {
    const search = searchInput.value.toLowerCase();
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(search)
    );
    generator(filteredUsers);
}

searchInput.addEventListener("input", searchUser);
loadUsers();