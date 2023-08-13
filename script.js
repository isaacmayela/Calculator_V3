import { calculate } from './calculator.js';

// // // TODO: Faire la manipulation du DOM dans ce fichier

// These variable store all the element of the DOM
let inputValue = document.getElementById("input");

const values = document.querySelectorAll(".numpad");

const displayCalcul = document.getElementById("calcul");

const equalSign = document.getElementById("equals");

const tansformInPercent = document.getElementById("percentage");

const clearInput = document.getElementById("clear");

const resetAll = document.getElementById("reset");

inputValue.value = "";

displayCalcul.innerText = ""

let preventAlotEqual = 0


// These table store the signs 
const keys = ['plus', 'minus', 'times', 'divideby'];
const operators = [];
keys.forEach(function(key){
    operators.push(document.getElementById(key));
})


let doubleDotTable = [];
let otherListe = [];

// These function help to clear the two list if necessary
function reinitializeInput() {
    doubleDotTable = []
    otherListe = []
}

// These function help to reinitialize the computations when it's over
function reinitializeAll() {
    if (displayCalcul.innerText.includes("=")) {
        reinitializeInput()
        inputValue.value = "";
        displayCalcul.innerText = "";
    }
}


// These function help to suppress double dot and double 0
function removeDot(table) {
    let withoutDoubleDot = []

    table.forEach((item) => {
        switch (item) {
            case '0':
                if (withoutDoubleDot.length >= 1){
                    withoutDoubleDot.push("0")
                }
                break;
            case '1':
                withoutDoubleDot.push("1")
                break;
            case '2':
                withoutDoubleDot.push("2")
                break;
            case '3':
                withoutDoubleDot.push("3")
                break;
            case '4':
                withoutDoubleDot.push("4")
                break;
            case '5':
                withoutDoubleDot.push("5")
                break;
            case '6':
                withoutDoubleDot.push("6")
                break;
            case '7':
                withoutDoubleDot.push("7")
                break;
            case '8':
                withoutDoubleDot.push("8")
                break;
            case '9':
                withoutDoubleDot.push("9")
                break;
            case '.':
                if (withoutDoubleDot.length >= 1 && !withoutDoubleDot.includes(".")){
                    withoutDoubleDot.push(".")
                }else if(withoutDoubleDot.length === 0){
                    withoutDoubleDot.push("0")
                    withoutDoubleDot.push(".")
                }
                break;
            default:
                break;
        }
    })

    return withoutDoubleDot

}

// These function clear the input when C is clicked
function clearTheInput() {
    reinitializeInput()
    inputValue.value = "";
}

// The function reset all when AC is clicked
function clearAll(event) {
    event.preventDefault();
    reinitializeInput()
    inputValue.value = "";
    displayCalcul.innerText = "";
}

// these function help to change the label text
function changeLabelText(event, param) {
    event.preventDefault();
    if (displayCalcul.innerText !== "" || inputValue.value !== "") {
        displayCalcul.innerText = inputValue.value + " " + param.innerText
    }
    
    reinitializeInput()
    preventAlotEqual = 0
}

// these function help to change the values of the input
function changeInputValue(event) {
    reinitializeAll()
    if (displayCalcul.innerText === "") {
        doubleDotTable.push(event.target.innerText);

        inputValue.value = removeDot(doubleDotTable).join("");
    }else{
        otherListe.push(event.target.innerText);

        inputValue.value = removeDot(otherListe).join("")
    }
}

// These function change the value of the input 
function displayInputValue(event) {
    event.addEventListener("click", changeInputValue); 
}

// this functions help to do computations

function computation(event) {
    event.preventDefault(); 

    let newLabel = displayCalcul.innerText


    let calculator = Number(newLabel.replace(" ", "").replace("+","").replace("-","").replace("×","").replace("÷",""));
    let newInput = Number(inputValue.value)


    preventAlotEqual +=1
    if (preventAlotEqual > 1){
        return
    }

    if (newLabel.includes("+")){

        displayCalcul.innerText = `${displayCalcul.innerText} ${inputValue.value} =`
        inputValue.value = `${calculator + newInput}`

    }else if(newLabel.includes("-")){

        displayCalcul.innerText = `${displayCalcul.innerText} ${inputValue.value} =`
        inputValue.value = `${calculator - newInput}`

    }else if (newLabel.includes("×")){

        displayCalcul.innerText = `${displayCalcul.innerText} ${inputValue.value} =`
        inputValue.value = `${calculator * newInput}`

    }else if (newLabel.includes("÷")){

        displayCalcul.innerText = `${displayCalcul.innerText} ${inputValue.value} =`
        inputValue.value = `${calculator / newInput}`
    }
    
}

function transformInPercent(event) {
    event.preventDefault();
    inputValue.value = Number(inputValue.value) / 100
}


values.forEach((value) => displayInputValue(value));


operators.forEach((operator) => operator.addEventListener("click", () => {
    changeLabelText(event, operator)
}))


equalSign.addEventListener("click",computation);

tansformInPercent.addEventListener("click",transformInPercent);

clearInput.addEventListener("click", clearTheInput);

resetAll.addEventListener("click", clearAll);
