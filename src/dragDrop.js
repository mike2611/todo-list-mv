import './style.css';

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
