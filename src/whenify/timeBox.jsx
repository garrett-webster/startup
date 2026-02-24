import React from 'react';
import './whenify.css';

export function TimeBox({ id, handleVote, name, dateTime, yesVotes = 0, noVotes = 0, yesChecked = false, noChecked = false }) {
    const date = dateTime.toLocaleDateString(undefined, {
        weekday: "long",
        month: "long",
        day: "numeric"
    });
    const time = dateTime.toLocaleTimeString(undefined, {
        hour: "numeric",
        minute: "2-digit"
    });

    return (
        <div className="time-box">
            <div className="time-info-box">
                <p className="nameLabel">{ name }</p>
                <p className="dateLabel">{ date }</p>
                <p className="timeLabel">{ time }</p>
            </div>
            <div className="time-box-right">
                <img src="/rainIcon.png" alt="rain cloud" className="weather-icon"/>
                <div className="voting-box">
                    <div className="voting-row">
                        <button
                            className={`voting-btn voting-row-element ${yesChecked ? 'selected-button' : ''}`}
                            onClick={() => handleVote(id, "yes")}
                        >Yes</button>
                        <p className="vote-total-display voting-row-element">{ yesVotes }</p>
                    </div>
                    <div className="voting-row">
                        <button
                            className={`voting-btn voting-row-element ${noChecked ? 'selected-button' : ''}`}
                            onClick={() => handleVote(id, "no")}
                        >No</button>
                        <p className="vote-total-display voting-row-element">{ noVotes }</p>
                    </div>
                </div>
            </div>
        </div>
    )
}