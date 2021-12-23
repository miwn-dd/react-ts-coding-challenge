import React, {useEffect, useRef, useState} from 'react';
import Form from './components/form';
import FilterButton from './components/filter-button';
import Todo from './components/todo';
import {usePrevious} from './helpers/use-previous';
import {filterModeNames, FilterModes} from './helpers/filter-modes';
import {Task} from './helpers/task';

function App(props: {
    initialTasks: Task[]
}) {
    const [tasks, setTasks] = useState<Task[]>(props.initialTasks);
    const [filter, setFilter] = useState<keyof typeof FilterModes>('All');

    function toggleTaskCompleted(id: string) {
        const updatedTasks = tasks.map(task => {
            // if this task has the same ID as the edited task
            if (id === task.id) {
                // use object spread to make a new object
                // whose `completed` prop has been inverted
                return {...task, completed: !task.completed};
            }
            return task;
        });
        setTasks(updatedTasks);
    }

    function deleteTask(id: string) {
        const remainingTasks = tasks.filter(task => id !== task.id);
        setTasks(remainingTasks);
    }

    function editTask(id: string, newName: string) {
        const editedTaskList = tasks.map(task => {
            // if this task has the same ID as the edited task
            if (id === task.id) {
                //
                return {...task, name: newName};
            }
            return task;
        });
        setTasks(editedTaskList);
    }

    const taskList = tasks
        .filter(FilterModes[filter])
        .map(task => (
            <Todo
                id={task.id}
                name={task.name}
                completed={task.completed}
                key={task.id}
                toggleTaskCompleted={toggleTaskCompleted}
                deleteTask={deleteTask}
                editTask={editTask}
            />
        ));

    const filterList = filterModeNames.map(name => (
        <FilterButton
            key={name}
            name={name}
            isPressed={name === filter}
            setFilter={setFilter}
        />
    ));

    function addTask(name: string) {
        const newTask = {id: 'todo-' + tasks.length, name: name, completed: false};
        setTasks([...tasks, newTask]);
    }

    const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
    const headingText = `${taskList.length} ${tasksNoun} remaining`;

    const formInputRef = useRef<HTMLInputElement>(null);
    const prevTaskLength = usePrevious(tasks.length);

    useEffect(() => {
        if (prevTaskLength
            && formInputRef.current
            && tasks.length - prevTaskLength === -1) {

            formInputRef.current.focus();
        }
    }, [tasks.length, prevTaskLength]);

    return (
        <div className="todoapp stack-large">
            <Form addTask={addTask} ref={formInputRef}/>
            <div className="filters btn-group stack-exception">
                {filterList}
            </div>
            <h2 id="list-heading" tabIndex={-1}>
                {headingText}
            </h2>
            <ul
                className="todo-list stack-large stack-exception"
                aria-labelledby="list-heading"
            >
                {taskList}
            </ul>
        </div>
    );
}

export default App;
