import { changeStatus } from '../statusTasks.js';

jest.mock('../localStorage');

class Task {
  constructor(ind = 0, des = '') {
    this.index = ind;
    this.description = des;
    this.completed = false;
  }
}

const task1 = new Task(1, 'task1');
const task2 = new Task(2, 'task2', true);

describe('Change Status', () => {
  test('Happy Path Change Status', () => {
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
    expect(changeStatus(check.checked)).toEqual([task1, task2]);
  });
});