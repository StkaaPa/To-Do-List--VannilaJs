//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOprtion = document.querySelector(".filter-todo");

//Event listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOprtion.addEventListener("click", filterTodo);

//Functions

function addTodo(event) {
  //prevent form from submitting - ao carregar no botão não faz com que a página refresh
  event.preventDefault();

  //create a Todo DIV
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  //create LI
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  //add todo to local storage
  saveLocalTodos(todoInput.value);

  //create the complete button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  //create the delete button
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
  deleteButton.classList.add("delete-btn");
  todoDiv.appendChild(deleteButton);

  //append to List
  todoList.appendChild(todoDiv);

  //clear todo-input value - eliminar o texto inserido no input de adicionar
  todoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;

  //delete todo
  if (item.classList[0] === "delete-btn") {
    const todo = item.parentElement;
    //animation to delete
    todo.classList.add("fall");
    removeLocalTodos(todo);
    //este código vai esperar que a animação seja concluída e depois executa a função para remover
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  //check mark complete
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (
      e.target.value //value here its equal to all, or completed or uncompleted
    ) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

//save the todos in a local Storage
function saveLocalTodos(todo) {
  //first-  verificar se já tem alguma coisa na local storage
  let todos;
  //se não tiver nada no local storage, vai ser criado um array vazio
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  //fazer save do que queremos colocar na local storage
  localStorage.setItem("todos", JSON.stringify(todos));
}

//esta função serve para quando der refresh ao site, os items da lista nao desaparecerem
function getTodos() {
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    //create a Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //create the complete button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //create the delete button
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add("delete-btn");
    todoDiv.appendChild(deleteButton);

    //append to List
    todoList.appendChild(todoDiv);
  });
}

//função para remover os itmens da local storage
function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  //determinar a posição do elemento que queremos eliminar (todos.indexOf(todoIndex))
  //o 2º argumento (1) indica quantos elementos queremos eliminar, neste caso 1
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
