import React, {RefObject} from 'react';

interface ViewTodoProps {
    completed: boolean,
    deleteTask: (id: string) => void,
    editButtonRef?: RefObject<HTMLButtonElement>,
    id: string,
    name: string
    setEditing: (isEditing: boolean) => void,
    toggleTaskCompleted: (id: string) => void,
}

export function ViewTodo(
    {
        completed,
        deleteTask,
        editButtonRef,
        id,
        name,
        setEditing,
        toggleTaskCompleted,
    }: ViewTodoProps
) {
    return (
        <div className="stack-small">
            <div className="c-cb">
                <input
                    id={id}
                    type="checkbox"
                    defaultChecked={completed}
                    onChange={() => toggleTaskCompleted(id)}
                />
                <label className="todo-label" htmlFor={id}>
                    {name}
                </label>
            </div>
            <div className="btn-group">
                <button
                    type="button"
                    className="btn"
                    onClick={() => setEditing(true)}
                    ref={editButtonRef}
                >
                    Edit <span className="visually-hidden">{name}</span>
                </button>
                <button
                    type="button"
                    className="btn btn__danger"
                    onClick={() => deleteTask(id)}
                >
                    Delete <span className="visually-hidden">{name}</span>
                </button>
            </div>
        </div>
    );
}
