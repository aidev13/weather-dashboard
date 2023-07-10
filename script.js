var citySearched = document.getElementById('citySearched')
var searchBtn = document.querySelector('button')
var apiKey = '59a3c0db12e1f890c3e94259c9168e7f'

function getWeatherByFetch(cityName) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=imperial&appid=' + apiKey)
        .then(function (response) {
            return response.json()
        })
        .then(function (weatherData) {
            var h2 = document.createElement('h2')
            h2.innerText = cityName
            var ul = document.createElement('ul')
            var outdoorTemp = document.createElement('li')
            var skyConditions = document.createElement('li')
            var wind = document.createElement('li')

            outdoorTemp.innerText = "Temp: " + weatherData.main.temp
            skyConditions.innerText = "Sky Overview: " + weatherData.weather[0].main
            wind.innerText = "Wind Conditions: " + weatherData.wind.speed + " mph"

            ul.appendChild(outdoorTemp)
            ul.appendChild(skyConditions)
            ul.appendChild(wind)
            document.body.appendChild(h2)
            document.body.appendChild(ul)


        })
}

searchBtn.addEventListener('click', function(event) {
    
    getWeatherByFetch(citySearched.value)
    
})


