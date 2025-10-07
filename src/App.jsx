import React from 'react'
import TodoInput from "./components/TodoInput.jsx";
import TodoList from "./components/TodoList.jsx";

function App() {
    const [todos, setTodos] = React.useState([])
    const [todoValue, setTodoValue] = React.useState('')

    function persistData(newList) {
        localStorage.setItem('todos', JSON.stringify({todos: newList}))
    }

    function handleAddTodos(newTodo) {
        if (newTodo.trim()) {
            const newTodoList = [...todos, newTodo]
            persistData(newTodoList)
            setTodos(newTodoList)
        }
    }

    function handleDeleteTodo(index) {
        const newTodoList = todos.filter((todo, todoIndex) => {
            return todoIndex !== index
        })
        persistData(newTodoList)
        setTodos(newTodoList)
    }

    function handleEditTodo(index) {
        const valueToBeEdited = todos[index]
        setTodoValue(valueToBeEdited)
        handleDeleteTodo(index)
    }

    React.useEffect(() => {
        if (!localStorage.getItem('todos')) {
            return
        }

        let localTodos = localStorage.getItem('todos')
        if (!localTodos) {
            return
        }

        localTodos = JSON.parse(localTodos).todos
        setTodos(localTodos)
    }, [])

    return (
    <>
        <TodoInput todoValue={todoValue} setTodoValue={setTodoValue} handleAddTodos={handleAddTodos}/>
        <TodoList handleDeleteTodo={handleDeleteTodo} handleEditTodo={handleEditTodo} todos={todos} />
    </>
  )
}

export default App
