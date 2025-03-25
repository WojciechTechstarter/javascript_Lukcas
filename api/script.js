const output = document.getElementById("output")

function searchCharacter() {
    const input = document.getElementById("userInput").value


    fetch("https://swapi.dev/api/people?search=" + input)
        .then(res => res.json())
        .then(data => {
            const firstResult = data.results[0]
            const nameElement = document.createElement("h1")
            nameElement.innerText = firstResult.name

            const heightElement = document.createElement("p")
            heightElement.innerText = "Ist so groß: " + firstResult.height

            output.appendChild(nameElement)
            output.appendChild(heightElement)
        })
}

const button = document.getElementById("searchButton")
button.addEventListener("click", searchCharacter)

//-----------------------
fetch("https://swapi.dev/api/people/1/")
    .then(res => res.json())
    .then(data => {
        output.innerHTML = `<h2>${data.name}</h2><p>${data.height}cm</p>`
        const homeworld = data.homeworld

        //Zweiter fetch request ist vom ergebnis des ersten Abhängig:
        fetch(homeworld)
            .then(res => res.json())
            .then(planet => {
                output.innerHTML += `<p>Homeworld: ${planet.name}</p>`
            })
    })