export default class ToDoList {
  constructor() {
    this._list = [];
  }

  getList() {
    return this._list;
  }

  clear() {
    this._list = [];
  }

  add(item) {
    this._list.push(item);
  }

  remove(id) {
    const list = this._list;
    for (let i = 0; i < list.length; i++) {
      if (list[i].id == id) {
        list.splice(i, 1);
        break;
      }
    }
  }
}
