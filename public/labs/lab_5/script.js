function mapInit() {
  const mymap = L.map('mapid').setView([51.505, -0.09], 13);

  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWF5YWNhcmV5NzgiLCJhIjoiY2ttNTA1bnduMDlxODJ4bzl1a3ZuaWFkNyJ9.e6M1IMfhXGZM0St9RvNZHw'
  }).addTo(mymap);

  const marker = L.marker([51.5, -0.09]).addTo(mymap);

  const circle = L.circle([51.508, -0.11], { 
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
  }).addTo(mymap);

  const polygon = L.polygon([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047]
  ]).addTo(mymap);

  marker.bindPopup('<b>Hello world!</b><br>I am a popup.').openPopup();
  circle.bindPopup('I am a circle.');
  polygon.bindPopup('I am a polygon.');

  const popup = L.popup();

  function onMapClick(e) {
    popup
      .setLatLng(e.latlng)
      .setContent(`You clicked the map at ${e.latlng.toString()}`)
      .openOn(mymap);
  }

  mymap.on('click', onMapClick);

  mymap.on('click', onMapClick);

  return mymap;
}

// part with code from assignment 1
async function dataHandler(mapObjectFromFunction) {
  console.log('window loaded');
  const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
  const request = await fetch(endpoint);
  const restaurants = await request.json();
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

// use your assignment 1 data handlingcode here
// and target mapObjectFromFunction to attach markers

async function windowActions() {
  const map = mapInit();
  await dataHandler(map);
}
window.onload = windowActions;

