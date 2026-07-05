// Select DOM elements
const input = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
const taskList = document.getElementById('taskList');

// Try to save local todos in local storage
const saved = localStorage.getItem('todos');
const todos = saved ? JSON.parse(saved) : [];

function saveTasks() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Create a DOM node for a task object and append it to the list
function createTaskNode(task, index) {
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = !!task.completed;

    const textSpan = document.createElement('span');
    textSpan.textContent = task.text;
    textSpan.style.margin = '0 8px';
    if (task.completed) {
        textSpan.style.textDecoration = 'line-through';
    }

    checkbox.addEventListener('change', () => {
        task.completed = checkbox.checked;
        textSpan.style.textDecoration = task.completed ? 'line-through' : 'none';
        saveTasks();
    });

    textSpan.addEventListener('dblclick', () => {
        const newText = prompt('Edit task:', task.text);
        if (newText !== null) {
            const trimmed = newText.trim();
            if (trimmed) {
                task.text = trimmed;
                textSpan.textContent = task.text;
                saveTasks();
            }
        }
    });

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.addEventListener('click', () => {
        todos.splice(index, 1);
        saveTasks();
        renderTasks();
    });

    li.appendChild(checkbox);
    li.appendChild(textSpan);
    li.appendChild(delBtn);
    return li;
}

// Function to render the tasks in the list
function renderTasks() {
    taskList.innerHTML = '';
    todos.forEach((task, index) => {
        const taskNode = createTaskNode(task, index);
        taskList.appendChild(taskNode);
    });
}

function addTask() {
    const taskText = input.value.trim();
    if (!taskText) {
        alert('Please enter a task.');
        return;
    }
    todos.push({ text: taskText, completed: false });
    input.value = '';
    saveTasks();
    renderTasks();
}

addButton.addEventListener('click', addTask);
input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addTask();
    }
});

renderTasks();
