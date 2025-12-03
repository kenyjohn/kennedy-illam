# Rental LLC Website

A modern, responsive rental property management website built with React, TypeScript, Vite, and Node.js/Express.

## Features

### Public Interface
- **Home Page**: Featured properties and company overview.
- **Properties Listing**: Browse available rental properties with filtering.
- **Property Details**: Detailed view of property features, images, and location.
- **Contact Form**: Easy way for potential tenants to get in touch.
- **Application Form**: Online rental application submission.

### Admin Dashboard (Phase 2)
- **Secure Login**: Admin authentication system.
- **Dashboard Overview**: Quick stats on total properties, applications, and showings.
- **Property Management**:
  - View all properties in a table format.
  - Add new properties with details and images.
  - Edit existing property information.
  - Delete properties.
  - Toggle property availability status.

## Tech Stack
- **Frontend**: React, TypeScript, Vite, Tailwind CSS
- **Backend**: Node.js, Express, Prisma (SQLite)
- **State Management**: React Hooks

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Installation

1.  Clone the repository.
2.  Install dependencies for both frontend and backend:

    ```bash
    # Root directory (Frontend)
    npm install

    # Server directory (Backend)
    cd server
    npm install
    ```

3.  Set up the database:

    ```bash
    cd server
    npx prisma migrate dev
    npx prisma db seed
    ```

### Running the Application

1.  Start the backend server:

    ```bash
    cd server
    npm run dev
    ```

2.  Start the frontend development server:

    ```bash
    # In a new terminal, from root directory
    npm run dev
    ```

3.  Open [http://localhost:5173](http://localhost:5173) in your browser.

## Phase 2 Implementation Details
- Integrated Admin Dashboard with real backend data.
- Created `AdminProperties` page for full CRUD operations on properties.
- Updated `AdminDashboard` to reflect real-time property counts.
- Fixed backend module resolution issues by migrating to `tsx`.
