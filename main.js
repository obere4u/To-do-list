//Selectors
const todoInput = document.querySelector("#todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
// const filterTodo = document.querySelector(".filter-todo");

//Event Listeners
todoButton.addEventListener("click", addToList);
todoList.addEventListener("click", deleteCheck);
todoList.addEventListener("click", completeCheck);

//Functions
//Add to List
function addToList(e) {
    e.preventDefault(); //stops the event from acting in it's default setting

    //Todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //Create a List (li) item
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //Add to local Storage
    saveLocalTodos(todoInput.value);


    //Check completed button
    const completeButton = document.createElement("button");
    completeButton.innerHTML = '<ion-icon name="checkmark-circle-sharp"></ion-icon>';
    completeButton.classList.add("complete-btn");
    todoDiv.appendChild(completeButton);


    //check trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<ion-icon name="trash-sharp"></ion-icon>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);


    //Append to List
    todoList.appendChild(todoDiv);
    
    todoInput.value = " ";
}

function deleteCheck(e) {
    const item = e.target; // e is same as event and it returns the specific object where the event occurs

    //Delete TodoItem
    if (item.classList[0] === "trash-btn") {
      const todo = item.parentElement;
      todo.remove();
      console.log(1);
    }
}

function completeCheck(e) {
    const item = e.target;

    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle('complete');
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes; //

    todos.forEach(function(todo) {
        switch(e.target.value) {
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
                break;
            default:
        };
    })
}

function saveLocalTodos(todo) {
    //check --- If I already have the data
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos')); // converts the todos to a JSON object
    }

    todos.push(todo); //adds the todo in the array
    localStorage.setItem("todos", JSON.stringify(todos));
}

