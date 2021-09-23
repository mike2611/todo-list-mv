let arrTasks = [];

export function getStatusTasks(newTasks) {
  arrTasks = newTasks;
}

function saveStatus() {
  window.localStorage.setItem('tasks', JSON.stringify(arrTasks));
}

function changeStatus(check) {
  if (check.checked) {
    check.parentElement.style.color = '#bdbbbb';
    check.parentElement.style.textDecoration = 'line-through';
    arrTasks[check.id].completed = true;
  } else {
    check.parentElement.style.color = '#4d4d4d';
    check.parentElement.style.textDecoration = 'none';
    arrTasks[check.id].completed = false;
  }
  saveStatus();
}

function checkStatus() {
  if (JSON.parse(window.localStorage.getItem('tasks'))) {
    arrTasks = JSON.parse(window.localStorage.getItem('tasks'));
    arrTasks.forEach((task) => {
      const check = document.getElementById(task.index);
      check.checked = task.completed;
      changeStatus(check);
    });
  }
}

export function addListeners() {
  const checks = document.querySelectorAll('.checks');

  checks.forEach((check) => {
    check.addEventListener('change', () => changeStatus(check));
    checkStatus();
  });
}
