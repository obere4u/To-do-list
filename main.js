//Selectors
const inputTodo = document.querySelector("#todo-input");
const buttonAddTodo = document.querySelector(".todo-button");
const listTodo = document.querySelector(".todo-list");
const warningFilter = document.querySelector("#filter-warning")
const warningInputTodo = document.querySelector("#warning");
const optionFilterTodos = document.querySelector(".filter-todos");
// const lightToggleMode = document.querySelector("#light-toggle");
// const darkToggleMode = document.querySelector("#dark-toggle");
const toggleThemeButton = document.querySelector("#toggle-theme-button");

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodosFromLocalStorage); //saves the content when page refreshed/reload
// lightToggleMode.addEventListener("click", lightToggleMode);
// darkToggleMode.addEventListener("click", darkToggleMode);
toggleThemeButton.addEventListener("click", darkOrLight);
buttonAddTodo.addEventListener("click", addToTodoList);
listTodo.addEventListener("click", deleteOrCheckTodo);
optionFilterTodos.addEventListener("click", filterTodos);

//Functions
//Add to List
function addToTodoList(e) {
  e.preventDefault(); //stops the event from acting in it's default setting

  const todoText = inputTodo.value.trim();
  if (todoText === "") {
    warningInputTodo.style.display = "block";
    return;
  } else {
    warningInputTodo.style.display = "none";
  }

  //Todo div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  //Create a List (li) item
  const newTodo = document.createElement("li");
  newTodo.innerText = inputTodo.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  //Add to local Storage
  saveTodosLocally(inputTodo.value);

  //Check completed button
  const completeButton = document.createElement("button");
  completeButton.innerHTML =
    '<ion-icon name="checkmark-circle-sharp"></ion-icon>';
  completeButton.classList.add("complete-btn");
  todoDiv.appendChild(completeButton);

  //check trash button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<ion-icon name="trash-sharp"></ion-icon>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  //Append to List
  listTodo.appendChild(todoDiv);

  inputTodo.value = " "; //clears the inputTodo space
}

function deleteOrCheckTodo(e) {
  const item = e.target; // e is same as event and it returns the specific object where the event occurs

  //Delete TodoItem
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    todo.remove();
  }

  //check Todo
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("complete");
  }
}

// Toggle between Dark and Light Mode
function darkOrLight(e) {
  const body = document.querySelector("body");
  if (e.target.classList.contains('dark-toggle')) {
    toggleThemeButton.classList.remove('light');
    toggleThemeButton.classList.add('dark');
    body.classList.remove('light-mode');
    body.classList.add('dark-mode');

    //Add darkOrLight mode on dynamically created elements
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    todoDiv.classList.remove("light-mode");
    todoDiv.classList.add("dark-mode");

    const newTodo = document.createElement("li");
    newTodo.innerText = inputTodo.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    newTodo.classList.remove("light-mode");
    newTodo.classList.add("dark-mode");

  } else {
    toggleThemeButton.classList.remove('dark');
    toggleThemeButton.classList.add('light');
    body.classList.remove('dark-mode');
    body.classList.add('light-mode');
  }
}

function filterTodos() {
  
  const todos = Array.from(listTodo.children); //
  
  //checks if there are todos to filter
  if (!todos || todos.length <= 0) {
    warningFilter.style.display = "block";
    return
  } else {
    warningFilter.style.display = "none";
  }

  //loops through for each todo
  todos.forEach((todo) => {

  //hides todo by default
  todo.style.display = "none";

  //show todos based on selected filter
  switch(optionFilterTodos.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("complete")) {
            todo.style.display = "flex";
        } else {
            todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("complete")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      default:
        console.warn(`Invalid filter option: ${optionFilterTodos.value}`);
    };
  })
}

function saveTodosLocally(todo) {
  //Check if the data exist in the local storage

  let todos;

  if (localStorage.getItem("todos") === null) {
      todos = [];
  } else {
      todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodosFromLocalStorage() {
  //check --- If I already have the data

  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos")); // converts the todos to a JSON object
  }

  todos.forEach(function(todo) {
    //Todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //Create a List (li) item
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //Check completed button
    const completeButton = document.createElement("button");
    completeButton.innerHTML =
      '<ion-icon name="checkmark-circle-sharp"></ion-icon>';
    completeButton.classList.add("complete-btn");
    todoDiv.appendChild(completeButton);

    //check trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<ion-icon name="trash-sharp"></ion-icon>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //Append to List
    listTodo.appendChild(todoDiv);

    //Add to local Storage
    saveTodosLocally(todo);
    localStorage.clear(todo);
  });
};
