let myLibrary = [];

function Book(name, author, pages, read) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

document.getElementById("addBook").
        addEventListener("click", () => addBookToLibrary());

document.querySelector(".affirmative").
        addEventListener("click", () => processNewBook());

document.querySelector(".non-affirmative").
        addEventListener("click", () => clearForm());

function addBookToLibrary() {
    document.getElementById("form").style.display = "block";
}

function clearForm() {
    document.getElementById("booktitle").value = "";
    document.getElementById("bookauthor").value = "";
    document.getElementById("bookpages").value = "";
    if (document.getElementById("isread").checked) {
        document.getElementById("isread").checked = false
    }
    document.getElementById("form").style.display = "none";
}

function restockLibrary() {
    let div = document.querySelector("#shelf");
    while (div.hasChildNodes()) {
        div.removeChild(div.lastElementChild);
    }
    myLibrary.forEach(function(book, index) {
        // The book itself
        let bookDiv = document.createElement("div");
        bookDiv.setAttribute("id", index);
        bookDiv.setAttribute("class", "book");
        div.appendChild(bookDiv);

        // Book title
        let title = document.createElement("p");
        title.innerHTML = `Title: <b>${book.name}</b>`;
        bookDiv.appendChild(title);

        // Book author
        let writer = document.createElement("p");
        writer.textContent = `Author: ${book.author}`;
        bookDiv.appendChild(writer);

        // Amount of pages
        let pageNumber = document.createElement("p");
        pageNumber.textContent = `Pages: ${book.pages}`;
        bookDiv.appendChild(pageNumber);

        // Was the book read?
        let toggleRead = document.createElement("button");
        readStatus(toggleRead, book.read);
        toggleRead.addEventListener("click", function() {
            book.read = !book.read;
            readStatus(toggleRead, book.read);
        });
        bookDiv.appendChild(toggleRead);

        // Remove from library
        let removeButton = document.createElement("button");
        removeButton.textContent = "Remove book";
        removeButton.setAttribute("class", "remove");
        removeButton.addEventListener("click", () => removeBook(book));
        bookDiv.appendChild(removeButton);
    });
}

function readStatus(toggleRead, isRead) {
    if (isRead) {
        toggleRead.textContent = "Already Read";
        toggleRead.setAttribute("class", "read");
    }
    else {
        toggleRead.textContent = "Not Read Yet";
        toggleRead.setAttribute("class", "not-read");
    }
}

function removeBook(currentBook) {
    myLibrary = myLibrary.filter(book => book !== currentBook);
    restockLibrary();
}

function processNewBook() {
    let title = document.getElementById("booktitle").value;
    let author = document.getElementById("bookauthor").value;
    let pages = document.getElementById("bookpages").value;
    let read = document.getElementById("isread").checked;
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    clearForm();
    restockLibrary();
}