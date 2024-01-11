const container=document.querySelector(".container");
const todoForm=document.querySelector(".todo-form");
const todoInput=document.querySelector("#inputToDo");
const btn=document.querySelector(".btn");
const todoLists=document.getElementById("lists")
const todoCreated=document.querySelector(".todoCreated")

const showMessage=(text,status)=>{
    todoCreated.textContent=text;
    todoCreated.classList.add(`bg-${status}`);
    setTimeout(() => {
        todoCreated.textContent="";
        todoCreated.classList.remove(`bg-${status}`)
        
    },1000);
}
const createToDo=(todoValue,todoId) =>{
    const todoElement=document.createElement("li");//creating just list
    todoElement.id=todoId;//giving that list an id
    todoElement.classList.add("li-style")
    todoElement.innerHTML=`
    <span class="span-left"> ${todoValue}</span>
    <span><button class="btn1" ><i class="fas fa-times"></i></button>

    <button class="btn2" id="deleteBtn"><i class="fa fa-trash"></i></button></span>
    `;
    todoLists.appendChild(todoElement);
    //adding listener to trash button
    const deleteButton=todoElement.querySelector("#deleteBtn");
    deleteButton.addEventListener("click",deleteTodo);

    //adding listerner to cross button
    const crossButton = todoElement.querySelector(".btn1");
    crossButton.addEventListener("click", () => {
        todoElement.classList.toggle("completed"); // Toggle a class for strikethrough effect
        console.log("toggle added");
    });

}

//deleteTodo
const deleteTodo=(event)=>{
    const selectedTodo=event.target.parentElement.parentElement.parentElement;
    
    todoLists.removeChild(selectedTodo);
    showMessage("To-Do deleted","delete");

    //deleing to do from local storage
    const todoId = selectedTodo.id;
    let todos = localStorage.getItem("mytodos") ? JSON.parse(localStorage.getItem("mytodos")) : [];

    todos = todos.filter(todo => todo.todoId !== todoId);

    
    localStorage.setItem("mytodos", JSON.stringify(todos));

}



// adding listener
todoForm.addEventListener("submit",(event)=>{
    event.preventDefault()
    //getting the text from input
    const todoValue=todoInput.value
    //creating an unique id for each todo
    const todoId=Date.now().toString()
    //this function will create a new to do
    createToDo(todoValue,todoId);
    showMessage("To-Do Created","success");


    const todos = localStorage.getItem("mytodos") ? JSON.parse(localStorage.getItem("mytodos")) : [];
    todos.push({ todoId, todoValue });
    localStorage.setItem("mytodos", JSON.stringify(todos));
    todoInput.value = "";
  
})
loadTodos=()=>{
    const todos=localStorage.getItem("mytodos") ? JSON.parse(localStorage.getItem("mytodos")) : [];
    todos.map((x)=>createToDo(x.id,x.value));
}
window.addEventListener("DOMContentLoaded",loadTodos);
