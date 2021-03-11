function mapInit() {
  // follow the Leaflet Getting Started tutorial here
  return map;
}

async function dataHandler(mapObjectFromFunction) {
  // eslint-disable-next-line no-shadow
  async function windowActions() {
    // eslint-disable-next-line no-console
    console.log('window loaded');
    const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
    const request = await fetch(endpoint);
    const restaurants = await request.json();
    // eslint-disable-next-line no-console
    console.log(restaurants);

    function findMatches(wordToMatch, restaurants) {
      return restaurants.filter((place) => {
        const regex = new RegExp(wordToMatch, 'gi');
        return place.name.match(regex) || place.category.match(regex);
      });
    }
    function displayMatches(event) {
      const matchArray = findMatches(event.target.value, restaurants);
      const html = matchArray
        .map((place) => `
            <li class = "suggestion">
                <span class = "name">${place.name}</span>
                <span class = "category">${place.category}</span>
                <span class = "address">${place.address_line_1}</span>
                <span class = "city">${place.city}</span>
                <span class = "zip">${place.zip}</span>
            </li>
        `)
        .join('');
      // eslint-disable-next-line no-use-before-define
      suggestions.innerHTML = html;
    }
    const searchInput = document.querySelector('.search');
    const suggestions = document.querySelector('.suggestions');

    searchInput.addEventListener('keyup', (evt) => {
      displayMatches(evt);
    });
  }
  window.onload = windowActions;

  // and target mapObjectFromFunction to attach markers
}

async function windowActions() {
  const map = mapInit();
  await dataHandler(map);
}

window.onload = windowActions;