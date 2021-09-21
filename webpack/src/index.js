import './style.css';

class Task {
  constructor(ind = 0, des = '', comp = false) {
    this.index = ind;
    this.description = des;
    this.completed = comp;
  }
}

const task1 = new Task(0, 'task 1');
const task2 = new Task(1, 'task 2');
const task3 = new Task(2, 'task 3');

const tasks = [task1, task2, task3];
const ul = document.getElementById('list');

function populateTask(arr) {
  arr.forEach((task) => {
    const li = document.createElement('li');
    li.innerHTML = `${task.description}`;
    ul.appendChild(li);
  });
}

populateTask(tasks);
