import React, {ChangeEvent, FormEvent, RefObject, useState} from 'react';

interface EditTodoProps {
    editFieldRef?: RefObject<HTMLInputElement>,
    editTask: (id: string, name: string) => void,
    id: string,
    name: string,
    setEditing: (isEditing: boolean) => void,
}

export function EditTodo(
    {
        id,
        name,
        editTask,
        setEditing,
        editFieldRef,
    }: EditTodoProps) {

    const [newName, setNewName] = useState('');

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setNewName(e.target.value);
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (!newName.trim()) {
            return;
        }
        editTask(id, newName);
        setNewName('');
        setEditing(false);
    }

    return (
        <form className="stack-small" onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="todo-label" htmlFor={id}>
                    New name for {name}
                </label>
                <input
                    id={id}
                    className="todo-text"
                    type="text"
                    value={newName || name}
                    onChange={handleChange}
                    ref={editFieldRef}
                />
            </div>
            <div className="btn-group">
                <button
                    type="button"
                    className="btn todo-cancel"
                    onClick={() => setEditing(false)}
                >
                    Cancel
                    <span className="visually-hidden">renaming {name}</span>
                </button>
                <button type="submit" className="btn btn__primary todo-edit">
                    Save
                    <span className="visually-hidden">new name for {name}</span>
                </button>
            </div>
        </form>
    );
}