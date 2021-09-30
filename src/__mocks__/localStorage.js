class Task {
  constructor(ind = 0, des = '') {
    this.index = ind;
    this.description = des;
    this.completed = false;
  }
}

export default function localStorage() {
  const task1 = new Task(1, 'task1');
  const task2 = new Task(2, 'task2');
  const arrayTask = [task1, task2];
  return arrayTask;
}

exports.localStorage = localStorage;