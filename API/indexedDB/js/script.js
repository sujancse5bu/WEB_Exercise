// Create needed constants
const list = document.querySelector('ul');
const titleInput = document.querySelector('#title');
const bodyInput = document.querySelector('#body');
const form = document.querySelector('form');
const submitBtn = document.querySelector('form button');
let db; // Create an instance of a db object for us to store the open database in
window.onload = () => {
    let request = window.indexedDB.open('notes_db', 1);  // Open our database; it is created if it doesn't already exist
    request.onerror = () => { console.log('Database failed to open')}
    request.onsuccess = () => {
        console.log('Database opened successfully')
        db = request.result // Stored the opened database object in the db variable. This is used a lot below
        displayData() // Run the displayData() function to display the notes already in the IDB
    }
    request.onupgradeneeded = (e) => {  // Setup the database tables if this has not already been done
        let db = e.target.result // Grab a reference to the opened database
        let objectStore = db.createObjectStore('notes_os', { keyPath: 'id', autoIncrement: true}) // Create an ObjectStore to store our notes in (basically like a single table)
        objectStore.createIndex('title', 'title', {unique: false})
        objectStore.createIndex('body', 'body', {unique: false})
        console.log('Database setup complete')
    }
    form.onsubmit = addData
}
function addData(e) {
    e.preventDefault()
    let newItem = { title: titleInput.value, body: bodyInput.value}
    let transaction = db.transaction(['notes_os'], 'readwrite') // open a read/write db transaction, ready for adding the data
    let objectStore = transaction.objectStore('notes_os') // call an object store that's already been added to the database
    let request = objectStore.add(newItem) // Make a request to add our newItem object to the object store
    request.onsuccess = () => {
        titleInput.value = ''
        bodyInput.value = ''
    }
    transaction.oncomplete = () => {
        console.log('Transaction completed: database modification finished.')
        displayData()
    }
    transaction.onerror = () => {
        console.log('Transaction not opened due to error')
    }
}
function displayData() {
    while(list.firstChild) list.removeChild(list.firstChild)
    let objectStore = db.transaction('notes_os').objectStore('notes_os') // open our object store and then get a cursor - which iterates through all the different data items in the store
    objectStore.openCursor().onsuccess = (e) => {
        let cursor = e.target.result // get a reference to the cursor
        if (cursor) {
            const listItem = document.createElement('li'),
                h3 = document.createElement('h3'),
                para = document.createElement('p')
            listItem.appendChild(h3)
            listItem.appendChild(para)
            list.appendChild(listItem)
            h3.textContent = cursor.value.title
            para.textContent = cursor.value.body
            listItem.setAttribute('data-note-id', cursor.value.id)
            const deleteBtn = document.createElement('button')
            listItem.appendChild(deleteBtn)
            deleteBtn.textContent = 'Delete'
            deleteBtn.onclick = deleteItem
            cursor.continue()
        } else {
            if (!list.firstChild) {
                const listItem = document.createElement('li')
                listItem.textContent = 'No notes stored'
                list.appendChild(listItem)
            }
            console.log('Notes all displayed')
        }
    }
}
function deleteItem(e) {
    let noteId = Number(e.target.parentNode.getAttribute('data-note-id'))
    let transaction = db.transaction(['notes_os'], 'readwrite') // open a database transaction and delete the task, finding it using the id we retrieved above
    let objectStore = transaction.objectStore('notes_os')
    let request = objectStore.delete(noteId)
    transaction.oncomplete = () => {
        e.target.parentNode.parentNode.removeChild(e.target.parentNode)
        console.log('Note' + noteId + ' deleted')
        if (!list.firstChild) {
            let listItem = document.createElement('li')
            listItem.textContent = 'No notes stored'
            list.appendChild(listItem)
        }
    }
}