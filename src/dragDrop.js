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
  const taskElements = document.querySelectorAll('.tasks');
  const taskContainer = document.querySelector('#list');

  taskElements.forEach((taskElement) => {
    taskElement.setAttribute('draggable', true);
    taskElement.style.cursor = 'move';

    taskElement.addEventListener('dragstart', () => {
      taskElement.classList.add = 'dragging';
    });

    taskElement.addEventListener('dragend', () => {
      taskElement.classList.remove = 'dragging';
    });
  });

  taskContainer.addEventListener('dragover', (event) => {
    event.preventDefault();
    const dragging = document.querySelectorAll('.dragging');
    const afterElement = getDragAfterElement(event.cientY);
    if (afterElement == null) {
      taskContainer.appendChild(dragging);
    } else {
      taskContainer.insertBefore(dragging, afterElement);
    }
  });
}
