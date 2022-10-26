import React from 'react';

import {db} from './firebase-config'

import './styles.css';
import './table.css'
import { async } from '@firebase/util';
import { collection, getDocs, doc, deleteDoc, addDoc} from 'firebase/firestore'
import { getAllByRole } from '@testing-library/react';

export default function OptionTable({wheelElements, setWheelElements, tableValues, setTableValues, tableCollectionRef, wheelCollectionRef}) {

    var numEntries = tableValues.length + 1
    console.log("gae")
    console.log(tableValues)
    console.log(wheelElements)

    function updateWheel() {
        console.log("inside update wheel")
        var inputs = document.getElementsByClassName('entry-row')
        var notHiddenInputs = []
        console.log("getting inputs")
        console.log(inputs)
        console.log("Inside wheel getting table values")
        console.log(tableValues)
        var probArray = []
        var entryArray = []
        var newTableValues = []
        var arraySum = 0

        console.log('iterating through inptus')
        
        Array.prototype.forEach.call(inputs, (e) => {
            if(!e.classList.contains('hide')) {
                notHiddenInputs.push(e)
            }
        })
        console.log(notHiddenInputs)

        for (var i = 0; i < notHiddenInputs.length; i++) {
            var entryName = notHiddenInputs[i].getElementsByClassName('wheel-entry')[0].value
            var entryProb = parseInt(notHiddenInputs[i].getElementsByClassName('prob-entry')[0].value)

            newTableValues.push({'name':entryName, 'probability':entryProb})
            probArray.push(entryProb)
            entryArray.push(entryName)
            arraySum += entryProb
        }

        console.log("printing prob array")
        console.log(probArray)
        console.log("printing arraySum")
        console.log(arraySum)

        console.log("Looking at new values")
        console.log(newTableValues.length)
        console.log(newTableValues)


        updateTableValues(newTableValues, tableValues)
        setTableValues(newTableValues)
        console.log(newTableValues)
        // //removing table values
        var addedRows = document.getElementsByClassName('added-row')
        console.log("DELETING ROWS")
        console.log(addedRows)
        console.log(addedRows.length)
        var index = 0 
        while (addedRows.length > 0) {
            console.log(index)
            console.log(addedRows[index])
            addedRows[index].remove()
        }

        inputs = document.getElementsByClassName('entry-row')
        console.log("Removing hiddens")
        console.log(inputs)
        Array.prototype.forEach.call(inputs, (e) => {
            if(!e.hidden) {
                console.log(e)
                e.classList.remove('hide')
            }
        })        
        //removing table values

        // console.log("creating new table values")
        // console.log(newTableValues)

        // setTableValues(newTableValues)
        // if (arraySum != 100) {
        //     alert("Probabilities need to equal 100!")
        // }

        // var probGCD = findGCD(probArray, probArray.length)
        // var allElements = []
        // for (var i = 0; i < probArray.length; i++) {
        //     var numEl = probArray[i]/probGCD
        //     for (var j = 0; j < numEl; j++) {
        //         allElements.push(entryArray[i])
        //     }
        // }

        // console.log(allElements)
        // shuffleArray(allElements)
        // updateWheelValues(wheelElements, allElements)
        // updateWheelValues(allElements)
        // console.log(allElements)
        // setWheelElements(allElements)
        // window.location.reload();

    }

    function updateTableValues(newTableValues, oldTableValues) {
        console.log("Inside update table funct")
        console.log(newTableValues)
        console.log(oldTableValues)
        var newData = []
        var deleteValue = async(id) => {
            var userDoc = doc(db, 'table_values', id)
            await deleteDoc(userDoc)
        }

        var addValue = async(data) => {
            console.log("in add value")
            var {id} = await addDoc(tableCollectionRef, {'name':data['name'], 'probability': data['probability']})
            console.log("printing id")
            console.log(id)
            newTableValues.push({"id":id,'name':data['name'],'probability':data['probability']})
        }

        for (var i = 0; i < oldTableValues.length; i++) {
            console.log("deleting values")
            // console.log(oldTableValues)
            console.log(oldTableValues[i].id)
            deleteValue(oldTableValues[i].id)
        }

        for (var i = 0; i < newTableValues.length; i++) {
            console.log("here")
            console.log(newTableValues[i])
            var {itemId} = addValue(newTableValues[i])
            console.log(itemId)
        }

        console.log("Here are the new table values")
        console.log(newTableValues)
        // setTableValues(newData)

    }

    function updateWheelValues(wheelElements, allElements) {
        var deleteValue = async(id) => {
            var elementDoc = doc(db, 'wheel_elements', id)
            await deleteDoc(elementDoc)
        }

        var addValue = async(data) => {
            await addDoc(wheelCollectionRef, {'name':data})
        }

        for (var i = 0; i < wheelElements.length; i++) {
            console.log("Successfully deleting")
            deleteValue(wheelElements[i].id)
        }

        for (var i = 0; i < allElements.length; i++) {
            console.log("here")
            console.log(allElements[i])
            addValue(allElements[i])
        }
    }
    function addEntry() {
        var table = document.getElementById("table")
        var entryRow = document.createElement("div")
        var wheelEntry = document.createElement("input")
        var entryProb = document.createElement("input")
        var deleteButton = document.createElement("button")

        deleteButton.innerText = "Delete Row"
        deleteButton.id = "delete-button-" + numEntries
        deleteButton.addEventListener('click', (e) => {deleteEntry(e)})

        entryRow.classList.add('entry-row')
        entryRow.classList.add('added-row')
        entryRow.id = 'entry-row-' + numEntries
        wheelEntry.classList.add('wheel-entry')
        entryProb.classList.add('prob-entry')

        entryRow.appendChild(wheelEntry)
        entryRow.appendChild(entryProb)
        entryRow.appendChild(deleteButton)

        table.appendChild(entryRow)
        numEntries += 1
    }

    function deleteEntry(e) {
        var rowNum = e.target.id.substring(14)
        console.log(rowNum)
        var elName = 'entry-row-' + rowNum
        console.log("deleting entry")
        console.log(elName)

        document.getElementById(elName).classList.add('hide')
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Function to return gcd of a and b
    function gcd(a, b) {
        if (a == 0)
            return b;
        return gcd(b % a, a);
    }
  
    // Function to find gcd of array
    // of numbers
    function findGCD(arr, n) {
        let result = arr[0];
        for (let i = 1; i < n; i++) {
            result = gcd(arr[i], result);
  
            if (result == 1) {
                return 1;
            }
        }
        return result;
    }

    function clear () {
        const inputs = document.getElementsByClassName('wheelEntry')
        console.log(inputs)
        for (var i=0; i < inputs.length; i++) {
            var el = inputs[i]
            el.value = ""
        }
    }

    function editForm() {
        let editButton = document.getElementById('edit-button');
        let saveButton = document.getElementById('save-button');
        let clearButton = document.getElementById('clear-button');
        let addButton = document.getElementById('add-button');
        let deleteButtons = document.getElementsByClassName('delete-button');

        saveButton.removeAttribute('hidden');
        clearButton.removeAttribute('hidden');
        addButton.removeAttribute('hidden');

        editButton.setAttribute('hidden', '');
        
        for (var i = 0; i < deleteButtons.length; i++) {
            deleteButtons[i].removeAttribute('hidden');
        }
    }

    function cancelEntry() {}


    return (
        <div>
            <h1>Entry Table</h1>
            {console.log("HELLO")}
            {console.log(tableValues.length)}
            <div class="table" id="table">
                {console.log("gae3")}
                {tableValues.map((element, index) => { return (
                    <div class="entry-row" id={"entry-row-" + index}>
                        {console.log("gae4")}
                        <input class="wheel-entry" defaultValue={element.name}/>
                        <input class="prob-entry" defaultValue={element.probability}/>
                        <button class="delete-button" onClick={deleteEntry} id={"delete-button-" + index}>Delete Row</button>
                    </div>
                )})}
                {console.log("gae5")}
            </div>
            {/* <button id="edit-button" onClick={editForm}>Edit Table</button> */}
            <button id="save-button"  onClick={updateWheel}>Save</button>
            <button id="cancel-button"  onClick={cancelEntry}>Cancel</button>
            <button id="clear-button"  onClick={clear}>Clear</button>
            <button id="add-button"  onClick={addEntry}>Add New Entry</button>
            {console.log("gae6")}
        </div>
    )
}