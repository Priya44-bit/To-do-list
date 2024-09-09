let tasks = [];

const addTask = () => {
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim();

    if (text) {
        tasks.push({ text: text, completed: false });
        taskInput.value = ''; 
        updateTaskList();
    }
};

const updateTaskList = () => {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'taskItem';
        listItem.innerHTML = `
            <div class="task ${task.completed ? 'completed' : ''}">
                <input type="checkbox" class="checkbox" ${task.completed ? 'checked' : ''}>
                <p>${task.text}</p>
            </div>
            <div class="icons">
                <button class="edit-btn" data-index="${index}">✏️</button>
                <button class="delete-btn" data-index="${index}">🗑️</button>
            </div>
        `;
        taskList.appendChild(listItem);
    });

    
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    document.getElementById('numbers').textContent = `${completedTasks} / ${totalTasks}`;
    document.getElementById('progress').style.width = `${(completedTasks / totalTasks) * 100}%`;
};

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTaskList();
    animateTask(index);
};

const animateTask = (index) => {
    const taskItems = document.querySelectorAll('.taskItem');
    const taskItem = taskItems[index];
    if (taskItem && tasks[index].completed) {
        taskItem.classList.add('boom');
        setTimeout(() => {
            taskItem.classList.remove('boom');
        }, 1000); 
    }
};

const editTask = (index) => {
    const newText = prompt('Edit your task:', tasks[index].text);
    if (newText !== null) {
        tasks[index].text = newText.trim();
        updateTaskList();
    }
};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTaskList();
};

document.getElementById('newTask').addEventListener('click', (e) => {
    e.preventDefault();
    addTask();
});

document.getElementById('task-list').addEventListener('change', (e) => {
    if (e.target.classList.contains('checkbox')) {
        const index = e.target.closest('.taskItem').querySelector('.edit-btn').dataset.index;
        toggleTaskComplete(index);
    }
});

document.getElementById('task-list').addEventListener('click', (e) => {
    if (e.target.classList.contains('edit-btn')) {
        const index = e.target.dataset.index;
        editTask(index);
    } else if (e.target.classList.contains('delete-btn')) {
        const index = e.target.dataset.index;
        deleteTask(index);
    }
});
