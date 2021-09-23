import './style.css';

function getDragAfterElement(mouseY) {
  const arrElements = [...document.querySelectorAll('.tasks:not(.dragging)')];
  return arrElements.reduce((over, taskElement) => {
    const box = taskElement.getBoundingClientRect();
    const offset = mouseY - (box.top - box.bottom / 2);
    if (offset < 0 && offset > over.offset) {
      return { offset: offset, element: taskElement };
    }
    return over;
  }, { offset: Number.NEFATIVE_INFINITY }).element;
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
    });
  });

  taskContainer.addEventListener('dragover', (event) => {
    const dragging = taskContainer.querySelector('.dragging');
    const afterElement = getDragAfterElement(event.cientY);
    event.preventDefault();
    if (afterElement == null) {
      taskContainer.appendChild(dragging);
    } else {
      taskContainer.insertBefore(dragging, afterElement);
    }
  });
}
