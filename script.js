var citySearched = document.getElementById('citySearched')
var searchBtn = document.querySelector('button')
var apiKey = '59a3c0db12e1f890c3e94259c9168e7f'


// local Storage


function getWeatherByFetch(cityName) {
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&units=imperial&appid=' + apiKey)
        .then(function (response) {
            return response.json()
        })
        .then(function (weatherData) {
            var fiveDayForecast = {}

            for (var i = 0; i < weatherData.list.length; i++) {
                if (Object.keys(fiveDayForecast).length > 4) {
                    break
                }
                var hourWeatherData = weatherData.list[i]
                var dateTime = weatherData.list[i].dt_txt
                var day = dateTime.split(' ')[0].split('-').pop()
                if (!(day in fiveDayForecast)) {
                    fiveDayForecast[day] = hourWeatherData
                }
            }

            console.log(fiveDayForecast)
            var fiveDayForecastArray = Object.values(fiveDayForecast)
            // var fiveDayTemp = Object.values(fiveDayForecast).main.temp
            console.log(fiveDayForecastArray)

            var searchedCityName = document.querySelector('#dash')
            searchedCityName.innerText = weatherData.city.name
            document.body.appendChild(searchedCityName)



        })


}

// click listener for search button
searchBtn.addEventListener('click', function (event) {
    var searched = citySearched.value
    event.preventDefault()
    getWeatherByFetch(searched)

});

// allows user to hit the'Enter' key on the keyboard
citySearched.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        searchBtn.click();
    }
});


