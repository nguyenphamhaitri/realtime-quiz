###  MERN Stack Architecture Diagram
1. **Frontend (ReactJS)**
    - User Interface
        - Login/Register
        - Quiz session
            + Questions
            + Leader board

2. **Backend (Node.js with Express)**
    - REST API Endpoints
        - User Authentication (Login/Register)
        - Question Management (Create Question)
    - WebSockets (Socket.io)
        - Real-Time Communication (Join Quiz, Answer Question, Update Leaderboard)

3. **Database (MongoDB)**
    - Users Collection
        - User (username, password, role)
    - Questions Collection
        - Question (text, answer, options)

4. **Communication Flow**
    - User interacts with the Frontend
        - Sends HTTP Requests to the Backend for authentication
        - Establishes WebSocket connection for real-time updates
    - Backend processes requests and communicates with the Database
        - Handles user authentication, questions creation
        - Processes real-time events from WebSocket and updates the Database
    - Database stores and retrieves necessary data
        - Stores user details and questions
    - Real-Time Updates
        - Backend sends real-time updates to connected clients via WebSocket

### Diagram

```
+-------------------+               +-------------------+          +-------------------+
|                   |<--------------|                   |          |                   |
|    Frontend       |     HTTP      |      Backend      |          |     Database      |
|   (ReactJS)       |               | (Node.js/Express) |<-------->|     (MongoDB)     |
|                   |-------------->|                   |          |                   |
+-------------------+   WebSocket   |                   |          +-------------------+
        |                           +-------------------+                   |
        |                                   |                               |
        v                                   v                               v
+-------------------+               +-------------------+          +-------------------+
|   User Interface  |               |   REST API        |          |    Users          |
| - Quiz Interface  |               | - Auth            |          | - username        |
| - Login/Register  |               |                   |          | - password        |
|                   |               +-------------------+          +-------------------+
+-------------------+               |   WebSockets      |          |    Questions      |
                                    | - Real-Time Comm  |          | - Text            |
                                    | - Join Quiz       |          | - Answer          |
                                    | - Submit Answer   |          | - Options         |
                                    | - Leaderboard     |          +-------------------+
                                    +-------------------+
```
## Demo :
https://drive.google.com/file/d/1ZcCWaRrta4vVYoVV1zprmR6oCL7jKH9J/view?usp=sharing