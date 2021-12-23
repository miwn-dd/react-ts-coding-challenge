import React, {ChangeEvent, FormEvent, ForwardedRef, forwardRef, useState} from 'react';

interface FormProps {
    addTask: (name: string) => void
}

const Form = forwardRef((
    {
        addTask
    }: FormProps,
    ref?: ForwardedRef<HTMLInputElement>
) => {
    const [descriptor, setDescriptor] = useState('');

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (!descriptor.trim()) {
            return;
        }
        addTask(descriptor);
        setDescriptor('');
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setDescriptor(e.target.value);
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="label-wrapper">
                <label htmlFor="new-todo-input" className="label__lg">
                    What needs to be done?
                </label>
            </h2>

            <input
                type="text"
                id="new-todo-input"
                className="input input__lg"
                name="text"
                autoComplete="off"
                value={descriptor}
                onChange={handleChange}
                ref={ref}
            />
            <button type="submit" className="btn btn__primary btn__lg">
                Add
            </button>
        </form>
    );
});

export default Form;
