/* eslint-disable linebreak-style */
function mapInit() {
  // follow the Leaflet Getting Started tutorial here
  return map;
}

async function dataHandler(mapObjectFromFunction) {
  // use your assignment 1 data handling code here
  const submitButton = document.querySelector('#subButton');
  const filteredList = document.querySelector('#filteredList');
  const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
  const request = await fetch(endpoint);
  const locations = await request.json();

  function findMatches(search, places) {
    return places.filter((place) => {
      const regex = new RegExp(search, 'gi');
      return place.zip.match(regex);
    });
  }

  function removeChildren(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }

  async function displayMatches() {
    const filteredPlaces = findMatches(search.value, locations);
    removeChildren(filteredList);
    filteredPlaces.forEach((place) => {
      filteredList.insertAdjacentHTML(
        'beforeend',
        `<li class='card mt-4'>
                <div class="card-content">
                    <div class="content">
                        <p class="title is-3">${place.name}</p>
                        <p class="subtitle is-5">${place.category}</p>
                        <address>${place.address_line_1}<br/>${place.address_line_2}<br/>
                            ${place.city}, ${place.state}. ${place.zip}</address>
                    </div>
                </div>
                </li>`
      );
    });
  }

  search.addEventListener('change', displayMatches);
  search.addEventListener('keyup', displayMatches);
  // and target mapObjectFromFunction to attach markers
}

async function windowActions() {
  const map = mapInit();
  await dataHandler(map);
}

window.onload = windowActions;
