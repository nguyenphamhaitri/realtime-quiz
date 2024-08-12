# Backend

This is the backend server for the project, built using Node.js, Express, and Socket.IO. It handles server-side logic, manages API endpoints, and provides real-time communication capabilities.

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory and set the necessary environment variables. Refer to `.env.example` for a list of required variables.

4. **Run the server**

   ```bash
   npm run dev
   ```

   This command will start the server with `nodemon`, which automatically restarts the server whenever you make changes to the code.

## Scripts

- **`dev`**: Starts the server in development mode using `nodemon`.
- **`test`**: Placeholder script for running tests. Currently outputs an error message.
- **`format`**: Formats the code using `Prettier`.
- **`lint`**: Lints the code using `ESLint` and automatically fixes any issues.

## License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.
