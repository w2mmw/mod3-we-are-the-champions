// javascript
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://wearethechampions-2ba44-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const WeAreTheChampionsDB = ref(database, "WeAreTheChampions");

const txtEndorseEl = document.getElementById("comments");
const txtFromEl = document.getElementById("from");
const txtToEl = document.getElementById("to");
const buttonPublishEl = document.getElementById("publish");
const endorsementListEl = document.getElementById("endorsementList");
buttonPublishEl.addEventListener("click", function() {
    let inputValue = {}
    inputValue.from = txtFromEl.value;
    inputValue.endorse = txtEndorseEl.value;
    inputValue.to = txtToEl.value;
    
    push(WeAreTheChampionsDB, inputValue)
    
    clearInputFieldEl()
})

onValue(WeAreTheChampionsDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
    
        clearEndorsementListEl()
        
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            
            appendItemToEndorsementListEl(currentItem)
        }    
    } else {
        clearEndorsementListEl()
    }
})

function clearEndorsementListEl() {
    endorsementListEl.innerHTML = ""
}

function clearInputFieldEl() {
    txtFromEl.value = "";
    txtEndorseEl.value = "";
    txtToEl.value = "";
 
}

function appendItemToEndorsementListEl(item) {
    let itemID = item[0];
    let itemEndorse = item[1].endorse;
    let itemTo = item[1].to;
    let itemFrom = item[1].from;
    
    let listEl = document.createElement("li");
    //let newDivEl = document.createElement("div");
    listEl.className = "list";
    //listEl.textContent = itemEndorse;
    
    listEl.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `WeAreTheChampions/${itemID}`)
        
        remove(exactLocationOfItemInDB)
    })
    
    endorsementListEl.append(listEl);

    let divEl = document.createElement("div");
    divEl.className = "div_endorsements";
    listEl.append(divEl);
    let h3El =document.createElement("h3")
    h3El.className = "h3_to";
    h3El.textContent = `To: ${itemTo}`;
    divEl.append(h3El);
    let pEl = document.createElement("p");
    pEl.className = "txt_endorcements";
    pEl.textContent = itemEndorse;
    divEl.append(pEl);
    let divLikesEl = document.createElement("div");
    divLikesEl.className = "div_likes";
    divEl.append(divLikesEl);
    h3El = document.createElement("h3");
    h3El.className ="h3_from"
    h3El.textContent = `From: ${itemFrom}`;
    divLikesEl.append(h3El);
    let h4El = document.createElement("h4");
    h4El.className ="h3_likes"
    h4El.textContent = "❤️ 0";
    divLikesEl.append(h4El);

}