var citySearched = document.getElementById('citySearched')
var searchBtn = document.querySelector('button')
var apiKey = '59a3c0db12e1f890c3e94259c9168e7f'
var forecastContainer = document.getElementById('forecastContainer')
// function getForecastByFetch(cityName) {
//     fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=imperial&appid=' + apiKey)
//         .then(function (response) {
//             return response.json()
//         })
//         .then(function (weatherData) {

            
//             console.log(weatherData)
//         })

// }

function getForecastByFetch(cityName) {
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&units=imperial&appid=' + apiKey)
        .then(function (response) {
            return response.json()
        })
        .then(function (weatherData) {

            // Name of City
            var city = weatherData.city.name
            var cityEl = document.createElement('h3')
            cityEl.innerText = 'Current weather for: ' + city
            searchCard.appendChild(cityEl)

            // Array to loop though API and give user elements at 12pm each day
            var listArray = weatherData.list
            for (var i = 4; i < listArray.length; i += 8) {
                
                // Temperature
                var temp = listArray[i].main.temp
                var tempEl = document.createElement('li')
                tempEl.innerText = temp

                // Date
                var date = listArray[i].dt_txt.split(' ')[0]
                var dateEl = document.createElement('p')
                dateEl.innerText = date

                // Icons
                var iconNumber = listArray[i].weather[0].icon
                var iconImg = document.createElement('img')
                iconImg.src = 'https://openweathermap.org/img/wn/' + iconNumber + '.png'

                var card = document.createElement('div')
                card.classList.add('card')
                card.appendChild(iconImg)
                card.appendChild(dateEl)
                card.appendChild(tempEl)
                forecastContainer.appendChild(card)
            }

            // Local Storage
            



        })

}


// click listener for search button
searchBtn.addEventListener('click', function (event) {
    var searched = citySearched.value
    event.preventDefault()
    getForecastByFetch(searched)

});

// allows user to hit the'Enter' key on the keyboard
citySearched.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        searchBtn.click();
    }
});

