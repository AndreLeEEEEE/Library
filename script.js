let book1 = new Book("Gulliver's Travels", "Jonathan Swift", 300, true);
let book2 = new Book("Do the Hoogie", "P.J.", 2, false);
let book3 = new Book("How to fry an egg", "Thompson", 800, true);
let myLibrary = [book1, book2, book3];

function Book(name, author, pages, read) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

document.getElementById("addBook").
        addEventListener("click", () => addBookToLibrary());

document.querySelector(".non-affirmative").
        addEventListener("click", () => clearForm());

function addBookToLibrary() {
    document.getElementById("form").style.display = "block";
}

function closeForm() {
    document.getElementById("form").style.display = "none";
}

function clearForm() {
    document.getElementById("booktitle").value = "";
    document.getElementById("bookauthor").value = "";
    document.getElementById("bookpages").value = "";
    if (document.getElementById("isread").checked) {
        document.getElementById("isread").checked = false
    }
    closeForm();
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