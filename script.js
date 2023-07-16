var citySearched = document.getElementById('citySearched')
var searchBtn = document.querySelector('button')
var apiKey = '59a3c0db12e1f890c3e94259c9168e7f'
var forecastContainer = document.getElementById('forecastContainer')



// Current Weather Function
function getCurrentWeatherByFetch(cityName) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=imperial&appid=' + apiKey)
        .then(function (response) {
            return response.json()
        })
        .then(function (weatherData) {

            console.log(weatherData)
            // Gets current Weather Icon
            var iconID = weatherData.weather[0].icon
            var iconImg = document.createElement('img')
            iconImg.src = 'https://openweathermap.org/img/wn/' + iconID + '.png'

            // Gets city name
            var city = weatherData.name
            var cityEl = document.createElement('h3')
            cityEl.innerText = 'Current weather for: ' + city
            searchCard.appendChild(cityEl)

            // Current Sky Conditions
            var currentSkyCondition = weatherData.weather[0].main
            var currentSkyConditionEl = document.createElement('p')
            currentSkyConditionEl.classList.add('skydescription')
            currentSkyConditionEl.innerText = currentSkyCondition

            // Current Temp
            var currentTemp = weatherData.main.temp
            var currentTempEl = document.createElement('li')
            currentTempEl.innerText = "Temp: " + currentTemp

            // Current Humidity
            var currentHumidity = weatherData.main.temp
            var currentHumidityEl = document.createElement('li')
            currentHumidityEl.innerText = "Humidity: " + currentHumidity

            // Current windspeed
            var currentWindSpeed = weatherData.wind.speed
            var currentWindSpeedEl = document.createElement('li')
            currentWindSpeedEl.innerText = "Wind: " + currentWindSpeed



            var weatherCard = document.createElement('div')
            weatherCard.classList.add('currentWeatherCard')
            weatherCard.appendChild(iconImg)
            weatherCard.appendChild(currentSkyConditionEl)
            weatherCard.appendChild(currentTempEl)
            weatherCard.appendChild(currentHumidityEl)
            weatherCard.appendChild(currentWindSpeedEl)
            searchCard.appendChild(weatherCard)

        })
}



// Five Day Forecast Function
function getForecastByFetch(cityName) {
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&units=imperial&appid=' + apiKey)
        .then(function (response) {
            return response.json()
        })
        .then(function (weatherData) {


            // Array to loop though API and give user elements at 12pm each day
            var listArray = weatherData.list
            for (var i = 0; i < listArray.length; i += 8) {
                // Icons
                var iconNumber = listArray[i].weather[0].icon
                var iconImg = document.createElement('img')
                iconImg.src = 'https://openweathermap.org/img/wn/' + iconNumber + '.png'

                // Date
                var date = listArray[i].dt_txt.split(' ')[0]
                var dateEl = document.createElement('p')
                dateEl.innerText = date

                // Temperature
                var temp = listArray[i].main.temp
                var tempEl = document.createElement('li')
                tempEl.innerText = 'Temp: ' + temp

                // Humidity
                var humidity = listArray[i].main.humidity
                var humidityEl = document.createElement('li')
                humidityEl.innerText = 'Humidity: ' + humidity

                // Wind Speed
                var windSpeed = listArray[i].wind.speed
                var windEl = document.createElement('li')
                windEl.innerText = "Wind: " + windSpeed + " mph"

                // SKy Condition
                var skyCondition = listArray[i].weather[0].main
                var skyConditionEl = document.createElement('p')
                skyConditionEl.classList.add('skydescription')
                skyConditionEl.innerText = skyCondition



                var forecastCard = document.createElement('div')
                forecastCard.classList.add('forecastCard')
                forecastCard.appendChild(iconImg)
                forecastCard.appendChild(skyConditionEl)
                forecastCard.appendChild(dateEl)
                forecastCard.appendChild(tempEl)
                forecastCard.appendChild(humidityEl)
                forecastCard.appendChild(windEl)
                forecastContainer.appendChild(forecastCard)

                
            }

            // Local Storage


        })

}


// click listener for search button
searchBtn.addEventListener('click', function (event) {
    var searched = citySearched.value
    event.preventDefault()
    getForecastByFetch(searched)
    getCurrentWeatherByFetch(searched)

});

// allows user to hit the'Enter' key on the keyboard
citySearched.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        searchBtn.click();
    }
});

