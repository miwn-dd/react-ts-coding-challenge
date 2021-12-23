import {render} from '@testing-library/react';
import App from './app';
import userEvent from '@testing-library/user-event';
import {filterModeNames} from './helpers/filter-modes';

describe('App', () => {

    const initialTasks = [
        {id: 'todo-0', name: 'Eat', completed: true},
        {id: 'todo-1', name: 'Sleep', completed: false},
        {id: 'todo-2', name: 'Repeat', completed: false}
    ];

    test('can add a new task', () => {
        const {getByRole, getAllByRole} = render(<App initialTasks={initialTasks}/>);

        const inputField = getByRole('textbox');
        const addButton = getByRole('button', {name: 'Add'});

        const startingListItemsAmount = getAllByRole('listitem').length;

        userEvent.type(inputField, 'new task');
        userEvent.click(addButton);

        const expandedListItems = getAllByRole('listitem');
        expect(expandedListItems).toHaveLength(startingListItemsAmount + 1);
    });

    test('can remove a task', () => {
        const {getByRole, queryByText} = render(<App initialTasks={initialTasks}/>);

        const inputField = getByRole('textbox');
        const addButton = getByRole('button', {name: 'Add'});

        const taskToBeDeleted = 'new test task';

        userEvent.type(inputField, taskToBeDeleted);
        userEvent.click(addButton);

        const associatedDeleteButton = getByRole('button', {name: 'Delete ' + taskToBeDeleted});

        userEvent.click(associatedDeleteButton);

        expect(queryByText('new test task')).toBeFalsy();
    });

    test('sets focus to text input field when adding a task', () => {
        const {getByRole} = render(<App initialTasks={initialTasks}/>);

        const inputField = getByRole('textbox');
        const addButton = getByRole('button', {name: 'Add'});

        userEvent.type(inputField, 'test task');
        userEvent.click(addButton);

        const activeElement = document.activeElement;
        expect(activeElement === inputField).toBeTruthy();
    });

    test('sets focus to text input field when removing a task', () => {
        const {getByRole, getAllByRole} = render(<App initialTasks={initialTasks}/>);

        const inputField = getByRole('textbox');
        const removeButton = getAllByRole('button', {name: /Delete/}).pop();

        expect(removeButton).toBeTruthy();
        userEvent.click(removeButton!);

        const activeElement = document.activeElement;
        expect(activeElement === inputField).toBeTruthy();
    });

    test('has working filter options "All", "Active" "Completed', () => {
        const {getByRole, getAllByRole} = render(<App initialTasks={initialTasks}/>);

        const all = 'All'
        const active = 'Active'
        const completed = 'Completed'

        const showAllButton = getByRole('button', {name: new RegExp(all)})
        const showActiveButton = getByRole('button', {name: new RegExp(active)})
        const showCompletedButton = getByRole('button', {name: new RegExp(completed)})

        userEvent.click(showAllButton);
        const allTasksAmount = getAllByRole('listitem').length;

        userEvent.click(showActiveButton);
        const activeTasksAmount = getAllByRole('listitem').length;

        userEvent.click(showCompletedButton);
        const completedTasksAmount = getAllByRole('listitem').length;

        expect(allTasksAmount).toBe(3)
        expect(activeTasksAmount).toBe(2)
        expect(completedTasksAmount).toBe(1)
        expect([all, active, completed].sort()).toEqual(filterModeNames.sort())
    })
})

