import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';

const initialTasks = [
    {id: 'todo-0', name: 'Eat', completed: true},
    {id: 'todo-1', name: 'Sleep', completed: false},
    {id: 'todo-2', name: 'Repeat', completed: false}
];

ReactDOM.render(
    <React.StrictMode>
        <App initialTasks={initialTasks}/>
    </React.StrictMode>,
    document.getElementById('root')
);
