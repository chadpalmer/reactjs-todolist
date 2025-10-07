import React from 'react'
import TodoInput from "./components/TodoInput.jsx";
import TodoList from "./components/TodoList.jsx";

function App() {
    const [todos, setTodos] = React.useState([])
    const [todoValue, setTodoValue] = React.useState('')
    const [error, setError] = React.useState('')

    function persistData(newList) {
        localStorage.setItem('todos', JSON.stringify({todos: newList}))
    }

    function handleAddTodos(newTodo) {
        const trimmed = newTodo.trim()

        if (trimmed) {
            const newTodoList = [...todos, trimmed]
            persistData(newTodoList)
            setTodos(newTodoList)
            setError('')
        } else {
            setError('New ToDo item can not be empty.')
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
        setError('')
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
        <TodoInput
            todoValue={todoValue}
            setTodoValue={setTodoValue}
            handleAddTodos={handleAddTodos}
            error={error}
            setError={setError}
        />
        <TodoList handleDeleteTodo={handleDeleteTodo} handleEditTodo={handleEditTodo} todos={todos} />
    </>
  )
}

export default App
