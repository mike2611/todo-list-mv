import { getStatusTasks } from './statusTasks.js';

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

export function updateIds(arrTasks) {
  let idTask = 1;
  let idChecks = 1;
  const checks = document.querySelectorAll('.checks');

  arrTasks.forEach((task) => {
    task.index = idTask;
    idTask += 1;
  });
  getStatusTasks(arrTasks);
  checks.forEach((check) => {
    check.id = idChecks;
    idChecks += 1;
  });
}

function deleteTask() {
  const deleteBtns = document.querySelectorAll('.delete-button');
  deleteBtns.forEach((btn) => {
    btn.addEventListener('mousedown', (event) => {
      event.preventDefault();
    });
    btn.addEventListener('click', () => {
      const ul = document.getElementById('list');
      const deletedTask = document.querySelector('.editing');
      const index = btn.parentNode.querySelector('.checks').id - 1;
      const arrTasks = JSON.parse(window.localStorage.getItem('tasks'));
      ul.removeChild(deletedTask);
      arrTasks.splice(index, 1);
      updateIds(arrTasks);
    });
  });
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
  const index = editingTask.querySelector('.checks').id - 1;

  inputTasks.forEach((input) => {
    input.addEventListener('blur', () => {
      const arrTasks = JSON.parse(window.localStorage.getItem('tasks'));
      if (inputTask.value !== undefined) {
        arrTasks[index].description = inputTask.value;
      }
      editingTask.classList.remove('editing');
      inputTask.disabled = true;
      getStatusTasks(arrTasks);
      changeIcon();
    });
    inputTask.focus();
    inputTask.setSelectionRange(inputTask.value.length, inputTask.value.length);
  });
}

export function editBtns() {
  deleteTask();
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

export function deleteCompleted() {
  let arrTasks = [];
  if (JSON.parse(window.localStorage.getItem('tasks'))) {
    arrTasks = JSON.parse(window.localStorage.getItem('tasks'));
  }
  const incompleteTasks = arrTasks.filter((task) => !task.completed);
  updateIds(incompleteTasks);

  const ul = document.getElementById('list');
  const checks = document.querySelectorAll('.checks');
  checks.forEach((check) => {
    if (check.checked) {
      ul.removeChild(check.parentNode.parentNode);
    }
  });
}
