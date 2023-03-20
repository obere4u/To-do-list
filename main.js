//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");


//Event Listeners
todoButton.addEventListener("click", addToList);

//Functions
//Add to List
function addToList(event) {
    event.preventDefault(); //stops the event from acting in it's default setting

    //Todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //Create a List item
    const newTodo = document.createElement("li");
    newTodo.innerText = "This is the first I'm going to do in the morning";
    newTodo.classList.add("todo-item");

}