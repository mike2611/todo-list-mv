import './style.css';
import { updateIds } from './crud.js';
import localStorage from './localStorage.js';

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.tasks:not(.dragging)')];

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset, element: child };
    }
    return closest;
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}

function start(element) {
  element.classList.add('dragging');
}

function end(element) {
  element.classList.remove('dragging');
  const arrTasks = localStorage();
  const orderArray = [];
  const checks = document.querySelectorAll('.checks');
  checks.forEach((check) => {
    for (let j = 0; j < arrTasks.length; j += 1) {
      if (parseInt(check.id, 10) === parseInt(arrTasks[j].index, 10)) {
        orderArray.push(arrTasks[j]);
      }
    }
  });
  updateIds(orderArray);
}

function over(event, container) {
  event.preventDefault();
  const y = event.clientY || event.touches[0].clientY;
  const afterElement = getDragAfterElement(container, y);
  const dragging = document.querySelector('.dragging');
  if (afterElement == null || afterElement === undefined) {
    container.appendChild(dragging);
  } else {
    container.insertBefore(dragging, afterElement);
  }
}

export default function addDrag() {
  const taskContainer = document.querySelector('#list');
  const taskElements = taskContainer.querySelectorAll('.tasks');

  taskElements.forEach((taskElement) => {
    taskElement.addEventListener('dragstart', () => {
      start(taskElement);
    });

    taskElement.addEventListener('dragend', () => {
      end(taskElement);
    });
  });

  taskContainer.addEventListener('dragover', (event) => {
    over(event, taskContainer);
  });
}
