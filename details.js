document.addEventListener('DOMContentLoaded', () => {
    const pokemonName = getQueryParameter('name');
    if (pokemonName) {
        fetchPokemonData(pokemonName);
    } else {
        console.error('No Pokémon name found in the URL');
    }
});

function getQueryParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

function fetchPokemonData(name) {
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${name}`;
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => displayPokemonData(data))
        .catch(error => console.error('Error fetching Pokémon data:', error));
}

function displayPokemonData(data) {
    const detailsContainer = document.getElementById('pokemon-details');
    const pokemonDetails = `
        
          <img src="${data.sprites.front_default}" class="card-img-top" alt="${data.name}">
            <div class="card-body">
                <h5 class="card-title">${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h5>
                <p class="card-text">ID: #${String(data.id).padStart(4, '0')}</p>
                <p class="card-text">Height: ${data.height}</p>
                <p class="card-text">Weight: ${data.weight}</p>
                <p class="pokemon-types">
                                ${data.types.map(function (typeInfo) {
                        return '<span class="type-badge ' + typeInfo.type.name + '">' + capitalizeFirstLetter(typeInfo.type.name) + '</span>';
                    }).join('')}
                            </p>
            </div>
    `;
    detailsContainer.innerHTML = pokemonDetails;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}   