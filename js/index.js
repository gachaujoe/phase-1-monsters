function fetchMonsters(page = 1, limit = 50) {
    fetch(`http://localhost:3000/monsters?_limit=${limit}&_page=${page}`)
      .then(response => response.json())
      .then(monsters => {
        monsters.forEach(displayMonster);
      });
  }
  
  function displayMonster(monster) {
    const monsterContainer = document.getElementById('monster-container');
    const monsterDiv = document.createElement('div');
    monsterDiv.innerHTML = `
      <h2>${monster.name}</h2>
      <h4>Age: ${monster.age}</h4>
      <p>${monster.description}</p>
    `;
    monsterContainer.appendChild(monsterDiv);
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    fetchMonsters();
  });
  document.getElementById('monster-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const description = document.getElementById('description').value;
  
    fetch('http://localhost:3000/monsters', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({ name, age, description })
    })
    .then(response => response.json())
    .then(monster => displayMonster(monster));
  
    event.target.reset();
  });
  let currentPage = 1;

  document.getElementById('load-more').addEventListener('click', () => {
    currentPage++;
    fetchMonsters(currentPage);
  });
      