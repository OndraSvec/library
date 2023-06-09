const addBookBtn = document.getElementById("add-book-btn");
const closedFormBtn = document.getElementById("closed-form-btn");
const form = document.querySelector("form");
const titleInp = document.getElementById("title");
const authorInp = document.getElementById("author");
const pagesInp = document.getElementById("pages");
const readInp = document.getElementById("read");
const overlay = document.getElementById("overlay");
const container = document.querySelector(".container");
const bookLibrary = [];

function showOverlay() {
  overlay.classList.add("overlay");
}

function showForm() {
  form.setAttribute("style", "scale: 1;");
  showOverlay();
}
addBookBtn.addEventListener("click", showForm);

function hideOverlay() {
  overlay.classList.remove("overlay");
}

function emptyInputValues() {
  // eslint-disable-next-line no-return-assign, no-param-reassign
  [titleInp, authorInp, pagesInp].forEach((item) => (item.value = ""));
}

function hideForm() {
  form.setAttribute("style", "scale: 0;");
  hideOverlay();
  emptyInputValues();
}

closedFormBtn.addEventListener("click", hideForm);

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${title} by ${author}, ${pages}, ${read}`;
  };
}

function checkStatus() {
  return readInp.checked;
}

function readInput() {
  if (!checkStatus()) return "Not read";
  return "Read";
}

function displayBooks() {
  const newBook = document.createElement("div");
  newBook.classList.add("book");
  const bookTitle = document.createElement("p");
  const bookAuthor = document.createElement("p");
  const bookPages = document.createElement("p");
  const readBtn = document.createElement("button");
  const removeBtn = document.createElement("button");
  const btns = document.createElement("div");
  btns.classList.add("buttons-container");
  if (!checkStatus()) {
    readBtn.textContent = "Not read";
    readBtn.classList.add("buttons", "readRed");
  } else {
    readBtn.textContent = "Read";
    readBtn.classList.add("buttons", "readGreen");
  }
  // eslint-disable-next-line no-use-before-define
  readBtn.addEventListener("click", toggleReadStatus);
  removeBtn.textContent = "Remove";
  removeBtn.classList.add("buttons", "removeRed");
  // eslint-disable-next-line no-use-before-define
  removeBtn.addEventListener("click", removeBook);
  bookTitle.textContent = titleInp.value;
  bookAuthor.textContent = `by ${authorInp.value}`;
  bookPages.textContent = `${pagesInp.value} pages`;
  [bookTitle, bookAuthor, bookPages].forEach((item) =>
    item.setAttribute(
      "style",
      "font-weight: 700; color: var(--card-green-darker);"
    )
  );
  newBook.appendChild(bookTitle);
  newBook.appendChild(bookAuthor);
  newBook.appendChild(bookPages);
  btns.appendChild(readBtn);
  btns.appendChild(removeBtn);
  newBook.appendChild(btns);
  container.appendChild(newBook);
}

function addBook(e) {
  bookLibrary.push(
    new Book(titleInp.value, authorInp.value, pagesInp.value, readInput())
  );
  displayBooks();
  e.preventDefault();
  hideOverlay();
  hideForm();
  emptyInputValues();
}

form.addEventListener("submit", addBook);

function findBookIndex(e) {
  const bookCardDiv = e.target.parentNode.parentNode;
  const titleOfBook = bookCardDiv.firstChild.textContent;
  const authorOfBook = bookCardDiv.childNodes[1].textContent;
  const pagesOfBook = bookCardDiv.childNodes[2].textContent;
  const theRightBookIndex = bookLibrary.findIndex(
    (book) =>
      book.title === titleOfBook &&
      `by ${book.author}` === authorOfBook &&
      `${book.pages} pages` === pagesOfBook
  );
  return theRightBookIndex;
}

function removeBookFromArray(e) {
  bookLibrary.splice(findBookIndex(e), 1);
  return bookLibrary;
}

function removeBookCard(e) {
  const bookNum = e.target;
  const bookDiv = bookNum.parentNode.parentNode;
  container.removeChild(bookDiv);
}

function removeBook(e) {
  removeBookFromArray(e);
  removeBookCard(e);
}

function toggleReadStatus(e) {
  if (e.target.textContent === "Read") {
    e.target.textContent = "Not read";
    e.target.classList.toggle("readRed");
    e.target.classList.toggle("readGreen");
    bookLibrary[findBookIndex(e)].read = "Not read";
  } else {
    e.target.textContent = "Read";
    e.target.classList.toggle("readRed");
    e.target.classList.toggle("readGreen");
    bookLibrary[findBookIndex(e)].read = "Read";
  }
}
