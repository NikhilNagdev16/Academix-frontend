import React, { useState, useEffect } from 'react';
import {getCookie} from "./cookieUtil";

const DropdownTeacherWithFetch = ({ onSelect }) => {
    const [options, setOptions] = useState([]);
    const [selectedId, setSelectedId] = useState('');

    // Fetch the options when the component mounts
    useEffect(() => {
        const fetchOptions = async () => {
            try {
                // Replace with your API endpoint
                const response = await fetch(`http://localhost:8080/getTeacher?collegeId=${getCookie('collegeId')}`);
                const data = await response.json();
                setOptions(data);
                console.log(options,data);// Assuming data is an array of objects with 'id' and 'name'
            } catch (error) {
                console.error('Error fetching options:', error);
            }
        };

        fetchOptions();
    }, []);

    const handleChange = (event) => {
        const selectedId = event.target.value;
        setSelectedId(selectedId);
        onSelect(selectedId); // Pass the selected ID to the parent component
    };

    return (
        <select value={selectedId} onChange={handleChange}>
            <option value="" disabled>Select a Teacher </option>
            {options.map((option) => (
                <option key={option.user_id} value={option.user_id}>
                    {option.name}
                </option>
            ))}
        </select>
    );
};

export default DropdownTeacherWithFetch;