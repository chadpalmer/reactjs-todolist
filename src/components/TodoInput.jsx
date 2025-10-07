import React from 'react'

export default function TodoInput(props) {
    const {handleAddTodos, todoValue, setTodoValue, error, setError} = props

    const errorId = 'todo-empty-error'

    function onChange(e) {
        const val = e.target.value
        setTodoValue(val)
        // Clear error as soon as the user types non-whitespace
        if (error && val.trim()) {
            setError('')
        }
    }

    function onSubmit() {
        handleAddTodos(todoValue)
        // Only clear the input if successfully added
        if (todoValue.trim()) {
            setTodoValue('')
        }
    }

    function onKeyDown(e) {
        if (e.key === 'Enter') {
            onSubmit()
        }
    }

    return (
        <header>
            { /* Visually rendered only when error has text */ }
            {error && (
                <p id={errorId} className="empty-input show" role="alert" aria-live="polite">{error}</p>
            )}
            <input
                value={todoValue}
                onChange={onChange}
                onKeyDown={onKeyDown}
                placeholder="Enter todo..."
                aria-invalid={!!error}
                aria-describedby={error ? errorId : undefined}
            />
            <button onClick={onSubmit} >
                Add
            </button>
        </header>
    )
}
