
alexandria = []

function book(title, writer, pages, status) {
 if (!new.target) {console.log("Função sem new");}
 if (findClone(title)) { return alert("ja existe")}
 this.title = title
 this.writer = writer
 this.pages = pages
 this.status = status
 this.id = crypto.randomUUID()
 insertBook(this)
 newCard(this)
}

const mainModal = document.querySelector("#mainModal")
 function newCard(book){
    card = document.createElement("div")
    card.innerHTML = `
    <h3>${book.title}</h3>
    <h4>${book.writer}</h4>
    <h4>${book.pages}</h4>
    <button  id=${book.id + "2"}>Unread</button>
    <button  id=${book.id + "1"}>Remove</button>
    `
    card.className = "bookCard"
    card.id = book.id
    document.querySelector("#bookShelf").appendChild(card)
    updateCard(book.id)    
    document.getElementById(book.id + "1").addEventListener("click", () => removeObjetcById(book.id))
    document.getElementById(book.id + "2").addEventListener("click", () => switchStatus(book.id))
 }

function insertBook(book){
 alexandria.push(book)
}

function findClone(title){
    for (i=0;i<alexandria.length;i++) {
        if (alexandria[i].title === title) {
            return alexandria[i]
        }
        
    }
}
function findObjectById(id){
    for (i=0;i<alexandria.length;i++) {
        if (alexandria[i].id === id) {
            return alexandria[i]
        }
        
    }
}
function removeObjetcById(id){
    alexandria = alexandria.filter(n => n.id != id)
    document.getElementById(id)?.remove();
}
function switchStatus(id){
    findObjectById(id).status = !findObjectById(id).status
    updateCard(id);
}
function updateCard(id){
    card = document.getElementById(id)
    Cstatus = findObjectById(id).status
    if (Cstatus) {
        card.style.borderLeftColor = "lightgreen"
    } else {
        card.style.borderLeftColor = "red"
    }
}
newBook = new book("Harry Potter", "J.K", 149, true)
newBook = new book("Vagabond V#1", "Takehiko Inoue", 256, false)
function getInfo(){
    title = document.querySelector("#titleInput").value
    writer = document.querySelector("#writerInput").value
    pages = document.querySelector("#pagesInput").value
    bookStatus = document.querySelector("#statusInput").value
    if (!title || !writer || !pages) {
        return alert("Preencha os campos")
    }
    newBook = new book(title, writer, pages, bookStatus)
    mainModal.className = "none"
}

function openModal(){
    mainModal.className = "active"
}
function closeModal(){
    mainModal.className = "none"
}