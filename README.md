# Collab Canvas

Collab Canvas is a real-time collaborative drawing application that allows multiple users to draw on a shared canvas simultaneously. The project is built with React.js and Socket.IO, enabling real-time updates and seamless collaboration.

## Features

- Real-time drawing updates across multiple clients
- Adjustable brush color, size, line join, and line cap
- Intuitive and user-friendly interface
- Cross-browser compatibility
- Responsive design for various screen sizes

## Technologies Used

- React.js
- Socket.IO
- HTML5 Canvas
- CSS3

## Getting Started

### Prerequisites

Make sure you have the following installed on your local machine:

- Node.js
- npm (Node Package Manager)

### Installation

1. Clone the repository:

   ```bash
      git clone https://github.com/your-username/collab-canvas.git
      cd collab-canvas
   ```

2. Install server dependencies:

   ```bash
       cd server
       npm instal
   ```

3. Install client dependencies:

   ```bash
   cd ../client
   npm install
   ```

### Running the Application

1. Start the server:

    ```bash
    cd server
    node server.js
    ```

or for automatic restart on changes:

    ```bash
    nodemon server.js
    ```

2. Start the client:

    ```bash
    cd ../client
    npm start
    ```

3. Open the application:

   `Open your browser and navigate to http://localhost:5173.`

4. Open multiple tabs/windows:

   `To test real-time collaboration, open the application in multiple browser windows or tabs.`
