import {Task} from './task';

export const FilterModes = {
    All: () => true,
    Active: (task: Task) => !task.completed,
    Completed: (task: Task) => task.completed
};
export type FilterName = keyof typeof FilterModes;

export const filterModeNames = Object.keys(FilterModes) as FilterName[];