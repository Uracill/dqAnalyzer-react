import React from 'react'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useState, useRef } from 'react'
import axios from 'axios';
export default function ExpandableScenarioNode({ paramName, data, expandable = true, expandFunction, expanded, level, setInputOpen, setRqas }) {

    const [value, setValue] = useState(data);
    const [isEditing, setIsEditing] = useState(data ? false : true);
    const inputRef = useRef();

    const spacingVariants = {
        0: "px-0",
        1: "px-2",
        2: "px-4",
        3: "px-6",
        4: "px-8",
        5: "px-10",
        6: "px-16",
        8: "px-32",

    }

    const handleClick = () => {
        expandFunction();
    }

    const handleChangeValue = (e) => {
        setValue(e.target.value)
    }

    const handleSave = (event) => {
        if (event.key === 'Enter') {
            // Perform the desired action when "Enter" is pressed
            console.log('Enter key was pressed');
            inputRef.current.blur(); // Unfocus the input field
            setIsEditing(false)
            axios.post(`https://64917f002f2c7ee6c2c85311.mockapi.io/api/v1/rqas/`, {
                name: value,
                context: "",
                environment: "",
                runtime_quality_analysis: {
                    artifacts: [],
                    settings: {
                        confidence: 0, environment: null, timeSlot: null
                    }
                }
            }).then((response => {
                setInputOpen(false);
                setRqas(prevState => [...prevState, response.data]);
            }));


        }
    }


    return (
        <>
            <div className={`flex items-center hover:bg-slate-500 hover:cursor-pointer w-50 ${spacingVariants[level]} py-2 `} onClick={handleClick}>
                {!expandable ? null : expanded ? <KeyboardArrowDownIcon fontSize="small" /> : <KeyboardArrowRightIcon fontSize='small' />}
                {level == 1 && isEditing ? <input ref={inputRef} type="text" autoFocus className="input input-bordered input-info w-full max-w-xs" onKeyDown={handleSave} onBlur={handleSave} onChange={handleChangeValue} value={value} /> : <span>{paramName && <b>{paramName}:</b>} {value}</span>}

            </div>

        </>
    )
}
