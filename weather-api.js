let city
let weather

// get input that users enter into the form
document.querySelector('#form-entry').addEventListener('submit', function (e) {
    // keep the form from opening on a new window on submissionio
    e.preventDefault()
    city = document.getElementById('form-entry').elements.city.value
    // api call: using user input as parameter to url string for connection to API endpoint
    function getData(url) {
        //we require a new request object
        let request = new XMLHttpRequest()
        //then we specify the type of request, address, 
        //and what happens when the request is successful
        request.open('GET', url)
        //when response comes, we will load the it into the console.
        // but we could do whatever we want with it ofc.
        request.onload = function () {
            // responseText is the actual answer. This is the JSON
            // that you need. Now we parse it into a JS object.
            weather = JSON.parse(request.responseText)
            if (weather.success) {
                // replace weather app h1 with weather forecast for the city in question
                document.querySelector('h1').textContent = `Weather Forecast for ${city}`
                // remove form element
                document.querySelector('form').remove()
                // console.log(request)
                // console.log(request.responseText)
                // console.log(weather.response)
                // console.log(weather)
                // console.log(weather.response[0].loc)
                // 7 day forecast gives an array with each element specific to each day
                // loop through each of the 7 days and get the maxtempC. 
                // logic can be applied to other elements of the array that we might be interested in

                weather.response[0].periods.forEach(function (element) {
                    // this extracts the day from the unix timestamp
                    // moment.unix(1533985200).format('dddd, MMMM Do, YYYY h:mm:ss A')
                    // console.log(`min temp: ${element.maxTempC},\navg temp: ${element.maxTempC},\n${moment.unix(element.timestamp).format('dddd')},\nmax temp: ${element.maxTempC},\n${element.weather}`)
                    // div for forecast for each day
                    let newForecastDiv = document.createElement('div')
                    // actual forecast for each day that should go into each div
                    let forecastDay = `${moment.unix(element.timestamp).format('dddd, MMMM Do, YYYY')}`
                    let forecastWeather = `${element.weather}`.toLowerCase()
                    let forecastMaxTemp = `${element.maxTempC}`
                    let forecastMinTemp = `${element.minTempC}`
                    let forecastAvgTemp = `${element.avgTempC}`

                    //let newForecastEntry = document.createTextNode(`${moment.unix(element.timestamp).format('dddd')},\n${element.weather},\nmax temp: ${element.maxTempC},\nmin temp: ${element.maxTempC},\navg temp: ${element.maxTempC}`)
                    let newForecastEntry = document.createElement('p')
                    let newForecastEntryTwo = document.createElement('h4')
                    // choose src based on weather using an if condition
                    let weatherIcon = document.createElement('img')
                    if (forecastWeather.includes('sun') && (forecastWeather.includes('rain') || forecastWeather.includes('drizzle'))){
                        // weatherIcon.src = 'https://cdn4.iconfinder.com/data/icons/the-weather-is-nice-today/64/weather_17-128.png'
                        weatherIcon.src = 'images/rainy-1.svg'
                    } else if (forecastWeather.includes('cloud') && (forecastWeather.includes('rain') || forecastWeather.includes('shower') || forecastWeather.includes('drizzle'))) {
                        // weatherIcon.src = 'https://cdn4.iconfinder.com/data/icons/the-weather-is-nice-today/64/weather_13-128.png'
                        weatherIcon.src = 'images/rainy-4.svg'
                        // weatherIcon.src = ''
                    } else if (forecastWeather.includes('cloud') && forecastWeather.includes('snow')) {
                        // weatherIcon.src = 'https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-01-128.png' //'https://cdn4.iconfinder.com/data/icons/iconsland-weather/PNG/128x128/Night_Rain.png'//'https://cdn3.iconfinder.com/data/icons/weather-and-forecast/41/Weather_icons_grey-01-128.png'//"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqOzntQufoXAmNTTpV18x08TkQuLLd2JXDnsaH5YGIcA-56hkTIQ"
                        // weatherIcon.src = 'https://cdn4.iconfinder.com/data/icons/the-weather-is-nice-today/64/weather_35-128.png'
                        weatherIcon.src = 'images/snowy-5.svg'
                    } else if (forecastWeather.includes('sunny')) {
                        // weatherIcon.src = 'https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-01-128.png' //'https://cdn4.iconfinder.com/data/icons/iconsland-weather/PNG/128x128/Night_Rain.png'//'https://cdn3.iconfinder.com/data/icons/weather-and-forecast/41/Weather_icons_grey-01-128.png'//"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqOzntQufoXAmNTTpV18x08TkQuLLd2JXDnsaH5YGIcA-56hkTIQ"
                        // weatherIcon.src = 'https://cdn4.iconfinder.com/data/icons/the-weather-is-nice-today/64/weather_3-128.png'
                        weatherIcon.src = 'images/day.svg'
                    } else if (forecastWeather.includes('cloudy')) {
                        // weatherIcon.src = 'https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-22-128.png'
                        // weatherIcon.src = 'https://cdn4.iconfinder.com/data/icons/the-weather-is-nice-today/64/weather_1-128.png'
                        // weatherIcon.src = 'images/cloudy.svg'
                        weatherIcon.src = 'images/cloudy.svg'
                    } else if (forecastWeather.includes('rain')) {
                        // weatherIcon.src = 'https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-31-128.png'
                        // weatherIcon.src = 'https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-31-128.png'
                        weatherIcon.src = 'images/rainy-6.svg'
                    } else if (forecastWeather.includes('snow')) {
                        // weatherIcon.src = 'https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-24-128.png'
                        // weatherIcon.src = 'https://cdn4.iconfinder.com/data/icons/the-weather-is-nice-today/64/weather_28-128.png'
                        weatherIcon.src = 'images/snowy-6.svg'
                    } else if (forecastWeather.includes('thunder')) {
                        // weatherIcon.src = 'https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-23-128.png'
                        // weatherIcon.src = 'https://cdn4.iconfinder.com/data/icons/the-weather-is-nice-today/64/weather_11-128.png'
                        weatherIcon.src = 'images/thunder.svg'
                    }
                    weatherIcon.width = 100
                    // append forecast into respective div
                    newForecastEntry.textContent = `${forecastDay}: ${forecastWeather}`
                    // \xB0 is the hex code for degree
                    newForecastEntryTwo.textContent = `(avg temperature: ${forecastAvgTemp} \xB0C)`
                    newForecastDiv.appendChild(newForecastEntry)
                    newForecastDiv.appendChild(newForecastEntryTwo)
                    newForecastDiv.appendChild(weatherIcon)
                    // insert forecasts after form element but before the back to homepage button
                    let currentDiv = document.getElementById('refresh-page')
                    document.body.insertBefore(newForecastDiv, currentDiv)
                })
                // console.log(weather.response[0].periods[0])
                // console.log(weather.response[0].profile)
            } else {
                alert(`${city} is not a valid entry: please ensure you type the city name, followed by the country. E.g. Toronto, Canada`)
                // reload page when user clicks ok so they can enter valid city name
                window.location.reload()
            }
        }
        //when all things are specified, we send the the request out, 
        // and the rest (ie the handling of the response) will happen when we get it back.
        request.send()
    }
    let url = `https://api.aerisapi.com/forecasts/${city}?client_id=2nGMOSl20jSsKUpcuQMph&client_secret=eCjHq7zcPsfuw7pwuvMl1MZzkwsl7WFMUci7b48f`
    getData(url)
})

// clicking this button refreshes the page
const home = document.getElementById('refresh-page')
home.addEventListener('click', function () {
    window.location.reload()
})