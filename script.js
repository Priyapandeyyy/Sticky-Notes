const Container = document.getElementById("container");
let SelectedText = "";
let rangeAT = "";

let noteData = JSON.parse(localStorage.getItem("noteData")) || [];

function CreateNewNote(e) {
    let div = document.createElement("div");
    div.classList.add("note-row");
    let newHTML = 
    // `<div class="note-row">
    `<div class="note-editor" contenteditable="true" onmouseup="getSelectedText()" id="note-editor">` + e + `
    </div>
     <div class="note-controls">
     <div onclick="getSelectedStyle('capitalize')" class="capitalize">Aa</div>
     <div onclick="getSelectedStyle('bold')" class="bold">B</div>
     <div onclick="getSelectedStyle('italic')" class="italic">I</div>
     <div onclick="getSelectedStyle('linethrough')" class="linethrough">ab</div>
     <div onclick="getSelectedStyle('underline')" class="underline">U</div>
        <hr/>
        <img src="Images/delete.png" onclick="DeleteNode(this)" />
     </div>`;

    div.innerHTML = newHTML;
    Container.appendChild(div);

    const noteEditor = document.querySelectorAll(".note-editor");
    noteEditor.forEach((el) => {
        el.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                document.execCommand("insertHTML", false, "<br/>");
                return false;
            }
        })
});
    SaveNoteData();
}




    document.addEventListener('keydown', e => {
        if (e.ctrlKey && e.key === 's'){
            e.preventDefault();
            SaveNoteData();
        }
    });

    function SaveNoteData() {
        noteData = [];
        localStorage.setItem("noteData", []);
        const noteEditor = document.querySelectorAll(".note-editor");
        noteEditor.forEach((el) => {
            if(el.innerHTML !== ""){
                let HTML = { value: el.innerHTML };
                noteData.push(HTML);  
            }
        });

        localStorage.setItem("noteData", JSON.stringify(noteData));
    }


    readData();
    function readData(){
        noteData.forEach((element) => {
            CreateNewNote(element.value + "<br />");
        });
    }

    function getSelectedText(){
        SelectedText = window.getSelection().toString();
        rangeAT = window.getSelection().getRangeAt(0);
    }

    function getSelectedStyle(style){
        if(SelectedText) {
        let div = document.createElement("span");
        div.classList.add(style);
        div.innerHTML = SelectedText;
        rangeAT.deleteContents();
        rangeAT.insertNode(div);
        }
    }

    function DeleteNode(e){
        let conform = confirm("Are you sure! Do you want to Delete?");
        if(conform){
            e.parentElement.parentElement.remove();
            SaveNoteData;
        }
    }


// const addNoteButton = noteContainer.querySelector(".add-note");

// getNotes().forEach(note => {
//     const noteElement = createNoteElement(note.id, note.content);
//     noteContainer.insertBefore(noteElement, addNoteButton);
// });

// addNoteButton.addEventListener("click", () => addNote());










// // Taking notes value for locla storage
// function getNotes() {
//     return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
// }

// // Saving note value
// function saveNotes(notes){
//     localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
// }

// // Creating Note element
// function createNoteElement(id, content){
//     const element = document.createElement("note-row");

//     element.classList.add("note");
//     element.value = content;
//     element.placeholder = "Empty Sticky Note";

//     element.addEventListener("change", () => {
//         updateNote(id, element.value);
//     });

//     // dblclick = doubleclick
//     element.addEventListener("dblclick", () => {
//         const doDelete = confirm("Are you sure you wish to delete this note");

//         if(doDelete){
//             deleteNote(id, element);
//         }
//     });

//     return element;
// }


// // Adding new note
// function addNote(){
//     const Notes = getNotes();
//     const noteObject = {
//         id: Math.floor(Math.random()*10000),
//         content: ""
//     };

//     const noteElement = createNoteElement(noteObject.id, noteObject.content);
//     noteContainer.insertBefore(noteElement, addNoteButton);

//     Notes.push(noteObject);
//     saveNotes(Notes);
// }


// // Updating Note
// function updateNote(id, newContent){
//     const notes = getNotes();
//     const targetNote = notes.filter(note => note.id == id)[0];

//     targetNote.content = newContent;
//     saveNotes(notes);
// }

// // Deleting Note
// function deleteNote(id, element){
//     const notes = getNotes().filter(note => note.id != id);
//     saveNotes(notes);
//     noteContainer.removeChild(element);
// }

// }



