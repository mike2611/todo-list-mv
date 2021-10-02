import { getStatusTasks } from './statusTasks.js';
import localStorage from './localStorage.js';
import utilDelete from './utils/utilDelete.js';
import utilEdit from './utils/utilEdit.js';
import utilDeleteCompleted from './utils/utilDeleteCompleted.js';

class Task {
  constructor(ind = 0, des = '') {
    this.index = ind;
    this.description = des;
    this.completed = false;
  }
}

export function addTask() {
  const arrTasks = localStorage();
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

export function deleteTask() {
  const deleteBtns = document.querySelectorAll('.delete-button');
  deleteBtns.forEach((btn) => {
    btn.addEventListener('mousedown', (event) => {
      event.preventDefault();
    });
    btn.addEventListener('click', () => {
      updateIds(utilDelete(btn));
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

  inputTasks.forEach((input) => {
    input.addEventListener('blur', () => {
      getStatusTasks(utilEdit(inputTask, editingTask));
      changeIcon();
    });
    inputTask.addEventListener('keyup', (e) => {
      if (e.keyCode === 13 && inputTask.value !== '') {
        getStatusTasks(utilEdit(inputTask, editingTask));
        changeIcon();
      }
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
  updateIds(utilDeleteCompleted());
}
