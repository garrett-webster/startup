import React, {useEffect, useState} from 'react';
import './whenify.css';
import {TimeBox} from "./timeBox";
// import {addTimeBox, handleVote} from "../../service";
import {subscribeTimeBoxes, newTimebox, handleVote} from "../websocket/timeBoxService"

export function Whenify({ eventInfo, currentUser }) {
    const [dateValue, setDateValue] = useState("");
    const [timeValue, setTimeValue] = useState("");
    const [timeBoxes, setTimeBoxes] = useState([]);

    const handleSubmit = () => {
        if (!dateValue || !timeValue) return;

        const dateTime = new Date(`${dateValue}T${timeValue}`);

        newTimebox({
            id: crypto.randomUUID(),
            name: currentUser,
            dateTime,
            yesVotes: [],
            noVotes: []
        });

        setDateValue("");
        setTimeValue("");
    };

    // // MOCKED BEHAVIOR
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         if (timeBoxes.length < 6) {
    //             addTimeBox({
    //                     id: crypto.randomUUID(),
    //                     name: "Bob Jones",
    //                     dateTime: new Date("2026-03-07T06:47:00.000Z"),
    //                     currentUser: currentUser,
    //                 yesVotes: [],
    //                 noVotes: []
    //                 }
    //             );
    //         }
    //     }, 10000)
    //     return () => clearInterval(interval);
    // }, [timeBoxes.length]);

    const handleVote = () => {}; // Stub so handleVote doesn't throw an error while I'm working on the websocket stuff.

    useEffect(() => {
        const interval = setInterval(() => {
            if (timeBoxes.length === 0) return;

            const index = Math.floor(Math.random() * timeBoxes.length);
            const box = timeBoxes[index];

            const roll = Math.random();

            if (roll < 0.5) {
                handleVote(box.id, "yes", "John");
            } else {
                handleVote(box.id, "no", "John");
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [timeBoxes]);


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
                    <input type="submit" value="Submit" style={{ marginTop: '5px' }} onClick={handleSubmit}/>
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