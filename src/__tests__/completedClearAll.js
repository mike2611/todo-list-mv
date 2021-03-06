import { changeStatus } from '../statusTasks.js';
import utilDeleteCompleted from '../utils/utilDeleteCompleted.js';

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
const task1True = new Task(1, 'task1', true);
const task2True = new Task(2, 'task2', true);

describe('Change Status', () => {
  test('Happy Path Change Status 1', () => {
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

    const check = document.querySelector('.checks');
    check.checked = true;
    expect(changeStatus(check, check.id)).toEqual([task1, task2True, task3]);
  });
  test('Happy Path Change Status 2', () => {
    document.body.innerHTML = `<ul id="list">
      <li class="editing">
        <div class  = "d-flex-between">
        <input type="checkbox" class="checks" id="1" value="1">
        <input type="text" value="task1" class="edit-task" disabled>
        </div> 
        <button class="delete-button task-buttons d-none">
          <i class="bi bi-trash"></i>
        </button>
      </li>
    </ul>`;
    const check = document.querySelector('.checks');
    check.checked = true;

    expect(changeStatus(check, check.id)).toEqual([task1True, task2, task3]);
  });
});

describe('Clear Completed', () => {
  test('Happy Path Clear Delete LocalStorage', () => {
    expect(utilDeleteCompleted()).toEqual([task1, task2]);
  });
  test('Happy Path Clear Delete DOM', () => {
    document.body.innerHTML = `<ul id="list">
      <li class="editing">
        <div class  = "d-flex-between">
        <input type="checkbox" class="checks" id="3" value="3">
        <input type="text" value="task3" class="edit-task" disabled>
        </div> 
        <button class="delete-button task-buttons d-none">
          <i class="bi bi-trash"></i>
        </button>
      </li>
    </ul>`;
    const check = document.querySelector('.checks');
    check.checked = true;
    utilDeleteCompleted();
    const ul = document.querySelector('#list');
    expect(ul.childElementCount).toBe(0);
  });
});