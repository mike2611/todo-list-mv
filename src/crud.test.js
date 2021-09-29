import { addTask } from './crud.js';

jest.mock('./crud');

class Task {
  constructor(ind = 0, des = '') {
    this.index = ind;
    this.description = des;
    this.completed = false;
  }
}

test('Add new task', () => {
  document.body.innerHTML = '<div>'
  + '<input type="text" name="input-task" id="input-task" required maxlength="60">'
  + '</div>';
  document.querySelector('#input-task').value = 'task2';
  const task1 = new Task(1, 'task1');
  const task2 = new Task(2, 'task2');
  expect(addTask()).toEqual([task1, task2]);
});