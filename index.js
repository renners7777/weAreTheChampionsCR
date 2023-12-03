import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://we-are-the-champions-cr-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementsInDB = ref(database, "endorsements")

const inputFieldEl = document.getElementById("input")
const publishButtonEl = document.getElementById("publish")
const endorsementEl = document.getElementById("endorsement")

publishButtonEl.addEventListener("click", function() {
    
    let inputValue = inputFieldEl.value
    
    push(endorsementsInDB, inputValue)

    endorsementEl.innerHTML += `<p>${inputValue}</p>`
    
    clearInputFieldEl()
})

onValue(endorsementsInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
    
        clearEndorsementsEl()
        
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            
            appendItemToEndorsementsEl(currentItem)
        }    
    } else {
        endorsementEl.innerHTML = "No endorsements here... yet"
    }
})

function clearEndorsementsEl() {
    endorsementEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function appendItemToEndorsementsEl(item) {
    let itemID = item[0]
    let itemValue = item[1]
    
    let newEl = document.createElement("p")
    
    newEl.textContent = itemValue

    newEl.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `endorsements/${itemID}`)
        
        remove(exactLocationOfItemInDB)
    })
    
    endorsementEl.append(newEl)
}

