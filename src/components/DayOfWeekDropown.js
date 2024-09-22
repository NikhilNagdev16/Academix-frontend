import React, { useState } from 'react';

const DayOfWeekDropdown = ({ onSelect }) => {
    const [selectedDay, setSelectedDay] = useState('');

    const daysOfWeek = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
    ];

    const handleChange = (event) => {
        const selectedDay = event.target.value;
        setSelectedDay(selectedDay);
        if (onSelect) {
            onSelect(selectedDay);
        }
    };

    return (
        <select value={selectedDay} onChange={handleChange}>
            <option value="" disabled>Select a day</option>
            {daysOfWeek.map((day) => (
                <option key={day} value={day}>
                    {day}
                </option>
            ))}
        </select>
    );
};

export default DayOfWeekDropdown;