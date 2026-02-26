import React, {useEffect, useState} from 'react';
import './whenify.css';
import { TimeBox} from "./timeBox";

export function Whenify() {
    const [timeBoxes, setTimeBoxes] = useState([])
    useEffect(() => {
        const stored = localStorage.getItem("timeBoxes");
        if (stored) {
            const parsed = JSON.parse(stored);
            const revived = parsed.map(box => ({
                ...box,
                dateTime: new Date(box.dateTime)
            }));
            setTimeBoxes(revived);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("timeBoxes", JSON.stringify(timeBoxes));
    }, [timeBoxes]);

    const [dateValue, setDateValue] = useState("");
    const [timeValue, setTimeValue] = useState("");

    const handleVote = function(id, type) {
        setTimeBoxes(previous => (
            previous.map(val => {
                if (val.id !== id) return val;
                let yesVotes = val.yesVotes;
                let noVotes = val.noVotes;
                let yesChecked = val.yesChecked;
                let noChecked = val.noChecked;

                if (type === "yes") {
                    if (yesChecked) {
                        yesVotes -= 1;
                        yesChecked = false;
                    } else {
                        yesVotes += 1;
                        yesChecked = true;

                        if (noChecked) {
                            noVotes -= 1;
                            noChecked = false;
                        }
                    }
                }

                if (type === "no") {
                    if (noChecked) {
                        noVotes -= 1;
                        noChecked = false;
                    } else {
                        noVotes += 1;
                        noChecked = true;

                        if (yesChecked) {
                            yesVotes -= 1;
                            yesChecked = false;
                        }
                    }
                }

                return ({
                    ...val,
                    yesVotes: yesVotes,
                    noVotes: noVotes,
                    yesChecked: yesChecked,
                    noChecked: noChecked
                })
            }))
        )
    }

    const handleSubmit = () => {
        if (!dateValue || !timeValue) return;

        const dateTime = new Date(`${dateValue}T${timeValue}`);

        addTimeBox("John John", dateTime, 0, 0, false, false);
    };

    const addTimeBox = (name, date, yesVotes, noVotes, yesChecked, noChecked, id = crypto.randomUUID()) => {
        setTimeBoxes(prevTimeBoxes => [
            ...prevTimeBoxes,
            {
                id: id,
                name: name,
                dateTime: date,
                yesVotes: yesVotes,
                noVotes: noVotes,
                yesChecked: yesChecked,
                noChecked: noChecked
            }
        ]);
    }

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
                <p id="eventTitle">Hike the Y</p>
                <p id="organizerName">Organized by Carol Binsen</p>
                <p id="description">Hey guys! We're going to go hike the Y but I need to know when you can go. Put a
                    time when you're available and let us know which times that have been proposed work for you!</p>
            </div>
            <div id="right-padding"></div>
        </div>
    );
}