//Selectors

const body = document.querySelector('body');
const todoWrapper = document.querySelector(".todo-wrapper");
const todoContainer = document.querySelector(".todo-container");
const inputTodo = document.querySelector("#todo-input");
const buttonAddTodo = document.querySelector(".add-button");
const listTodo = document.querySelector(".todo-list");
const warningFilter = document.querySelector("#filter-warning")
const warningInputTodo = document.querySelector("#input-warning");
const optionFilterTodos = document.querySelector(".filter-todos");
const darkModeButton = document.querySelector(".dark-toggle");
const lightModeButton = document.querySelector(".light-toggle");
const toggleThemeButton = document.querySelector("#toggle-theme-button");
const voiceCommandButton = document.querySelector("#voice-command-button");


//Event Listeners
document.addEventListener("DOMContentLoaded", getTodosFromLocalStorage); //saves the content when page refreshed/reload
toggleThemeButton.addEventListener("click", darkOrLight);
buttonAddTodo.addEventListener("click", addToTodoList); //checks if the addTodo button was clicked
inputTodo.addEventListener("keydown", addToTodoList); //checks if the event was triggered by either the button click or the Enter key press and proceeds with adding the todo accordingly
listTodo.addEventListener("click", deleteOrCheckTodo);
optionFilterTodos.addEventListener("click", filterTodos);
voiceCommandButton.addEventListener("click", startSpeechRecognition);

window.onload = function() {
  const ionIcons = document.querySelectorAll("ion-icon");
}

//Functions
//Add to List
function addToTodoList(e) {
  // Check if the event was triggered by the "Add Todo" button or the Enter key
  if (e.type === "click" || (e.type === "keydown" && e.key === "Enter")) {
    e.preventDefault(); //stops the event from acting in it's default setting

    let todoText = "";
    if (e.results && e.results[0]) {
      todoText = e.results[0][0].transcript.trim(); //.trim() removes any whitespace
    }else {
      todoText = inputTodo.value.trim();
    }
    
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
    saveTodoLocally(newTodo.innerText);
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

// Toggle between Dark and Light Mode
function darkOrLight(e) {
  e.preventDefault();
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
    listTodo.classList.add("dark-mode");
    listTodo.classList.remove("light-mode");
    darkModeButton.style.display = "none";
    lightModeButton.style.display = "block";
  } else {
    toggleThemeButton.classList.remove("dark-mode");
    toggleThemeButton.classList.add("light-mode");
    warningFilter.classList.add("light-mode");
    warningFilter.classList.remove("dark-mode");
    warningInputTodo.classList.add("light-mode");
    warningInputTodo.classList.remove("dark-mode");
    body.classList.remove("dark-mode");
    body.classList.add("light-mode");
    listTodo.classList.remove("dark-mode");
    listTodo.classList.add("light-mode");
    todoContainer.classList.remove("dark-mode");
    darkModeButton.style.display = "block";
    lightModeButton.style.display = "none";
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

function saveTodoLocally(todo) {
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
  saveTodoLocally(todos);
  localStorage.clear();
};

// Function to start speech recognition

function startSpeechRecognition(e) {
  e.preventDefault(); //tells the computer not to do its normal thing when you click a button, but instead to listen to your voice
  const recognition = new window.webkitSpeechRecognition(); //creates a new "recognition" object that helps the computer understand what you're saying
  recognition.continuous = false; //tells the computer to stop listening after you finish talking, so it doesn't keep listening forever
  recognition.lang = "en-US"; //tells the computer to listen to English words, so it can understand what you're saying
  recognition.interimResults = false; //tells the computer to only show you the final result, not any "interim" results that might be incorrect
  recognition.maxAlternatives = 1; //tells the computer to only give you one option for what you said, so it doesn't get confused if you say multiple things at once

  recognition.onresult = function (e) {
    let transcript = "";
    for (let i = 0; i < e.results.length; i++) {
      transcript += e.results[i][0].transcript.trim() + " ";
    }
    inputTodo.value = transcript;
    deleteOrCheckTodo(e);
    addToTodoList(e);
    console.log("object");
  };
  /*
    This function takes the results from detected speech and loops through each of them, concatenating the recognized speech text into a single string called "transcript". It then sets the value of the "inputTodo" element to the "transcript" string
    After setting the input value, the function calls two other functions: "deleteOrCheckTodo" and "addToTodoList"
  */

  recognition.onerror = function (e) {
    recognition.stop(); // stops the speech process if there's error
    console.error("Speech recognition error:", e.error);
  };

  /*
    If there is an error with the speech recognition software, the function defined in "recognition.onerror" will be executed and an error message will be logged to the console
  */

  recognition.start(); //starts the speech recognition process
}

