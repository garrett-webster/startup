import React from 'react';
import './whenify.css';
import {determineWeather} from "../../service";

export function TimeBox({ id, handleVote, name, dateTime, currentUser, yesVotes = [], noVotes = [] }) {
    const date = dateTime.toLocaleDateString(undefined, {
        weekday: "long",
        month: "long",
        day: "numeric"
    });
    const time = dateTime.toLocaleTimeString(undefined, {
        hour: "numeric",
        minute: "2-digit"
    });

    const weatherIcon = React.useMemo(() => {
        return determineWeather(dateTime);
    }, [dateTime]);

    return (
        <div className="time-box">
            <div className="time-info-box">
                <p className="nameLabel">{ name }</p>
                <p className="dateLabel">{ date }</p>
                <p className="timeLabel">{ time }</p>
            </div>
            <div className="time-box-right">
                <img src={weatherIcon} alt="rain cloud" className="weather-icon"/>
                <div className="voting-box">
                    <div className="voting-row">
                        <button
                            className={`voting-btn voting-row-element ${yesVotes.includes(currentUser) ? 'selected-button' : ''}`}
                            onClick={() => handleVote(id, "yes", currentUser)}
                        >Yes</button>
                        <p className="vote-total-display voting-row-element">{ yesVotes.length }</p>
                    </div>
                    <div className="voting-row">
                        <button
                            className={`voting-btn voting-row-element ${noVotes.includes(currentUser) ? 'selected-button' : ''}`}
                            onClick={() => handleVote(id, "no", currentUser)}
                        >No</button>
                        <p className="vote-total-display voting-row-element">{ noVotes.length }</p>
                    </div>
                </div>
            </div>
        </div>
    )
}