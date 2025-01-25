import React, {useId} from 'react'

function Select({
    options,
    label,
    className,
    ...props  
}, ref) {
    const id = useId();
    return (
        <div className='w-full'>
            {label && <label htmlFor='id'></label>}
            <select
            id={id}
            ref={ref}
            {...props}
            >
                {options?.map((option) => (
                    <option key={option} value={option} >{option}</option>
                ))}
            </select>
        </div>
    )
}

export default React.forwardRef(Select)
