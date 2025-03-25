fetch("https://swapi.dev/api/species")
    .then(res => res.json())
    .then(data => {
        console.log(data)
    })