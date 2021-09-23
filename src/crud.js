class Task {
  constructor(ind = 0, des = '') {
    this.index = ind;
    this.description = des;
    this.completed = false;
  }
}

let index = 0;

function getArray() {
  let arrTasks = [];
  if (JSON.parse(window.localStorage.getItem('tasks'))) {
    arrTasks = JSON.parse(window.localStorage.getItem('tasks'));
  }
  return arrTasks;
}

export default function addTask() {
  const arrTasks = getArray();
  const input = document.querySelector('#input-task');
  const task = new Task(index, input.value);
  arrTasks.push(task);
  index += 1;

  return arrTasks;
}
