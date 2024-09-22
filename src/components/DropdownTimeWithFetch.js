import React, { useState, useEffect } from 'react';

const DropdownTimeWithFetch = ({ subjectid, day, onSelect }) => {
    const [options, setOptions] = useState([]);
    const [selectedId, setSelectedId] = useState('');

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const response = await fetch(`http://localhost:8080/scheduleForAttendance?subjectId=${subjectid}&day=${day}`);
                const data = await response.json();
                setOptions(data);
                console.log("Fetched data:", data);
            } catch (error) {
                console.error('Error fetching options:', error);
            }
        };

        fetchOptions();
    }, [subjectid, day]);

    const handleChange = (event) => {
        console.log("Dropdown changed");
        const selectedScheduleId = Number(event.target.value); // Convert to number
        console.log("Selected Schedule ID from dropdown:", selectedScheduleId);

        const selectedOption = options.find(option => option.schedule_id === selectedScheduleId);

        if (selectedOption) {
            console.log("Selected Option:", selectedOption);

            const selectedCourseId = selectedOption.course_id;
            console.log("Selected Course ID:", selectedCourseId);

            onSelect(selectedScheduleId, selectedCourseId); // Pass both values to the parent component
            setSelectedId(selectedScheduleId); // Update selectedId state
        } else {
            console.error("Selected option not found in options. Available options:", options);
        }
    };

    return (
        <select value={selectedId} onChange={handleChange}>
            <option value="" disabled>Select an option</option>
            {options.map((option) => (
                <option key={option.schedule_id} value={option.schedule_id}>
                    {option.start_time}
                </option>
            ))}
        </select>
    );
};

export default DropdownTimeWithFetch;