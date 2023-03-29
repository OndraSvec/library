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

function readInput() {
  if (!readInp.checked) return "Not read";
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
  readBtn.textContent = "Read";
  readBtn.classList.add("buttons", "readGreen");
  removeBtn.textContent = "Remove";
  removeBtn.classList.add("buttons", "readRed");
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
  [newBook, readBtn, removeBtn].forEach((item) =>
    item.setAttribute("data-attribute", `${bookLibrary.length - 1}`)
  );
  container.appendChild(newBook);
}

function addBookNum() {
  // eslint-disable-next-line no-return-assign, no-param-reassign
  bookLibrary.forEach((book) => {
    // eslint-disable-next-line no-param-reassign
    book.dataAttribute = bookLibrary.indexOf(book);
  });
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
  addBookNum();
  console.log(bookLibrary);
}

form.addEventListener("submit", addBook);
