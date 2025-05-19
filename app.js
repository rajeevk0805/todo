const input = document.querySelector(".input");
const addBtn = document.querySelector(".addBtn");
const updateBtn = document.querySelector(".updateBtn");
const todoContainer = document.querySelector(".todo-container");

let inputValue;
let id;
let todoList = [];
const ultag = document.createElement("ul");
ultag.classList.add("ultag");
todoContainer.appendChild(ultag);

addBtn.addEventListener("click", () => {
  todo();
  saveToLocal();
});

function todo() {
  inputValue = input.value;

  if (inputValue !== "") {
    if (todoList.includes(inputValue)) {
      alert("Task already added");
      input.value = "";
    } else {
      todoList.unshift(inputValue);
      input.value = "";
      createTodo();
    }
  } else {
    alert("please add some task before clicking on add button");
  }
}

function createTodo() {
  ultag.innerHTML = "";
  todoList.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerText = item;
    li.classList.add("litag");
    ultag.appendChild(li);

    const btncontainer = document.createElement("div");
    btncontainer.classList.add("btncontainer");
    li.appendChild(btncontainer);

    // Delete Btn
    const delBtn = document.createElement("button");
    delBtn.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
    delBtn.classList.add("delBtn");

    btncontainer.appendChild(delBtn);
    delBtn.addEventListener("click", () => {
      delTodo(item);
      input.value = "";
      saveToLocal();
    });

    // edit
    const editBtn = document.createElement("button");
    editBtn.innerHTML = `<i class="fa-solid fa-pencil"></i>`;
    editBtn.classList.add("editBtn");
    btncontainer.appendChild(editBtn);
    editBtn.addEventListener("click", () => {
      input.value = item;
      addBtn.disabled = true;
      updateBtn.disabled = false;
      id = index;
    });
  });
}

function delTodo(item) {
  todoList = todoList.filter((value) => value !== item);
  createTodo();
}

updateBtn.addEventListener("click", () => {
  todoList[id] = input.value;
  createTodo();
  input.value = "";
  saveToLocal();
});

function saveToLocal() {
  localStorage.setItem("todos", JSON.stringify(todoList));
}

document.addEventListener("DOMContentLoaded", () => {
  todoList = JSON.parse(localStorage.getItem("todos"));
  if (todoList) {
    todoList.forEach((item, index) => {
      createTodo();
    });
  } else {
    todoList = [];
  }
});
