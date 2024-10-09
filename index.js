$(document).ready(function () {
    const dataContent = $('.pokemon-grid');
    const loadingIndicator = $('#loading');
    const apiUrl = 'https://swapi.dev/api/people'; // URL de la API de Star Wars

    function fetchAllPeople(url, peopleList = []) {
        return $.ajax({
            url: url,
            method: 'GET'
        }).then(function (response) {
            peopleList = peopleList.concat(response.results);
            const nextPage = response.next;

            if (nextPage) {
                return fetchAllPeople(nextPage, peopleList);
            } else {
                return peopleList;
            }
        });
    }

    loadingIndicator.show(); // Mostrar el GIF de carga

    fetchAllPeople(apiUrl).then(function (peopleList) {
        var requests = peopleList.map(function (person) {
            return $.ajax({
                url: person.url,
                method: 'GET'
            });
        });

        $.when.apply($, requests).done(function () {
            var responses = Array.prototype.slice.call(arguments);
            responses.forEach(function (response) {
                var personData = response[0];
                var personCard = `
                    <div class="pokemon-card" data-id="${personData.url}">
                        <div class="pokemon-info">
                            <div class="pokemon-name">
                                <a href="details.html?name=${personData.name}">${capitalizeFirstLetter(personData.name)}</a>
                            </div>
                        </div>
                    </div>
                `;
                dataContent.append(personCard);
            });
            loadingIndicator.hide(); // Ocultar el GIF de carga
        });
    });

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
});