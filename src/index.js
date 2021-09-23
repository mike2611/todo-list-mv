import './style.css';
import { addListeners, getTasks } from './statusTasks.js';

import crud from './crud.js';

require('bootstrap-icons/font/bootstrap-icons.css');

function populateTask(arr) {
  const orderArray = [];
  const ul = document.getElementById('list');
  ul.innerHTML = '';

  for (let i = 1; i < arr.length + 1; i += 1) {
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
      <input type="checkbox" class="checks" id="${task.index - 1}" value="${task.index - 1}">
      ${task.description}
    </div> 
    <i class="bi bi-three-dots-vertical"></i>`;
    li.classList.add('tasks', 'd-flex-between');
    ul.appendChild(li);
  });
  getTasks(orderArray);
}

const addButton = document.querySelector('#add-button');

populateTask(crud());

addButton.addEventListener('click', () => {
  populateTask(crud());
  addListeners();
});
