import './style.css';
import { addListeners, getTasks } from './statusTasks.js';

require('bootstrap-icons/font/bootstrap-icons.css');

const tasks = [];
const ul = document.getElementById('list');

function populateTask(arr) {
  const orderArray = [];

  for (let i = 0; i < arr.length; i += 1) {
    for (let j = 0; j < arr.length; j += 1) {
      if (i === arr[j].index) {
        orderArray.push(arr[j]);
      }
    }
  }
  orderArray.forEach((task) => {
    const li = document.createElement('li');
    li.innerHTML = ` 
    <div class  = "d-flex-between">
      <input type="checkbox" class="checks" id="${task.index}" value="${task.index}">
      ${task.description}
    </div> 
    <i class="bi bi-three-dots-vertical"></i>`;
    li.classList.add('tasks', 'd-flex-between');
    ul.appendChild(li);
  });
  getTasks(orderArray);
}

populateTask(tasks);
addListeners();
