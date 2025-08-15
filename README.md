# Queue Management System Web Interface

## Description
Scanning a QR code will be an entry point for users to visit this interface to access vendor information and join a queue. The project uses tools such as Firebase, React, and Material UI.

## Features
- User authentication (Email, Facebook, Google)
- View vendor information (Name, Location, Opening Hours, Description, etc.)
- Join queue and view queue status

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/your-repo.git

# Navigate to the project directory
cd your-repo

# Install dependencies
npm install
```

## Usage

```bash
# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

## Configuration

Create a `.env` file in the root directory and add the following environment variables:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```
(Fill in the values with your Firebase project credentials.)
