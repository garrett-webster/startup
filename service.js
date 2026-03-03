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

    saveTimeboxes();
    notifyTimeBox();
}

export function registerUser(user) {
    if(users.some(existingUser => user.name === existingUser.name)) return false;
    users.push(user);
    saveUsers();
    notifyUsers();
    return true;
}

export function authenticateUser(user) {
    return users.some(existingUser => user.name === existingUser.name && user.password === existingUser.password)
}