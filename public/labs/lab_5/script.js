function mapInit() {
  // follow the Leaflet Getting Started tutorial here
  return map;
}

async function dataHandler(mapObjectFromFunction) {
  // use your assignment 1 data handling code here
  const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
const zips = [];

fetch(endpoint)
    .then(blob => blob.json())
    .then(data => zips.push(...data))

function findMatches(wordToMatch, zips){
    return zips.filter(loc => {
        const regex = new RegExp(wordToMatch, 'gi');
        return loc.zip.match(regex)
    });
}

function displayMatches(){
    const matchArray = findMatches(this.value, zips);
    const html = matchArray.map(loc => {
        const regex = new RegExp(this.value, 'gi');
        const zipNum = loc.zip.replace(regex, `<span class="hl">${this.value}</span>`)
        return `
            <li class="return">
                <span class="name">${loc.name}</span><br>
                <span class="category">${loc.category}</span><br>
                <span class="address">${loc.address_line_1}</span><br>
                <span class="city">${loc.city}</span><br>
                <span class="zip">${zipNum}</span>
            </li>
        `;
    }).join('');
    suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
  // and target mapObjectFromFunction to attach markers
}

async function windowActions() {
  const map = mapInit();
  await dataHandler(map);
}

window.onload = windowActions;