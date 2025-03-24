const addButton = document.getElementById("addButton");
const artikelInput = document.getElementById("artikel");
const anzahlInput = document.getElementById("anzahl");
const preisInput = document.getElementById("preis");
const liste = document.getElementById("liste");
const gesamt = document.getElementById("gesamt");
const kategorieSelect = document.getElementById("kategorie");


addButton.addEventListener("click", () => {


    // Aufgabe 1 - Eingaben prüfen
    if (!validateInputs()) return;


    const artikel = artikelInput.value;
    const anzahl = anzahlInput.value;
    const preis = preisInput.value;
    const kategorie = kategorieSelect.value;

    // Neues Element erstellen und in die Liste einfügen
    // Neues Element erstellen
    const new_li = document.createElement("li");

    // Checkbox hinzufügen
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", () => {
        new_li.classList.toggle("checked", checkbox.checked);
        updatePreis(); // Summe aktualisieren
    });
    new_li.appendChild(checkbox);


    let emoji = "";
    switch (kategorie) {
        case "obst": emoji = "🍎"; break;
        case "gemuese": emoji = "🥦"; break;
        case "drogerie": emoji = "🧴"; break;
    }



    // Text hinzufügen
    const textNode = document.createTextNode(` ${emoji} ${anzahl} x ${artikel}: ${preis}€ p.P. ------ ${(anzahl * preis).toFixed(2)}€`);
    new_li.appendChild(textNode);



    // Füge einen Löschen Button hinzu
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "❌";
    deleteButton.addEventListener("click", () => {
        liste.removeChild(new_li);
        updatePreis();
    })
    new_li.appendChild(deleteButton);

    liste.appendChild(new_li);

    // Gesamtpreis aktualisieren
    gesamtPreis += anzahl * preis;
    updatePreis();

    // Inputfelder leeren
    artikelInput.value = "";
    kategorieSelect.value = "";
    anzahlInput.value = "";
    preisInput.value = "";




})



// Funktionalität mit Enter-Taste
document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addButton.click();
    }
});



function updatePreis() {
    let summe = 0;
    liste.querySelectorAll("li").forEach(li => {
        const checkbox = li.querySelector("input[type='checkbox']");
        if (checkbox && checkbox.checked) {
            // Preis aus dem Text extrahieren (nach ------)
            const text = li.textContent;
            const parts = text.split("------");
            if (parts.length > 1) {
                const preisText = parts[1].replace("€", "").trim();
                const preis = parseFloat(preisText);
                if (!isNaN(preis)) {
                    summe += preis;
                }
            }
        }
    });
    gesamt.textContent = `Gesamt: ${summe.toFixed(2)}€`;
}





// Prüfung der Eingaben (leere Felder markieren)
function validateInputs() {
    let valid = true;
    [artikelInput, anzahlInput, preisInput, kategorieSelect].forEach(input => {
        if (!input.value.trim()) {
            input.classList.add("error");
            valid = false;
        } else {
            input.classList.remove("error");
        }
    });
    return valid;
}


const clearButton = document.getElementById("clearButton");

clearButton.addEventListener("click", () => {
    // Liste leeren
    liste.innerHTML = "";
    // Gesamtpreis zurücksetzen
    updatePreis();
});




const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    //  Ändere den Button-Text entsprechend
    if (document.body.classList.contains("dark")) {
        themeToggle.textContent = "☀️ Light Mode";
    } else {
        themeToggle.textContent = "🌙 Dark Mode";
    }
});