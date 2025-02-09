const inputText = document.getElementById('inputText')
const inputPriority = document.getElementById('inputPriority')
const inputDate = document.getElementById('inputDate')
const addButton = document.getElementById('addButton')
const resetButton = document.getElementById('resetButton')
const deleteAllTask = document.getElementById('deleteAllTask')
const inputContainer = document.getElementById('inputContainer')
const tasksTodo = document.getElementById('tasksTodo')
const tasksDone = document.getElementById('tasksDone')
const tasksLate = document.getElementById('tasksLate')



// Membuat value dari tanggal menjadi default hari ini
window.addEventListener('DOMContentLoaded', dateLoad())
function dateLoad () {
    const today = new Date().toISOString().split('T')[0]
    inputDate.value = today}

addButton.addEventListener("click", addTask)
resetButton.addEventListener('click',() => {
    inputContainer.reset()
})

deleteAllTask.addEventListener("click", deleteAll)

function addTask () {
    const taskText = inputText.value.trim()
    const priorityText = inputPriority.value
    const dateValue = inputDate.value

    if (taskText === "") {
        alert("Please enter a task !")
        return
    }

    if (dateValue === "") {
        alert("Please enter a date !")
        return
    }

    const newTaskList = {
        text: taskText,
        priority: priorityText,
        date: dateValue,
        done: false
    }

    const liList = document.createElement('li')
    liList.style.listStyleType = 'none'
    liList.style.marginBottom = '20px'

    renderTask(newTaskList); //Untuk menampilkan list menggunakan High order Function
}

function renderTask(newTaskList) {
    const liList = document.createElement('li')
    liList.style.listStyleType = 'none'
    liList.style.marginBottom = '20px'
    
    const checkbox = document.createElement('input')
    checkbox.type = "checkbox"
    checkbox.className = "checkboxText"

    checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
            //Move to done list
            ulDone.appendChild(liList)
            textSpan.style.textDecoration = 'line-through'
        } else {
            //Move to Tasks ToDo
            ulTodo.appendChild(liList)
            textSpan.style.textDecoration = 'none'
        }
    })

    const textContainer = document.createElement('span')
    textContainer.className = 'textContainer'

    const textSpan = document.createElement('span')
    textSpan.textContent = newTaskList.text
    textSpan.className = "text-todo"

    const br = document.createElement('br')

    const dateSpan = document.createElement('span')
    dateSpan.textContent = newTaskList.date + ' | '
    dateSpan.className = "date-todo"

    const prioritySpan = document.createElement('span')
    prioritySpan.textContent = newTaskList.priority
    prioritySpan.className = "date-todo"
    
    const divButton = document.createElement('div')
    divButton.className = 'divButton'
    
    const editBtn = document.createElement('button')
    editBtn.textContent = 'Edit'
    editBtn.className = 'addButton'
    editBtn.style.fontSize = '0.9em'
    editBtn.style.height = '1.8em'
    editBtn.addEventListener('click', () => {

    })
    
    const deleteBtn = document.createElement('button')
    deleteBtn.textContent = 'Delete'
    deleteBtn.className = 'resetButton'
    deleteBtn.style.fontSize = '0.9em'
    deleteBtn.style.height = '1.8em'
    deleteBtn.addEventListener('click', () => {
        liList.remove()
    })
    
    // Masukkan delete button dan edit button ke dalam div
    divButton.appendChild(editBtn)
    divButton.appendChild(deleteBtn)
    
    // Masukkan value yang di input ke dalam li List
    textContainer.appendChild(checkbox)
    textContainer.appendChild(textSpan)
    liList.appendChild(textContainer)
    // liList.appendChild(checkbox)
    // liList.appendChild(textSpan)
    liList.appendChild(br)
    liList.appendChild(dateSpan)
    liList.appendChild(prioritySpan)
    liList.appendChild(divButton)

    // Masukkan semua yang ada pada li list ke dalam element ul todo
    ulTodo.appendChild(liList)


    // Delete semua teks di kotak input
    inputContainer.reset()

    // Membuat value dari tanggal menjadi default hari ini
    dateLoad()
}

function deleteAll () {
    ulTodo.remove()
    ulDone.remove()
    ulLate.remove()

    const newUltodo = document.createElement('ul')
    newUltodo.setAttribute('id','ulTodo')
    const newUldone = document.createElement('ul')
    newUldone.setAttribute('id','ulDone')
    const newUllate = document.createElement('ul')
    newUllate.setAttribute('id','ulLate')

    tasksTodo.appendChild(newUltodo)
    tasksDone.appendChild(newUldone)
    tasksLate.appendChild(newUllate)
}

function editTask() {
    liList.queryS
}