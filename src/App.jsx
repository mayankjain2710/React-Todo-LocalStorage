import React, { useEffect, useState } from "react"
import { TodoProvider } from "./todocontexts/Todocontext";
import TodoForm from "./components/todoform";
import TodoItem from "./components/todoitem";

function App() {
 
const [todos,settodos] = useState([]);

const addtodo = (todo)=>{
    settodos((prev) => [{id: Date.now(),...todo },...prev])
}
const updatetodo = (id,todo) =>{
   settodos((prev) => prev.map((prevtodo) =>{
    if(prevtodo.id === id){
        return todo
    }else{
        return prevtodo
    }
   }))
}

const deletetodo = (id)=>{
 settodos((prev) => prev.filter((eachprev) => eachprev.id !== id))
}

const toggleComplete = (id)=>{
    settodos((prev)=> prev.map((todo) => todo.id === id ? {...todo,completed: !todo.completed} : todo))
}   

useEffect(() => {
    const todosString = localStorage.getItem("todos");
let todos;

try {
    todos = todosString ? JSON.parse(todosString) : [];
} catch (e) {
    console.error("Failed to parse todos from localStorage:", e);
    todos = [];
}

console.log(todos);


    if (todos && todos.length > 0) {
      settodos(todos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }), [todos]


  return (
    <TodoProvider value={{todos,addtodo,deletetodo,updatetodo,toggleComplete}}>
     <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        <TodoForm/>
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {todos.map((todo) => (
                          <div key={todo.id}
                          className='w-full'
                          >
                            <TodoItem todo={todo} />
                          </div>
                        ))}
                    </div>
                </div>
            </div>
     </TodoProvider>       
  )
}

export default App
