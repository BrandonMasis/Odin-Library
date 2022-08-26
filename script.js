const library = document.querySelector(".library");

const newBookBtn = document.querySelector("#newBookBtn");

const bookInfoForm = document.querySelector("#bookInfoForm");
const closeInfoForm = document.querySelector("#closeForm");

const bookTitle = document.querySelector("#bookTitle");
const bookAuthor = document.querySelector("#bookAuthor");
const bookPages = document.querySelector("#bookPages");
const bookIsRead = document.querySelector("#bookIsRead");
const addBookBtn = document.querySelector("#addBookBtn");
let deleteEntry = document.querySelectorAll(".deleteEntry");

let bookIsReadClass = document.querySelectorAll(".bookIsRead");

let myLibrary = [
  {
    tittle: "In Search of Lost Time",
    author: "Marcel Proust",
    pages: "4215",
    isRead: true,
  },
  {
    tittle: "Don Quijote",
    author: "Miguel de Cervantes",
    pages: "1077",
    isRead: false,
  },
  {
    tittle: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    pages: "180",
    isRead: false,
  },
];

displayBooks();

function Book(title, author, pages, isRead) {
  this.tittle = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

function addBookToLibrary(title, author, pages, isRead) {
  myLibrary.push(new Book(title, author, pages, isRead));
}

addBookBtn.addEventListener("click", () => {
  if (
    bookTitle.checkValidity() == true &&
    bookAuthor.checkValidity() == true &&
    bookPages.checkValidity() == true
  ) {
    addBookToLibrary(
      bookTitle.value,
      bookAuthor.value,
      bookPages.value,
      bookIsRead.checked
    );

    (bookTitle.value = ""),
      (bookAuthor.value = ""),
      (bookPages.value = ""),
      (bookIsRead.checked = "");
  } else {
    alert("Please fill out all the spaces");
  }
  displayBooks();
});

closeInfoForm.addEventListener("click", () => {
  bookInfoForm.style.display = "none";
});

newBookBtn.addEventListener("click", () => {
  if (bookInfoForm.style.display == "flex") {
    bookInfoForm.style.display = "none";
  } else {
    bookInfoForm.style.display = "flex";
  }
});

function displayBooks() {
  let l = myLibrary.length;
  library.innerHTML = "";

  for (let i = 0; i < l; i++) {
    if (myLibrary[i].isRead == true) {
      library.innerHTML += `<div class="book" data-index="${(myLibrary[
        i
      ].index = [i])}">
      <div class="tittle"><h2>${myLibrary[i].tittle}</h2></div>
      <h3><span class="blueMark">Author:</span>${myLibrary[i].author}</h3>
      <h3><span class="blueMark">Pages:</span>${myLibrary[i].pages}</h3>
      <div class="row">
        <div class="toggle-pill-dark">
          <h3><span class="blueMark">Read:</span>
          <input type="checkbox"  class="bookIsRead"  id="bookIsRead${i}" name="check" checked="${
        myLibrary[i].isRead
      }">
          <label for="bookIsRead${i}"></label>
        </div>
        <div class="deleteEntry"><button>Delete</button></div>`;
    } else {
      library.innerHTML += `<div class="book"  data-index="${(myLibrary[
        i
      ].index = [i])}">
      <div class="tittle"><h2>${myLibrary[i].tittle}</h2></div>
      <h3><span class="blueMark">Author:</span>${myLibrary[i].author}</h3>
      <h3><span class="blueMark">Pages:</span>${myLibrary[i].pages}</h3>
      <div class="row">
        <div class="toggle-pill-dark">
          <h3><span class="blueMark">Read:</span>
          <input type="checkbox" class="bookIsRead" id="bookIsRead${i}" name="check">
          <label for="bookIsRead${i}"></label>
        </div>
        <div class="deleteEntry"><button>Delete</button></div>`;
    }
  }

  bookIsReadClass = document.querySelectorAll(".bookIsRead");

  for (let i = 0; i < myLibrary.length; i++) {
    myLibrary[i].index = i;
    //Is there another way to do this?
  }

  deleteEntry = document.querySelectorAll(".deleteEntry");
  deleteEntry.forEach((button) => {
    button.addEventListener("click", (e) => {
      let dataIndex =
        button.parentElement.parentElement.getAttribute("data-index");

      myLibrary.splice(dataIndex, 1);
      displayBooks();
    });
  });
}

bookIsReadClass.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    let dataIndex =
      checkbox.parentElement.parentElement.parentElement.parentElement.getAttribute(
        "data-index"
      );
    if (myLibrary[dataIndex].isRead == false) {
      myLibrary[dataIndex].isRead = true;
    } else {
      myLibrary[dataIndex].isRead == false;
    }
  });
});
