import React, {useEffect, useState} from 'react';
import './whenify.css';
import {TimeBox} from "./timeBox";
import {addTimeBox, handleVote, subscribeTimeBoxes} from "../../service";

export function Whenify({ eventInfo, currentUser }) {
    const [dateValue, setDateValue] = useState("");
    const [timeValue, setTimeValue] = useState("");
    const [timeBoxes, setTimeBoxes] = useState([]);

    const handleSubmit = () => {
        if (!dateValue || !timeValue) return;

        const dateTime = new Date(`${dateValue}T${timeValue}`);

        addTimeBox({
            id: crypto.randomUUID(),
            name: localStorage.getItem("currentUser"),
            dateTime,
            currentUser: currentUser,
            yesVotes: [],
            noVotes: []
        });
    };

    useEffect(() => {
        return subscribeTimeBoxes(setTimeBoxes);
    }, []);

    return (
        <div id="whenify">
            <div id="left-padding"></div>
            <div id="times">
                <div id="time-boxes">
                    {timeBoxes.map(box => (
                        <TimeBox
                            key={box.id}
                            id={box.id}
                            handleVote={handleVote}
                            currentUser={currentUser}
                            {...box}
                        />
                    ))}
                </div>
                <div id="new-time">
                    <label htmlFor="dateInput">Date</label>
                    <input
                        id="dateInput"
                        type="date"
                        value={dateValue}
                        onChange={e => setDateValue(e.target.value)}
                    />
                    <label htmlFor="timeInput">Time</label>
                    <input
                        id="timeInput"
                        type="time"
                        value={timeValue}
                        onChange={e => setTimeValue(e.target.value)}
                    />
                    <input type="submit" value="Submit" style={{ marginTop: '5px' }} onClick={() => handleSubmit()}/>
                </div>
            </div>
            <div id="middle-padding"></div>
            <div id="event-info-container">
                <p id="eventTitle"> {eventInfo.name}</p>
                <p id="organizerName">Organized by {eventInfo.organizer}</p>
                <p id="description">{eventInfo.description}</p>
            </div>
            <div id="right-padding"></div>
        </div>
    );
}