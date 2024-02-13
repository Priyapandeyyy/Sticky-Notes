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






