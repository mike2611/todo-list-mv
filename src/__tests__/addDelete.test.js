import { addTask } from '../crud.js';
import utilDelete from '../utils/utilDelete.js';
import utilPopulate from '../utils/utilPopulate.js';

jest.mock('../localStorage');

class Task {
  constructor(ind = 0, des = '', com = false) {
    this.index = ind;
    this.description = des;
    this.completed = com;
  }
}

const task1 = new Task(1, 'task1');
const task2 = new Task(2, 'task2');
const task3 = new Task(3, 'task3', true);
const task4 = new Task(4, 'task4');

describe('Testing add', () => {
  test('Add new task, Should return three task', () => {
    document.body.innerHTML = `<div>
      <input type="text" name="input-task" id="input-task" required maxlength="60">
    </div>`;
    document.querySelector('#input-task').value = 'task4';
    expect(addTask()).toEqual([task1, task2, task3, task4]);
  });
  test('Add new task, Length should be three', () => {
    document.body.innerHTML = `<div>
      <input type="text" name="input-task" id="input-task" required maxlength="60">
    </div>`;
    document.querySelector('#input-task').value = 'task4';
    expect(addTask().length).toBe(4);
  });
});

describe('Testing delete', () => {
  test('Delete task , Should return one task', () => {
    document.body.innerHTML = `<ul id="list">
      <li class="editing">
        <div class  = "d-flex-between">
        <input type="checkbox" class="checks" id="2" value="2">
        <input type="text" value="task2" class="edit-task" disabled>
        </div> 
        <button class="delete-button task-buttons d-none">
          <i class="bi bi-trash"></i>
        </button>
      </li>
    </ul>`;
    const deleteBtn = document.querySelector('.delete-button');
    expect(utilDelete(deleteBtn)).toEqual([task1, task3]);
  });
  test('Delete task , Length should be one', () => {
    document.body.innerHTML = `<ul id="list">
      <li class="editing">
        <div class  = "d-flex-between">
        <input type="checkbox" class="checks" id="2" value="2">
        <input type="text" value="task2" class="edit-task" disabled>
        </div> 
        <button class="delete-button task-buttons d-none">
          <i class="bi bi-trash"></i>
        </button>
      </li>
    </ul>`;
    const deleteBtn = document.querySelector('.delete-button');
    expect(utilDelete(deleteBtn).length).toBe(2);
  });
});

describe('Dom Add task', () => {
  test('Add three li', () => {
    const newTasks = [task1, task2, task3];
    document.body.innerHTML = '<ul id="list"></ul>';
    utilPopulate(newTasks);
    const ul = document.querySelector('#list');
    expect(ul.childElementCount).toBe(3);
  });
  test('Get tag name LI', () => {
    const newTasks = [task1, task2, task3];
    document.body.innerHTML = '<ul id="list"></ul>';
    utilPopulate(newTasks);
    const ul = document.querySelector('#list');
    expect(ul.firstChild.tagName).toBe('LI');
  });
});
