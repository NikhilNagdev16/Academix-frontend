import React, { useState, useEffect } from 'react';

const DropdownSubjectusingTeacherWithFetch = ({ onSelect, courseId }) => {
    const [options, setOptions] = useState([]);
    const [selectedId, setSelectedId] = useState('');

    useEffect(() => {
        const fetchOptions = async () => {
            if (courseId) {
                try {
                    const response = await fetch(`http://localhost:8080/subjectTeacher?TeacherId=${courseId}`);
                    const data = await response.json();
                    setOptions(data);
                    console.log('Fetched subjects:', data);
                } catch (error) {
                    console.error('Error fetching options:', error);
                }
            }
        };

        fetchOptions();
    }, []); // Depend on courseId to re-fetch when it changes

    const handleChange = (event) => {
        const selectedId = event.target.value;
        setSelectedId(selectedId);
        onSelect(selectedId);
    };

    return (
        <select value={selectedId} onChange={handleChange} disabled={!courseId}>
            <option value="" disabled>Select a subject</option>
            {options.length > 0 ? (
                options.map((option) => (
                    <option key={option.subject_id} value={option.subject_id}>
                        {option.subject_name}
                    </option>
                ))
            ) : (
                <option value="" disabled>No subjects available</option>
            )}
        </select>
    );
};

export default DropdownSubjectusingTeacherWithFetch;