import React from 'react';
import {FilterName} from '../helpers/filter-modes';

interface FilterButtonProps {
    isPressed: boolean,
    name: FilterName,
    setFilter: (name: FilterName) => void
}

function FilterButton(
    {
        isPressed,
        name,
        setFilter
    }: FilterButtonProps
) {
    return (
        <button
            type="button"
            className="btn toggle-btn"
            aria-pressed={isPressed}
            onClick={() => setFilter(name)}
        >
            <span className="visually-hidden">Show </span>
            <span>{name}</span>
            <span className="visually-hidden"> tasks</span>
        </button>
    );
}

export default FilterButton;
