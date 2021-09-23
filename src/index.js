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
      <input type="text" value="${task.description}" class="edit-task">
    </div> 
    <button class="edit-button">
      <i class="bi bi-three-dots-vertical"></i>
    </button>`;
    li.classList.add('tasks', 'd-flex-between');
    ul.appendChild(li);
  });
  getTasks(orderArray);
}

populateTask(crud());
addListeners();

const addButton = document.querySelector('#add-button');

addButton.addEventListener('click', () => {
  populateTask(crud());
  addListeners();
});

if (document.querySelectorAll('edit-button')) {
  const editButtons = document.querySelectorAll('.edit-button');

  editButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const editngTask = btn.parentNode;
      editngTask.classList.add('editing');
    });
  });
}
