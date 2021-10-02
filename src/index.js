import './style.css';
import { addListeners, getStatusTasks } from './statusTasks.js';
import addDrag from './dragDrop.js';
import { addTask, deleteCompleted, editBtns } from './crud.js';
import utilPopulate from './utils/utilPopulate.js';

require('bootstrap-icons/font/bootstrap-icons.css');

export default function populateTask(arr) {
  getStatusTasks(utilPopulate(arr));
}

function callFunctions() {
  populateTask(addTask());
  addListeners();
  editBtns();
  addDrag();
}

function addNewTask() {
  callFunctions();
  document.querySelector('#input-task').value = '';
}

callFunctions();

const addButton = document.querySelector('#add-button');
const clearButton = document.querySelector('#clear-button');

addButton.addEventListener('click', () => {
  addNewTask();
});

document.querySelector('#input-task').addEventListener('keyup', (e) => {
  if (e.keyCode === 13 && document.querySelector('#input-task').value !== '') {
    addNewTask();
  }
});

clearButton.addEventListener('click', () => {
  deleteCompleted();
});
