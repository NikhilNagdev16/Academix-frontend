import React, { useState, useEffect } from 'react';

const StudentMarksList = ({ subjectId, courseId }) => {
    const [data, setData] = useState([]);
    const [marks, setMarks] = useState({});
    const [maxMarks, setMaxMarks] = useState({ internal: "", external: "", practical: "" });
    const [error, setError] = useState(""); // For handling errors

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch(`http://localhost:8080/studentBySubject?subjectId=${subjectId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch student data.");
                }

                const studentData = await response.json();
                setData(studentData);

                // Initialize marks state for each student
                const initialMarks = studentData.reduce((acc, student) => {
                    acc[student.user_id] = { rollNo: student.rollNo, internal: "", external: "", practical: "" }; // Default marks empty
                    return acc;
                }, {});
                setMarks(initialMarks);
            } catch (error) {
                setError(error.message);
                console.error("Error:", error);
            }
        };

        fetchStudents();
    }, [subjectId]);

    const handleMarksChange = (userId, type, value) => {
        setMarks((prevMarks) => ({
            ...prevMarks,
            [userId]: {
                ...prevMarks[userId],
                [type]: value,
            },
        }));
    };

    const handleMaxMarksChange = (type, value) => {
        setMaxMarks((prevMaxMarks) => ({
            ...prevMaxMarks,
            [type]: value,
        }));
    };

    const getMarksList = () => {
        return Object.keys(marks).map((userId) => ({
            userid: parseInt(userId),
            rollno: marks[userId].rollNo,
            internal: marks[userId].internal,
            external: marks[userId].external,
            practical: marks[userId].practical,
        }));
    };

    const handleSubmitMarks = async () => {
        const marksList = getMarksList();
        const maxInternal = parseInt(maxMarks.internal) || 0;
        const maxExternal = parseInt(maxMarks.external) || 0;
        const maxPractical = parseInt(maxMarks.practical) || 0;

        if (marksList.some(mark => {
            const internal = parseInt(mark.internal) || 0;
            const external = parseInt(mark.external) || 0;
            const practical = parseInt(mark.practical) || 0;

            return (
                !mark.internal || !mark.external || !mark.practical ||
                internal > maxInternal ||
                external > maxExternal ||
                practical > maxPractical
            );
        })) {
            alert('Please fill all fields correctly and ensure marks do not exceed the maximum limits.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/markExam?subjectId=${subjectId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(marksList),
            });

            if (response.ok) {
                alert('Marks submitted successfully!');
            } else {
                const errorData = await response.json();
                alert(`Failed to submit marks: ${errorData.message}`);
            }
        } catch (error) {
            alert(`Failed to submit marks: ${error.message}`);
        }
    };

    const renderTableRows = () => {
        return data.map((student) => (
            <tr key={student.user_id}>
                <td>{student.rollNo}</td>
                <td>{student.name}</td>
                <td>
                    <div className="form__inputs">
                        <input
                            type="number"
                            value={marks[student.user_id]?.internal || ""}
                            onChange={(e) => handleMarksChange(student.user_id, "internal", e.target.value)}
                            placeholder="Internal Marks"
                        />
                    </div>
                </td>
                <td>
                    <div className="form__inputs">
                        <input
                            type="number"
                            value={marks[student.user_id]?.external || ""}
                            onChange={(e) => handleMarksChange(student.user_id, "external", e.target.value)}
                            placeholder="External Marks"
                        />
                    </div>
                </td>
                <td>
                    <div className="form__inputs">
                        <input
                            type="number"
                            value={marks[student.user_id]?.practical || ""}
                            onChange={(e) => handleMarksChange(student.user_id, "practical", e.target.value)}
                            placeholder="Practical Marks"
                        />
                    </div>
                </td>
            </tr>
    ));
    };

    return (
        <>
            <div className="App">
                <h3>Set Maximum Marks</h3>
                <div className="App-content">
                    <div className="form__inputs">
                    <input
                        type="number"
                        value={maxMarks.internal}
                        onChange={(e) => handleMaxMarksChange("internal", e.target.value)}
                        placeholder="Max Internal Marks"
                    />
                    </div>
                    <div className="form__inputs">
                    <input
                        type="number"
                        value={maxMarks.external}
                        onChange={(e) => handleMaxMarksChange("external", e.target.value)}
                        placeholder="Max External Marks"
                    />
                    </div>
                    <div className="form__inputs">
                    <input
                        type="number"
                        value={maxMarks.practical}
                        onChange={(e) => handleMaxMarksChange("practical", e.target.value)}
                        placeholder="Max Practical Marks"
                    />
                    </div>

                </div>
            </div>
            <div className="App">
                <div className="App-content">
                    {error && <div className="error">{error}</div>}

                    <table border="1" cellPadding="10" cellSpacing="0">
                        <thead>
                        <tr>
                            <th>Roll No</th>
                            <th>Name</th>
                            <th>Internal Marks</th>
                            <th>External Marks</th>
                            <th>Practical Marks</th>
                        </tr>
                        </thead>
                        <tbody>
                        {renderTableRows()}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="App">
                <div className="App-content">
                    <div className="form__submit">
                    <button onClick={handleSubmitMarks}>Submit Marks</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default StudentMarksList;