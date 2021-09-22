import './style.css';

require('bootstrap-icons/font/bootstrap-icons.css');

class Task {
  constructor(ind = 0, des = '', comp = false) {
    this.index = ind;
    this.description = des;
    this.completed = comp;
  }
}

const task1 = new Task(0, 'Task 1');
const task2 = new Task(1, 'Task 2');
const task3 = new Task(2, 'Task 3');

const tasks = [task1, task2, task3];
const ul = document.getElementById('list');

function populateTask(arr) {
  arr.forEach((task) => {
    const li = document.createElement('li');
    li.innerHTML = `${task.description} <i class="bi bi-three-dots-vertical"></i>`;
    li.classList.add('tasks', 'd-flex-between');
    ul.appendChild(li);
  });
}

populateTask(tasks);
