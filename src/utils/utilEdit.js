import localStorage from '../localStorage.js';

export default function utilEdit(inputTask, editingTask) {
  const arrTasks = localStorage();
  const index = editingTask.querySelector('.checks').id - 1;
  if (inputTask.value !== undefined) {
    arrTasks[index].description = inputTask.value;
  }
  editingTask.classList.remove('editing');
  inputTask.disabled = true;
  return arrTasks;
}
