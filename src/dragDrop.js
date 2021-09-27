import './style.css';
import { updateIds } from './crud.js';

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

export default function addDrag() {
  const taskContainer = document.querySelector('#list');
  const taskElements = taskContainer.querySelectorAll('.tasks');

  taskElements.forEach((taskElement) => {
    taskElement.addEventListener('dragstart', () => {
      taskElement.classList.add('dragging');
    });

    taskElement.addEventListener('dragend', () => {
      taskElement.classList.remove('dragging');
      const arrTasks = JSON.parse(window.localStorage.getItem('tasks'));
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
    });
  });

  taskContainer.addEventListener('dragover', (event) => {
    event.preventDefault();
    const afterElement = getDragAfterElement(taskContainer, event.clientY);
    const dragging = document.querySelector('.dragging');
    if (afterElement == null || afterElement === undefined) {
      taskContainer.appendChild(dragging);
    } else {
      taskContainer.insertBefore(dragging, afterElement);
    }
  });
}
