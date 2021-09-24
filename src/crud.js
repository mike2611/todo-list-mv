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

function changeIcon() {
  const tasks = document.querySelectorAll('.tasks');
  tasks.forEach((task) => {
    task.querySelector('.icon-btn').classList.remove('bi-trash');
    task.querySelector('.icon-btn').classList.add('bi-three-dots-vertical');
  });
  if (document.querySelector('.editing')) {
    const edditingTask = document.querySelector('.editing');
    const icon = edditingTask.querySelector('.icon-btn');
    icon.classList.add('bi-trash');
  }
}

function editTask() {
  const inputTasks = document.querySelectorAll('.edit-task');
  const task = document.querySelector('.editing');
  const inputTask = task.querySelector('.edit-task');
  inputTask.disabled = false;
  const index = task.querySelector('.checks').id;

  inputTasks.forEach((input) => {
    input.addEventListener('blur', () => {
      console.log("entro");
      const arrTasks = JSON.parse(window.localStorage.getItem('tasks'));
      arrTasks[index].description = inputTask.value;
      task.classList.remove('editing');
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
