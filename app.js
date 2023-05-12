const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

function loadEventListeners() {
  // DOM Load Event
  document.addEventListener('DOMContentLoaded', () => {
    let tasks;

    if (localStorage.getItem('tasks') === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach((task) => {
      const li = document.createElement('li');
      li.className = 'collection-item';
      li.appendChild(document.createTextNode(task));

      const link = document.createElement('a');
      link.className = 'delete-item secondary-content';
      link.innerHTML = '<i class="fa fa-remove"></i>';
      li.appendChild(link);

      taskList.appendChild(li);
    });
  });

  // Create Tasks
  form.addEventListener('submit', (e) => {
    if (taskInput.value === '') {
      alert('You must add a task!');
      return;
    }

    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(taskInput.value));

    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';

    li.appendChild(link);

    taskList.appendChild(li);

    // Store in LocalStorage
    storeTask(taskInput.value);

    taskInput.value = '';

    e.preventDefault();
  });

  // Store Tasks

  const storeTask = (task) => {
    let tasks;

    if (localStorage.getItem('tasks') === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  // Remove Tasks
  taskList.addEventListener('click', (e) => {
    if (e.target.parentElement.classList.contains('delete-item')) {
      if (confirm('Are You Sure?')) {
        e.target.parentElement.parentElement.remove();

        // Remove from LocalStorage
        removeTask(e.target.parentElement.parentElement);
      }
    }
  });

  // Remove tasks function
  const removeTask = (taskItem) => {
    let tasks;

    if (localStorage.getItem('tasks') === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach((task, index) => {
      if (taskItem.textContent === task) {
        tasks.splice(index, 1);
      }

      localStorage.setItem('tasks', JSON.stringify(tasks));
    });
  };

  // Clear Tasks
  clearBtn.addEventListener('click', (e) => {
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }

    // Clear tasks from LocalStorage
    clearTasks();

    e.preventDefault();
  });

  // Clear Tasks from LS
  const clearTasks = () => {
    localStorage.clear();
  };

  // Filter Tasks
  filter.addEventListener('keyup', (e) => {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach((task) => {
      const item = task.firstChild.textContent;

      if (item.toLowerCase().indexOf(text) != -1) {
        task.style.display = 'block';
      } else {
        task.style.display = 'none';
      }
    });
  });
}

loadEventListeners();
