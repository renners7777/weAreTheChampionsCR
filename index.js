// We need to set up a firebase database to store data from user comments.

// Each time a user enters praise in the textarea and presses the Publish button, the database needs to create an ID

// The user who enters the comment should be able to remove their comment. 

// The comment needs to be added to the "endorsements" section in the DOM

// If possible the latest comment should be at the top - displayed in reverse order (time stamp?)

// Import the functions you need from the SDKs you need

  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://we-are-the-champions-cr-default-rtdb.europe-west1.firebasedatabase.app"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementsInDB = ref(database, "endorsements")

const inputFieldEl = document.getElementById("input-field")
const publishButtonEl = document.getElementById("publish-button")
const endorsementEl = document.getElementById("add-endorsements")

publishButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    
    push(endorsementsInDB, inputValue)
    
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
        endorsementsEl.innerHTML = "No endorsements here... yet"
    }
})

function clearEndorsementsEl() {
    EndorsementsEl.innerHTML = ""
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
    
    endorsementsEl.append(newEl)
}