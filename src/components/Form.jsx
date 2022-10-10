import React, { useState } from 'react';
import '../App.css';


const Form = () => {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState("");
    const [starttime, setStartTime] = useState("");
    const [endtime, setEndTime] = useState("")
    const [totalminutes, setTotalMinutes] = useState("")
    const [taskEditing, setTaskEditing] = React.useState(null);
    const [editingText, setEditingText] = React.useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const newTask = {
            starttime: starttime,
            endtime: endtime,
            totalminutes: totalminutes,
            text: task,
            copmleted: false
        }
        setTasks([...tasks].concat(newTask))
        setTask("")
        setStartTime("")
        setEndTime("")
        setTotalMinutes((starttime + endtime) * 60)
    }

    const deleteTask = (id) => {
        const dlt = [...tasks].filter((task) => task.id !== id)
        setTasks(dlt)
    }

    const submitEdits = (id) => {
        const updatedTasks = [...tasks].map((val) => {
            if (val.id === id) {
                val.text = editingText;
            }
            return val;
        });
        setTasks(updatedTasks);
        setTaskEditing(null);
        setEditingText("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>Select Date:</label>
            <input type="date" id="birthday" />
            <button>load</button>
            <button>Export Timesheet as PNG</button>
            <hr />
            <input type="text" id="start-time" placeholder="Start Time" onChange={(e) => setStartTime(e.target.value)} value={starttime} />
            <input type="text" id="end-time" placeholder="End Time" onChange={(e) => setEndTime(e.target.value)} value={endtime} />
            <input type="text" id="desc" placeholder="Task Description" onChange={(e) => setTask(e.target.value)} value={task} />
            <button>Add</button>
            <hr />
            <div className="App">
                <table>
                    <thead>
                        <tr>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Minutes</th>
                            <th>Task description</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((val) => {
                            return (
                                <tr key={val.id}>
                                    <td>{val.starttime}</td>
                                    <td>{val.endtime}</td>
                                    <td>{val.totalminutes}</td>
                                    <td>
                                        {val.id === taskEditing ? (
                                            <input
                                                type="text"
                                                onChange={(e) => setEditingText(e.target.value)}
                                            />
                                        ) : (
                                            <div>{val.text}</div>
                                        )}
                                    </td>
                                    <td>{val.id === taskEditing ? (
                                        <button onClick={() => submitEdits(val.id)}>Submit Edits</button>
                                    ) : (
                                        <button onClick={() => setTaskEditing(val.id)}>Edit</button>
                                    )}
                                        <button onClick={() => deleteTask(val.id)}>delete</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </form>
    )
}

export default Form