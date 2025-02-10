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

// Function menambahkan Task
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
        editTask(liList, newTaskList)
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
    liList.appendChild(br)
    liList.appendChild(dateSpan)
    liList.appendChild(prioritySpan)
    liList.appendChild(divButton)

    // Masukkan semua yang ada pada li list ke dalam element ul todo
    ulTodo.appendChild(liList)

    // Memasukkan ke dalam tasks late
    const currentDate = new Date().toISOString().split("T")[0];

    if ( inputDate.value < currentDate) {
        ulLate.appendChild(liList)
        checkbox.style.display = 'none'
        textSpan.style.color = 'red'
    }
 
    // Delete semua teks di kotak input
    inputContainer.reset()

    // Membuat value dari tanggal menjadi default hari ini
    dateLoad()
}

// Function menghapus semua tasks
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

// Function edit task
function editTask (liElement, task) {
    liElement.querySelectorAll('div').forEach((div) => {
        div.style.display = 'none'
    });    
    liElement.querySelectorAll('span').forEach((span) => {
        span.style.display = 'none'
    });    
    
    const editContainer = document.createElement('div')
    editContainer.style.display = 'flex'
    editContainer.style.flexDirection = 'column'
    editContainer.style.gap = '5px'

    const editInput = document.createElement('div')
    editInput.style.display = 'flex'
    editInput.style.gap = '5px'

    const editText = document.createElement('input')
    editText.type = 'text'
    editText.value = task.text

    const editPriority = document.createElement('select')
    const priorityOptions = ['High Priority', 'Medium Priority', 'Low Priority']
    priorityOptions.forEach((Option) =>{
        const optionElement = document.createElement('option')
        optionElement.value = Option
        optionElement.textContent = Option
        if (Option === task.priority) {
            optionElement.selected = true
        }
        editPriority.appendChild(optionElement)
    })

    const editDate = document.createElement('input')
    editDate.type = 'date'
    editDate.value = task.date
    editDate.style.fontSize = '1.2em'

    const buttonContainer = document.createElement('div')
    buttonContainer.style.display = 'flex'
    buttonContainer.style.justifyContent = 'flex-end'
    buttonContainer.style.width = '100%'
    buttonContainer.style.gap = '5px'


    const saveButton = document.createElement('button')
    saveButton.type = 'submit'
    saveButton.textContent = 'Save'
    saveButton.className = 'addButton'
    saveButton.style.fontSize = '0.9em'
    saveButton.style.height = '1.8em'

    const cancelButton = document.createElement('button')
    cancelButton.type = 'button'
    cancelButton.textContent = 'Cancel'
    cancelButton.className = 'resetButton'
    cancelButton.style.fontSize = '0.9em'
    cancelButton.style.height = '1.8em'

    editInput.appendChild(editText)
    editInput.appendChild(editPriority)
    editInput.appendChild(editDate)

    buttonContainer.appendChild(saveButton)
    buttonContainer.appendChild(cancelButton)
    
    editContainer.appendChild(editInput)
    editContainer.appendChild(buttonContainer)

    liElement.appendChild(editContainer)

    // Save Button
    saveButton.addEventListener('click', () => {
        const updateTask = {
            text: editText.value,
            priority: editPriority.value,
            date: editDate.value,
            done: false
        }

        renderTask(updateTask)
        liElement.remove()
    })

    // Close Button
    cancelButton.addEventListener(('click'), () => {
        editContainer.remove()

        liElement.querySelectorAll('div').forEach((div) => {
            div.style.display = 'flex'
        });    
        liElement.querySelectorAll('span').forEach((span) => {
            span.style.display = 'inline'
        });    
    })
}