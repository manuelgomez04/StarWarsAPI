$(document).ready(function () {
    const dataContent = $('.pokemon-grid');
    const apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=151'; // Puedes ajustar el límite según tus necesidades

    $.ajax({
        url: apiUrl,
        method: 'GET',
        success: function (response) {
            const pokemonList = response.results;

            var requests = pokemonList.map(function (pokemon) {
                return $.ajax({
                    url: pokemon.url,
                    method: 'GET'
                });
            });

            $.when.apply($, requests).done(function () {
                var responses = Array.prototype.slice.call(arguments);
                responses.forEach(function (response) {
                    var pokemonData = response[0];
                    var pokemonCard = `
                        <div class="pokemon-card" data-id="${pokemonData.id}">
                            <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}" class="pokemon-image">
                            <div class="pokemon-info">
                                <div class="pokemon-name">
                                    <a href="details.html?name=${pokemonData.name}">${capitalizeFirstLetter(pokemonData.name)}</a>
                                </div>
                                <div class="pokemon-number">#${pokemonData.id.toString().padStart(3, '0')}</div>
                            </div>
                            <div class="pokemon-types">
                                ${pokemonData.types.map(function (typeInfo) {
                        return '<span class="type-badge ' + typeInfo.type.name + '">' + capitalizeFirstLetter(typeInfo.type.name) + '</span>';
                    }).join('')}
                            </div>
                        </div>
                    `;
                    dataContent.append(pokemonCard);
                });
            }).fail(function (error) {
                console.error('Error fetching Pokémon data:', error);
            });
        },
        error: function (error) {
            console.error('Error fetching Pokémon list:', error);
        }
    });

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
});