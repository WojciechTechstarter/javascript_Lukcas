const output = document.getElementById("output")
const weatherOutput = document.getElementById("weatherOutput")

// --- STAR WARS ---

function searchCharacter() {
    const input = document.getElementById("userInput").value

    fetch("https://swapi.dev/api/people?search=" + input)
        .then(res => res.json())
        .then(data => {
            output.innerHTML = ""
            if (data.results.length === 0) {
                output.innerText = "Character not found."
                return
            }

            const firstResult = data.results[0]

            const nameElement = document.createElement("h1")
            nameElement.innerText = firstResult.name

            const heightElement = document.createElement("p")
            heightElement.innerText = "Height: " + firstResult.height + " cm"

            output.appendChild(nameElement)
            output.appendChild(heightElement)

            // Second API call for homeworld
            fetch(firstResult.homeworld)
                .then(res => res.json())
                .then(planet => {
                    const homeworldElement = document.createElement("p")
                    homeworldElement.innerText = "Homeworld: " + planet.name
                    output.appendChild(homeworldElement)
                })
        })
}

const button = document.getElementById("searchButton")
button.addEventListener("click", searchCharacter)


// --- WEATHER (wttr.in API) ---

function getWeather() {
    const city = document.getElementById("weatherInput").value
    fetch(`https://wttr.in/${city}?format=j1`)
        .then(res => res.json())
        .then(data => {
            weatherOutput.innerHTML = ""

            const current = data.current_condition[0]

            const cityElement = document.createElement("h3")
            cityElement.innerText = "City: " + city

            const tempElement = document.createElement("p")
            tempElement.innerText = "Temperature: " + current.temp_C + "°C"

            const descElement = document.createElement("p")
            descElement.innerText = "Weather: " + current.weatherDesc[0].value

            weatherOutput.appendChild(cityElement)
            weatherOutput.appendChild(tempElement)
            weatherOutput.appendChild(descElement)
        })
        .catch(err => {
            weatherOutput.innerText = "Couldn't fetch weather."
        })
}

const weatherBtn = document.getElementById("weatherButton")
weatherBtn.addEventListener("click", getWeather)