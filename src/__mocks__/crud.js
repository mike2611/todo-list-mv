class Task {
  constructor(ind = 0, des = '') {
    this.index = ind;
    this.description = des;
    this.completed = false;
  }
}

function getArrayLocal() {
  const task1 = new Task(1, 'task1');
  const arrayTask = [task1];
  return arrayTask;
}

function addTask() {
  const arrTasks = getArrayLocal();
  const input = document.querySelector('#input-task');
  if (input.value) {
    const task = new Task(arrTasks.length + 1, input.value);
    arrTasks.push(task);
  }
  return arrTasks;
}

exports.addTask = addTask;