let timeBoxes = loadFromStorage();
let listeners = [];

function notify() {
    listeners.forEach(l => l([...timeBoxes]));
}

function loadFromStorage() {
    const stored = localStorage.getItem("timeBoxes");
    if (!stored) return [];

    const parsed = JSON.parse(stored);
    return parsed.map(box => ({
        ...box,
        dateTime: new Date(box.dateTime)
    }));
}

export function subscribe(callback) {
    listeners.push(callback);
    callback([...timeBoxes]); // send initial state

    return () => {
        listeners = listeners.filter(l => l !== callback);
    };
}

function save() {
    localStorage.setItem("timeBoxes", JSON.stringify(timeBoxes));
}

export function addTimeBox(box) {
    timeBoxes.push(box);
    save();
    notify();
}

export function handleVote(id, type) {
    timeBoxes = timeBoxes.map(box => {
        if (box.id !== id) return box;

        let { yesVotes, noVotes, yesChecked, noChecked } = box;

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

        return { ...box, yesVotes, noVotes, yesChecked, noChecked };
    });

    save();
    notify();
}