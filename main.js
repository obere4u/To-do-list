//Selectors
const body = document.querySelector("body");
const inputTodo = document.querySelector("#todo-input");
const buttonAddTodo = document.querySelector(".todo-button");
const listTodo = document.querySelector(".todo-list");
const warningFilter = document.querySelector("#filter-warning")
const warningInputTodo = document.querySelector("#input-warning");
const optionFilterTodos = document.querySelector(".filter-todos");
const toggleThemeButton = document.querySelector("#toggle-theme-button");

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodosFromLocalStorage); //saves the content when page refreshed/reload
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
  
  //Add to local Storage
  saveTodosLocally(inputTodo.value);
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

// //Add darkOrLight mode on dynamically created elements
// // Get all of the dynamically created elements
// const todos = document.querySelectorAll(".todo-list");
// // Loop through each todo
// todos.forEach((todo) => {
// // Check if the body has the dark-mode class
// if (document.body.classList.contains("dark-mode")) {
//   // Apply the dark mode styles to the todo
//   todo.classList.add("dark-mode");
// } else {
//   // Remove the dark mode styles from the todo
//   todo.classList.remove("dark-mode");
// }
// console.log(todos)
// });
    

// Toggle between Dark and Light Mode
function darkOrLight(e) {
  const todoContainer = document.querySelector(".todo-container");

  const newTodo = document.createElement("li");
  newTodo.innerText = inputTodo.value;
  newTodo.classList.add("list-item");
  
  if (e.target.classList.contains("dark-toggle")) {
    toggleThemeButton.classList.remove("light-mode");
    toggleThemeButton.classList.add("dark-mode");
    body.classList.remove("light-mode");
    body.classList.add("dark-mode");
    todoContainer.classList.add("dark-mode");
    console.log("dark mode applied to todo-container");
  } else {
    toggleThemeButton.classList.remove("dark-mode");
    toggleThemeButton.classList.add("light-mode");
    body.classList.remove("dark-mode");
    body.classList.add("light-mode");
    todoContainer.classList.remove("dark-mode");
    console.log("light mode applied to todo-container");
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
