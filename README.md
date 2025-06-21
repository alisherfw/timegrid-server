# TimeGrid Server

A simple backend API built with **Node.js**, **Express**, and **Mongoose**.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file or set the following environment variables:
   - `MONGODB_URI` – MongoDB connection string
   - `JWT_SECRET` – secret used to sign tokens
   - `PORT` (optional) – server port, default `3001`
3. Start the server:
   ```bash
   node index.js
   ```

## Project Structure

- `index.js` – entry point that configures Express and connects to MongoDB
- `model/` – Mongoose models: `User`, `Goal`, `Step`, `Event`
- `controller/` – route handlers for each model
- `routes/` – Express route definitions
- `middleware/auth.js` – JWT authentication helpers

## Documentation

Detailed endpoints and model descriptions are available in [DOCUMENTATION.html](DOCUMENTATION.html).

## License

This project is licensed under the [MIT](LICENSE) License.
