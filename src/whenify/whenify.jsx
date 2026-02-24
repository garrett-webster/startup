import React, {useState} from 'react';
import './whenify.css';
import { TimeBox} from "./timeBox";

export function Whenify() {
    const [timeBoxes, setTimeBoxes] = useState([
        {
            id: 1,
            name: "Jenny Jensen",
            dateTime: new Date("2026-07-23T14:00:00"),
            yesVotes: 3,
            noVotes: 1,
            yesChecked: false,
            noChecked: false
        }
    ])

    return (
        <div id="whenify">
            <div id="left-padding"></div>
            <div id="times">
                <div id="time-boxes">
                    {timeBoxes.map(box => (
                        <TimeBox
                            key={box.id}
                            {...box}
                        />
                    ))}
                </div>
                <div id="new-time">
                    <label htmlFor="dateInput">Date</label> <input id="dateInput" type="date"/>
                    <label htmlFor="timeInput">Time</label> <input id="timeInput" type="time"/>
                    <input type="submit" value="Submit" style={{ marginTop: '5px' }}/>
                </div>
            </div>
            <div id="middle-padding"></div>
            <div id="event-info-container">
                <p id="eventTitle">Hike the Y</p>
                <p id="organizerName">Organized by Carol Binsen</p>
                <p id="description">Hey guys! We're going to go hike the Y but I need to know when you can go. Put a
                    time when you're available and let us know which times that have been proposed work for you!</p>
            </div>
            <div id="right-padding"></div>
        </div>
    );
}