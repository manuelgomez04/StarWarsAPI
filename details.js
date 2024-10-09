document.addEventListener('DOMContentLoaded', () => {
    const personName = getQueryParameter('name');
    if (personName) {
        fetchPersonData(personName);
    } else {
        console.error('No Person name found in the URL');
    }
});

function getQueryParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

function fetchPersonData(name) {
    const apiUrl = `https://swapi.dev/api/people/?search=${encodeURIComponent(name)}`;
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.results.length > 0) {
                displayPersonData(data.results[0]);
            } else {
                console.error('Person not found');
            }
        })
        .catch(error => console.error('Error fetching Person data:', error));
}

function displayPersonData(data) {
    const detailsContainer = document.getElementById('person-details');
    const personDetails = `
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">${capitalizeFirstLetter(data.name)}</h5>
            <p class="card-text">Height: ${data.height} cm</p>
            <p class="card-text">Mass: ${data.mass} kg</p>
            <p class="card-text">Hair Color: ${capitalizeFirstLetter(data.hair_color)}</p>
            <p class="card-text">Skin Color: ${capitalizeFirstLetter(data.skin_color)}</p>
            <p class="card-text">Eye Color: ${capitalizeFirstLetter(data.eye_color)}</p>
            <p class="card-text">Birth Year: ${data.birth_year}</p>
            <p class="card-text">Gender: ${capitalizeFirstLetter(data.gender)}</p>
            <p class="card-text">Homeworld: <a href="${data.homeworld}" target="_blank">Homeworld Info</a></p>
        </div>
    </div>
    `;
    detailsContainer.innerHTML = personDetails;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
