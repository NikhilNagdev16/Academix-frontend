import React, { useState, useEffect } from 'react';
import { getCookie } from './cookieUtil';

const DropdownCourseWithFetch = ({ onSelect }) => {
    const [options, setOptions] = useState([]);
    const [selectedId, setSelectedId] = useState('');

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const collegeId = getCookie('collegeId');
                const response = await fetch(`http://localhost:8080/course?collegeId=${collegeId}`);
                const data = await response.json();
                setOptions(data); // Assuming data is an array of objects with 'course_id' and 'course_name'
                console.log('Fetched courses:', data);
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
            <option value="" disabled>Select a course</option>
            {options.map((option) => (
                <option key={option.course_id} value={option.course_id}>
                    {option.course_name}
                </option>
            ))}
        </select>
    );
};

export default DropdownCourseWithFetch;