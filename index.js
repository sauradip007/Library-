console.log("These are my es6 classes")
class Book{
    constructor(name,author,type){
    this.name = name,
    this.author = author,
    this.type = type;

}
}
class Display {
  add(book) {
    let tableBody = document.getElementById("tableBody");
    let uiString = `<tr>
            
            <td>${book.name}</td>
            <td>${book.author}</td>
            <td>${book.type}</td>
    </tr>`;
    tableBody.innerHTML += uiString;
  }
  clear() {
    let libraryForm = document.getElementById("libraryForm");
    libraryForm.reset();
    // resets form elements
  }
  // checks if the entry is valid
  validate(book) {
    if (book.name.length < 2 || book.author.length < 2) {
      return false;
    } else {
      return true;
    }
  }
  // Saves the file , it needs to be called so that list does not disappear on refreshing
  saveData() {
    let name = localStorage.getItem("name");
    let author = localStorage.getItem("author");
    let radio = localStorage.getItem("radio");
    var authorObj;
    var radioObj;
    var nameObj;

    // for radio btn
    if (radio == null) {
      radioObj = [];
    } else {
      radioObj = JSON.parse(radio);
    }
    var buttonValue;
    let fiction = document.getElementById("fiction");
    let programming = document.getElementById("programming");
    let cooking = document.getElementById("cooking");
    if (fiction.checked) {
      buttonValue = fiction.value;
    } else if (programming.checked) {
      buttonValue = programming.value;
    } else if (cooking.checked) {
      buttonValue = cooking.value;
    }
    radioObj.push(buttonValue);
    localStorage.setItem("radio", JSON.stringify(radioObj));

    if (author == null) {
      authorObj = [];
    } else {
      authorObj = JSON.parse(author);
    }
    //for author
    let authorValue = document.getElementById("author").value;
    authorObj.push(authorValue);
    localStorage.setItem("author", JSON.stringify(authorObj));
    if (name == null) {
      nameObj = []; //no names added
    } else {
      nameObj = JSON.parse(name);
    }
    //for book names
    let nameValue = document.getElementById("bookName").value;
    nameObj.push(nameValue);
    localStorage.setItem("name", JSON.stringify(nameObj));

    console.log(nameObj); //name objects
    console.log(authorObj); //author objects
    console.log(radioObj); //radio objects
  }
 show (type, displayMessage) { //an alert pop up displaying success or failure of entry
    let message = document.getElementById("msg");
    message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
  <strong>Message: </strong> ${displayMessage}
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>`;
    // Timeout function
    setTimeout(function () {
      message.innerHTML = "";
    }, 2000); //disappears after 2 secs
  };
}
// Add submit event listener to form
let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener('submit', libraryFormSubmit); //submit btn add event listener

function libraryFormSubmit(e)
{
    e.preventDefault();
   let name = document.getElementById('bookName').value;
   let author = document.getElementById("author").value;
   var type;
//    fiction,programming,cooking
    let fiction = document.getElementById("fiction");
    let programming = document.getElementById("programming");
    let cooking = document.getElementById("cooking");
  
   
   if(fiction.checked){
       type = fiction.value;
   }
   else if(programming.checked){
       type = programming.value;
   }
   else if(cooking.checked)
   {
       type = cooking.value;
   }
   let book = new Book(name,author,type)
    console.log(book);
    
    
   let display = new Display();

   if(display.validate(book))
   {
       display.add(book);
      
       display.show("success", ' Your book has been successfully added');
       display.saveData();
   }
   else{
       display.show('danger', ' Sorry this book could not be added');
   }



   display.clear();
}