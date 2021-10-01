import localStorage from './localStorage.js';

let arrTasks = [];

export function saveStatus() {
  window.localStorage.setItem('tasks', JSON.stringify(arrTasks));
}

export function getStatusTasks(newTasks) {
  arrTasks = newTasks;
  saveStatus();
}

function changeStyle(check) {
  if (check.checked) {
    check.parentElement.querySelector('.edit-task').style.color = '#bdbbbbda';
    check.parentElement.style.textDecoration = 'line-through';
  } else {
    check.parentElement.querySelector('.edit-task').style.color = '#4d4d4d';
    check.parentElement.style.textDecoration = 'none';
  }
}

export function changeStatus(check, index) {
  const arrTasks = localStorage();
  if (check.checked) {
    arrTasks[index - 1].completed = true;
  } else {
    arrTasks[index - 1].completed = false;
  }
  return arrTasks;
}

function changeSaveStatus(check) {
  changeStyle(check);
  arrTasks = changeStatus(check, check.id);
  saveStatus();
}

function checkStatus() {
  if (JSON.parse(window.localStorage.getItem('tasks'))) {
    arrTasks = JSON.parse(window.localStorage.getItem('tasks'));
    arrTasks.forEach((task) => {
      const check = document.getElementById(task.index);
      check.checked = task.completed;
      changeSaveStatus(check);
    });
  } else {
    saveStatus();
  }
}

export function addListeners() {
  const checks = document.querySelectorAll('.checks');

  checks.forEach((check) => {
    check.addEventListener('change', () => changeSaveStatus(check));
    checkStatus();
  });
}
