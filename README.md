# Whenify

[My Notes](notes.md)

## 🚀 Specification Deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [X] Proper use of Markdown
- [X] A concise and compelling elevator pitch
- [X] Description of key features
- [X] Description of how you will use each technology
- [X] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

### Elevator pitch

Each of us have, at one point or another, been trying to schedule a time to get something done with others. Maybe you and your friends want to get together for lunch, or maybe you and some colleagues need to meet to collaborate on a project. Everytime you say "well, there's only a few of us, so finding a time should be easy!" But, as you are well aware, it rarely is easy. Introducing Whenify, the easy, collaborative solution to winning scheduling! Whenify allows you and your group to easily input when each of you are available and helps choose the best time for the group. If your event is outside, it will even help you plan around the weather!

### Design

![Design image](Mockup.png)

The layout to enter in your availability when you have received a Whenify link. 

### Key features

- Create new Whenify with a title and unique link
- Enter in your availability, signed with your name
- See who has put in their availability
- Chat in realtime as you plan

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - Layout Whenify, providing the structure of the website. The most complicated components will be the table for inputing availability (whose cells will be check boxes, eventually stylized to look like full boxes), and the chat box
- **CSS** - CSS will be used for spacing and for color. For example, depending on what your selection is at any time, the cells will need to be either red or green.
- **React** - React forms the basis of how the content is actually delivered. Many parts of Whenify are repeated (such as the cells in teh table and the chat messages). React will allow me to template these out and reuse them. It also will allow for the easy creation of new chat messages in a realtime way.
- **Service** - The backend is primarily for acting as a middle man between the database and the front end. The only real compuation it is doing is to 1) get weather data 2) generate urls for each Whenify and 3) tabulate the results.
- **DB/Login** - The database stores entries for each Whenify (including the name of the event, who created it, and location), as well as the avaialbilities of each person that fills out the Whenify.
- **WebSocket** - Websocket is used to provide a real time chat between the users.

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Server deployed and accessible with custom domain name** - [My server link](https://yourdomainnamehere.click).

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **HTML pages** - I did not complete this part of the deliverable.
- [ ] **Proper HTML element usage** - I did not complete this part of the deliverable.
- [ ] **Links** - I did not complete this part of the deliverable.
- [ ] **Text** - I did not complete this part of the deliverable.
- [ ] **3rd party API placeholder** - I did not complete this part of the deliverable.
- [ ] **Images** - I did not complete this part of the deliverable.
- [ ] **Login placeholder** - I did not complete this part of the deliverable.
- [ ] **DB data placeholder** - I did not complete this part of the deliverable.
- [ ] **WebSocket placeholder** - I did not complete this part of the deliverable.

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Header, footer, and main content body** - I did not complete this part of the deliverable.
- [ ] **Navigation elements** - I did not complete this part of the deliverable.
- [ ] **Responsive to window resizing** - I did not complete this part of the deliverable.
- [ ] **Application elements** - I did not complete this part of the deliverable.
- [ ] **Application text content** - I did not complete this part of the deliverable.
- [ ] **Application images** - I did not complete this part of the deliverable.

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Bundled using Vite** - I did not complete this part of the deliverable.
- [ ] **Components** - I did not complete this part of the deliverable.
- [ ] **Router** - I did not complete this part of the deliverable.

## 🚀 React part 2: Reactivity deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **All functionality implemented or mocked out** - I did not complete this part of the deliverable.
- [ ] **Hooks** - I did not complete this part of the deliverable.

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Node.js/Express HTTP service** - I did not complete this part of the deliverable.
- [ ] **Static middleware for frontend** - I did not complete this part of the deliverable.
- [ ] **Calls to third party endpoints** - I did not complete this part of the deliverable.
- [ ] **Backend service endpoints** - I did not complete this part of the deliverable.
- [ ] **Frontend calls service endpoints** - I did not complete this part of the deliverable.
- [ ] **Supports registration, login, logout, and restricted endpoint** - I did not complete this part of the deliverable.


## 🚀 DB deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Stores data in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Stores credentials in MongoDB** - I did not complete this part of the deliverable.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [ ] **Application is fully functional** - I did not complete this part of the deliverable.
