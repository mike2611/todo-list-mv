import { getStatusTasks } from './statusTasks.js';

class Task {
  constructor(ind = 0, des = '') {
    this.index = ind;
    this.description = des;
    this.completed = false;
  }
}

export function getArrayLocal() {
  let arrTasks = [];
  if (JSON.parse(window.localStorage.getItem('tasks'))) {
    arrTasks = JSON.parse(window.localStorage.getItem('tasks'));
  }
  return arrTasks;
}

export function addTask() {
  const arrTasks = getArrayLocal();
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
      const arrTasks = getArrayLocal();
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

function editingInput() {
  const editingTask = document.querySelector('.editing');
  const inputEdit = editingTask.querySelector('.edit-task');
  inputEdit.disabled = false;
  const index = editingTask.querySelector('.checks').id - 1;

  const arrTasks = getArrayLocal();
  if (inputEdit.value !== undefined && inputEdit.value !== '') {
    arrTasks[index].description = inputEdit.value;
  }
  editingTask.classList.remove('editing');
  inputEdit.disabled = true;
  getStatusTasks(arrTasks);
  changeIcon();
}

function editTask() {
  const inputTasks = document.querySelectorAll('.edit-task');
  const editingTask = document.querySelector('.editing');
  const inputEdit = editingTask.querySelector('.edit-task');
  inputEdit.disabled = false;

  inputTasks.forEach((input) => {
    input.addEventListener('blur', () => {
      editingInput();
    });
    input.addEventListener('keyup', (e) => {
      if (e.keyCode === 13 && inputEdit.value !== '') {
        editingInput();
      }
    });
    inputEdit.focus();
    inputEdit.setSelectionRange(inputEdit.value.length, inputEdit.value.length);
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
  const arrTasks = getArrayLocal();
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
