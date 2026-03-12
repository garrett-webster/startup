let timeBoxes = loadTimeboxesFromStorage();
let users = JSON.parse(localStorage.getItem("users")) || [];
let timeBoxListeners = [];
let usersListeners = [];

function notifyTimeBox() {
    timeBoxListeners.forEach(l => l([...timeBoxes]));
}
function notifyUsers() {
    usersListeners.forEach(l => l([...users]));
}

function loadTimeboxesFromStorage() {
    const stored = localStorage.getItem("timeBoxes");
    if (!stored) return [];

    const parsed = JSON.parse(stored);
    return parsed.map(box => ({
        ...box,
        dateTime: new Date(box.dateTime)
    }));
}

export function subscribeTimeBoxes(callback) {
    timeBoxListeners.push(callback);
    callback([...timeBoxes]); // send initial state

    return () => {
        timeBoxListeners = timeBoxListeners.filter(l => l !== callback);
    };
}

export function subscribeUsers(callback) {
    usersListeners.push(callback);
    callback([...users]); // send initial state

    return () => {
        usersListeners = usersListeners.filter(l => l !== callback);
    };
}

function saveTimeboxes() {
    localStorage.setItem("timeBoxes", JSON.stringify(timeBoxes));
}

function saveUsers() {
    localStorage.setItem("users", JSON.stringify(users));
}

export function addTimeBox(box) {
    timeBoxes.push(box);
    saveTimeboxes();
    notifyTimeBox();
}

export function handleVote(id, type, user) {
    timeBoxes = timeBoxes.map(box => {
        if (box.id !== id) return box;

        let yesVotes = [...box.yesVotes];
        let noVotes = [...box.noVotes];

        if (type === "yes") {
            if (yesVotes.includes(user)) {
                yesVotes = yesVotes.filter(u => u !== user);
            } else {
                yesVotes.push(user);
                noVotes = noVotes.filter(u => u !== user);
            }
        } else {
            if (noVotes.includes(user)) {
                noVotes = noVotes.filter(u => u !== user);
            } else {
                noVotes.push(user);
                yesVotes = yesVotes.filter(u => u !== user);
            }
        }

        return { ...box, yesVotes, noVotes };
    });

    saveTimeboxes();
    notifyTimeBox();
}

export function determineWeather(dateTime) {
    if (Math.random() > .5) {
        return "/raining.png"
    } else {
        return "sunny.png"
    }
}

export function clearMemory() {
    timeBoxes = [];
    users = [];
    notifyUsers();
    notifyTimeBox();
    timeBoxListeners = [];
    usersListeners = [];
}