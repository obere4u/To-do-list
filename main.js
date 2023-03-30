//Selectors
const body = document.querySelector("body");
const todoContainer = document.querySelector(".todo-container");
const inputTodo = document.querySelector("#todo-input");
const buttonAddTodo = document.querySelector(".add-button");
const listTodo = document.querySelector(".todo-list");
const warningFilter = document.querySelector("#filter-warning")
const warningInputTodo = document.querySelector("#input-warning");
const optionFilterTodos = document.querySelector(".filter-todos");
const toggleThemeButton = document.querySelector("#toggle-theme-button");
const voiceCommandButton = document.querySelector("#voice-command-button");


//Event Listeners
document.addEventListener("DOMContentLoaded", getTodosFromLocalStorage); //saves the content when page refreshed/reload
toggleThemeButton.addEventListener("click", darkOrLight);
buttonAddTodo.addEventListener("click", addTodoList); //checks if the addTodo button was clicked
inputTodo.addEventListener("keydown", addTodoList); //checks if the event was triggered by either the button click or the Enter key press and proceeds with adding the todo accordingly
listTodo.addEventListener("click", deleteOrCheckTodo);
optionFilterTodos.addEventListener("click", filterTodos);
voiceCommandButton.addEventListener("click", startSpeechRecognition);

//Functions
//Add to List
function addTodoList(e) {
  // Check if the event was triggered by the "Add Todo" button or the Enter key
  if (e.type === "click" || (e.type === "keydown" && e.key === "Enter")) {
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

    inputTodo.value = ""; //clears the inputTodo space
    //Add to local Storage
    saveTodosLocally(newTodo.innerText);
  }
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

// Set the default theme to the previously selected theme (if any), or to light mode
const theme = localStorage.getItem("theme") || "light-mode";
if (theme === "dark-mode") {
  toggleThemeButton.classList.add("dark-mode");
  body.classList.add("dark-mode");
  todoContainer.classList.add("dark-mode");
  warningFilter.classList.add("dark-mode");
  warningInputTodo.classList.add("dark-mode");
} else {
  toggleThemeButton.classList.add("light-mode");
  body.classList.add("light-mode");
  todoContainer.classList.remove("dark-mode");
  warningFilter.classList.remove("dark-mode");
  warningInputTodo.classList.remove("dark-mode");
}

// Toggle between Dark and Light Mode
function darkOrLight(e) {
  if (e.target.classList.contains("dark-toggle")) {
    toggleThemeButton.classList.remove("light-mode");
    toggleThemeButton.classList.add("dark-mode");
    warningFilter.classList.remove("light-mode");
    warningFilter.classList.add("dark-mode");
    warningInputTodo.classList.remove("light-mode");
    warningInputTodo.classList.add("dark-mode");
    body.classList.remove("light-mode");
    body.classList.add("dark-mode");
    todoContainer.classList.add("dark-mode");
    localStorage.setItem("theme", "dark-mode"); // save the current theme mode in local storage
  } else {
    toggleThemeButton.classList.remove("dark-mode");
    toggleThemeButton.classList.add("light-mode");
    warningFilter.classList.add("light-mode");
    warningFilter.classList.remove("dark-mode");
    warningInputTodo.classList.add("light-mode");
    warningInputTodo.classList.remove("dark-mode");
    body.classList.remove("dark-mode");
    body.classList.add("light-mode");
    todoContainer.classList.remove("dark-mode");
    localStorage.setItem("theme", "light-mode"); // save the current theme mode in local storage
  }
  
  const newTodo = document.createElement("li");
  newTodo.innerText = inputTodo.value;
  newTodo.classList.add("list-item");
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

  });
  //Add to local Storage
  saveTodosLocally(todos);
};

// Function to start speech recognition
function startSpeechRecognition() {
  const recognition = new window.webkitSpeechRecognition();
  recognition.lang = "en-US";

  recognition.onresult = deleteOrCheckTodo;
  recognition.start();
}

function startSpeechRecognition(e) {
  e.preventDefault();
  const recognition = new window.webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  recognition.onresult = deleteOrCheckTodo;
  recognition.start();

  recognition.onresult = function (e) {
    const transcript = e.results[0][0].transcript.trim();
    inputTodo.value = transcript;
    deleteOrCheckTodo(e);
    addToTodoList(e);
    console.log("first");
  };

  recognition.onerror = function (e) {
    console.error("Speech recognition error:", e.error);
  };
}

