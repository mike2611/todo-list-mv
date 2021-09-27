import './style.css';
import { addListeners, getStatusTasks } from './statusTasks.js';
import addDrag from './dragDrop.js';

import { addTask, deleteCompleted, editBtns } from './crud.js';

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
      <input type="checkbox" class="checks" id="${task.index}" value="${task.index}">
      <input type="text" value="${task.description}" class="edit-task" disabled>
    </div> 
    <button class="edit-button task-buttons">
      <i class="bi bi-three-dots-vertical icon-btn"></i>
    </button>
    <button class="delete-button task-buttons d-none">
      <i class="bi bi-trash"></i>
    </button>`;
    li.classList.add('tasks', 'd-flex-between');
    li.setAttribute('draggable', true);
    ul.appendChild(li);
  });
  getStatusTasks(orderArray);
}

populateTask(addTask());
addListeners();
editBtns();
addDrag();

const addButton = document.querySelector('#add-button');
const clearButton = document.querySelector('#clear-button');

addButton.addEventListener('click', () => {
  populateTask(addTask());
  addListeners();
  editBtns();
  addDrag();
  document.querySelector('#input-task').value = '';
});

clearButton.addEventListener('click', () => {
  deleteCompleted();
});
