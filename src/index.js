const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://rickandmortyapi.com/api/character/';

const getData = api => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      sessionStorage.setItem('next_fetch', response.info.next)
      const characters = response.results;
      let output = characters.map(character => {
        return `
      <article class="Card">
        <img src="${character.image}" />
        <h2>${character.name} <span>${character.species}</span></h2>
      </article>
    `
      }).join('');
      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
      verifyNextFetch();
    })
    .catch(error => console.log(error));
}

const verifyNextFetch = () => {
  next_fetch = sessionStorage.getItem('next_fetch');	  next_fetch = sessionStorage.getItem('next_fetch');

  if (!next_fetch) {
    intersectionObserver.unobserve($observe);
    document
    .getElementById('no-more-pages')
    .classList
    .add('no-more-pages-showed');
  }
}

async function loadDataAsync() {
  try {
    let next = sessionStorage.getItem('next_fetch');
    let data;
    
    if (!next) {
      data = await getData(API); 
    }
    else {
      data = await getData(next);
    }

    return data;
  } catch (error) {
    return 'No encontramos los androides que estabas buscando'
  }
}

const destroySessionStorage = () => {
  sessionStorage.clear();
}

window.onbeforeunload = destroySessionStorage;

const intersectionObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    loadDataAsync();
  }
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);