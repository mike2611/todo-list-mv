import { saveStatus, getTasks } from './statusTasks.js';

class Task {
  constructor(ind = 0, des = '') {
    this.index = ind;
    this.description = des;
    this.completed = false;
  }
}

function getArray() {
  let arrTasks = [];
  if (JSON.parse(window.localStorage.getItem('tasks'))) {
    arrTasks = JSON.parse(window.localStorage.getItem('tasks'));
  }
  return arrTasks;
}

export function addTask() {
  const arrTasks = getArray();
  const input = document.querySelector('#input-task');
  if (input.value) {
    const task = new Task(arrTasks.length + 1, input.value);
    arrTasks.push(task);
  }
  return arrTasks;
}

function deleteTask() {
}

function changeIcon() {
  const tasks = document.querySelectorAll('.tasks');
  tasks.forEach((task) => {
    const deleteBtn = task.querySelector('.delete-button');
    const editBtn = task.querySelector('.edit-button');
    deleteBtn.classList.add('d-none');
    editBtn.classList.remove('d-none');
  });
  if (document.querySelector('.editing')) {
    const editingTask = document.querySelector('.editing');
    const deleteBtn = editingTask.querySelector('.delete-button');
    const editBtn = editingTask.querySelector('.edit-button');
    deleteBtn.classList.remove('d-none');
    editBtn.classList.add('d-none');
  }
}

function editTask() {
  const inputTasks = document.querySelectorAll('.edit-task');
  const editingTask = document.querySelector('.editing');
  const inputTask = editingTask.querySelector('.edit-task');
  inputTask.disabled = false;
  const index = editingTask.querySelector('.checks').id;

  inputTasks.forEach((input) => {
    input.addEventListener('blur', () => {
      const arrTasks = JSON.parse(window.localStorage.getItem('tasks'));
      arrTasks[index].description = inputTask.value;
      editingTask.classList.remove('editing');
      inputTask.disabled = true;
      getTasks(arrTasks);
      saveStatus();
      changeIcon();
    });
    inputTask.focus();
    inputTask.setSelectionRange(inputTask.value.length, inputTask.value.length);
  });
}

export function editBtns() {
  if (document.querySelectorAll('edit-button')) {
    const editButtons = document.querySelectorAll('.edit-button');
    editButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const editingTask = btn.parentNode;
        editingTask.classList.add('editing');
        changeIcon();
        editTask();
      });
    });
  }
}
