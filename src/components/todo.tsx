import React, {useEffect, useRef, useState} from 'react';
import {usePrevious} from '../helpers/use-previous';
import {ViewTodo} from './view-todo';
import {EditTodo} from './edit-todo';

interface ToDoProps {
    completed: boolean,
    id: string,
    name: string,
    editTask: (id: string, name: string) => void,
    deleteTask: (id: string) => void,
    toggleTaskCompleted: (id: string) => void
}

export default function Todo(
    {
        completed,
        id,
        name,
        editTask,
        deleteTask,
        toggleTaskCompleted,
    }: ToDoProps
) {
    const [isEditing, setEditing] = useState(false);

    const editFieldRef = useRef<HTMLInputElement>(null);
    const editButtonRef = useRef<HTMLButtonElement>(null);

    const wasEditing = usePrevious(isEditing);

    useEffect(() => {
        if (!wasEditing && isEditing && editFieldRef.current) {
            editFieldRef.current.focus();
        }
        if (wasEditing && !isEditing && editButtonRef.current) {
            editButtonRef.current.focus();
        }
    }, [wasEditing, isEditing]);

    return (
        <li className="todo">
            {
                isEditing
                    ? <EditTodo
                        id={id} name={name} editTask={editTask} setEditing={setEditing} editFieldRef={editFieldRef}/>
                    : <ViewTodo
                        id={id} completed={completed} toggleTaskCompleted={toggleTaskCompleted} deleteTask={deleteTask}
                        setEditing={setEditing} name={name} editButtonRef={editButtonRef}/>
            }
        </li>
    );
}
