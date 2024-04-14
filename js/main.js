import ToDoItem from "./todoitem.js";
import TodoList from "./todolist.js";

const todoList = new TodoList();

document.addEventListener("readystatechange", (event) => {
  if (event.target.readyState == "complete") {
    initApp();
  }
});

const initApp = () => {
  // * Add Listeners
  const form = document.getElementById("item-entry-form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    processSubmission();
  });

  const clear = document.getElementById("clear-items");
  clear.addEventListener("click", (event) => {
    if (todoList.getList().length) {
      const confirmed = confirm("Sure want to clear all?");
      if (confirmed) {
        todoList.clear();
        updateLocal(todoList.getList());
        refreshPage();
      }
    }
  });

  loadLocalData();
  refreshPage();
};

const loadLocalData = () => {
  const listString = localStorage.getItem("my-list");
  if (typeof listString !== "string") return;
  const parsedList = JSON.parse(listString);
  parsedList.forEach((item) => {
    todoList.add(item);
  });
};

const refreshPage = () => {
  clearContents();
  renderElements();
  clearEntryField();
  setFocusOnEntry();
};

const clearContents = () => {
  const parentElement = document.getElementById("list-items");
  deleteAll(parentElement);
};

const deleteAll = (parentElement) => {
  let child = parentElement.lastElementChild;
  while (child) {
    parentElement.removeChild(child);
    child = parentElement.lastElementChild;
  }
};

const renderElements = () => {
  const list = todoList.getList();
  list.forEach((item) => {
    buildListItem(item);
  });
};

const buildListItem = (item) => {
  const div = document.createElement("div");
  div.className = "item";
  const check = document.createElement("input");
  check.type = "checkbox";
  check.id = item.id;
  check.tabIndex = 0;

  addCheckboxListener(check);

  const label = document.createElement("label");
  label.htmlFor = item.id;
  label.textContent = item.item;
  div.appendChild(check);
  div.appendChild(label);
  const container = document.getElementById("list-items");
  container.appendChild(div);
};

const addCheckboxListener = (checkbox) => {
  checkbox.addEventListener("click", () => {
    todoList.remove(checkbox.id);
    updateLocal(todoList.getList());
    setTimeout(() => {
      refreshPage();
    }, 1000);
  });
};

const updateLocal = (listArray) => {
  localStorage.setItem("my-list", JSON.stringify(listArray));
};

const clearEntryField = () => {
  document.getElementById("new-item").value = "";
};

const setFocusOnEntry = () => {
  document.getElementById("new-item").focus();
};

const processSubmission = () => {
  const itemText = document.getElementById("new-item").value.trim();
  if (!itemText.length) return;
  const itemId = nextItemId();
  const item = new ToDoItem(itemId, itemText);
  todoList.add(item);
  updateLocal(todoList.getList());
  refreshPage();
};

const nextItemId = () => {
  let id = 1;
  const list = todoList.getList();
  if (list.length > 0) id = list[list.length - 1].id + 1;
  return id;
};
