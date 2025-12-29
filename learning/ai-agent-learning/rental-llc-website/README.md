# Rental LLC Website

A modern, responsive rental property management website built with React, TypeScript, Vite, and Node.js/Express.

## Features

### Public Interface
- **Home Page**: Featured properties and company overview.
- **Properties Listing**: Browse available rental properties with filtering.
- **Property Details**: Detailed view of property features, images, and location.
- **Showing Scheduler**: Integrated tool for potential tenants to book property viewings directly from the property page.
- **Contact Form**: Easy way for potential tenants to get in touch.
- **Application Form**: Online rental application submission.

### Admin Dashboard
- **Secure Login**: Admin authentication system (Default: `admin@rental.com` / `admin123`).
- **Dashboard Overview**: Quick stats on total properties, applications, and showings.
- **Property Management**:
  - View all properties in a table format.
  - Add new properties with details and images.
  - Edit existing property information.
  - Delete properties.
  - Toggle property availability status.
- **Integration**: Accessible via the "Admin Portal" link in the website footer.

### Tenant Portal
- **Secure Login**: Dedicated portal for tenants to manage their rental experience.
- **Dashboard**: Overview of lease status, payments, and maintenance requests.
- **Features**:
  - Lease management.
  - Document viewing.
  - Maintenance request submission.
- **Integration**: Accessible via the "Tenant Portal" link in the main navigation bar.

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

## Phase 3 Implementation Details
- **Full Portal Integration**: Admin and Tenant portals are now fully linked from the main public site.
- **Showing Scheduler**: Implemented end-to-end showing scheduling functionality.
- **Properties Page Fix**: Resolved backend connection issues to ensure properties load correctly.
- **Navigation Update**: Updated Navbar and Footer for seamless navigation between public, admin, and tenant sections.
