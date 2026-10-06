# Job Application Tracker

A React + TypeScript job application tracker that helps users manage applications, search and filter jobs, and track statuses such as Applied, Interviewed, and Rejected.

## Project Purpose

This application allows users to:

- register and log in securely
- add, edit, and delete job applications
- search jobs by company or role
- filter jobs by status
- sort jobs by date
- view detailed job information on a dedicated job page
- navigate with React Router using URL queries and route parameters

## Main Features

- Landing page with overview and call-to-action buttons
- Login page
- Registration page
- Home page showing all tracked applications
- Job details page for more information about each application
- 404 page for invalid routes
- Protected routes for authenticated access
- Status color coding
- CRUD operations for job entries
- JSON Server persistence
- Responsive layout

## Design(Figma)

link :

- https://www.figma.com/design/sdD7srVyetSdYilKHwLfKB/Untitled?node-id=0-1&t=HOxzDpPN9FbzSwX6-1

## Tech Stack

- React
- TypeScript
- React Router
- JSON Server
- CSS

## Application Flow

1. User lands on the landing page.
2. User registers or logs in.
3. Authenticated users can view the home page.
4. Users can add new job entries with details such as:
   - company name
   - role
   - status
   - date applied
   - job duties
5. Users can search, filter, and sort jobs using URL query parameters.
6. Users can view detailed job information and update or delete entries.
7. If a route does not exist, the app displays a 404 page.

## Folder Structure

```bash
src/
  components/
    Navbar
    JobForm
    JobCard
    SearchBar
    FilterPanel
    StatusBadge
    AuthGuard
  pages/
    LandingPage
    LoginPage
    RegisterPage
    HomePage
    JobDetailsPage
    NotFoundPage
  services/
    api.js
  App.tsx
  main.tsx
  styles/
    app.css
```

## Local Setup

1. Clone the project repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the JSON server:
   ```bash
   npx json-server --watch db.json
   ```
4. Start the React app:
   ```bash
   npm start
   ```
5. Open the application in the browser.

## Notes

- Use protected routing so only logged-in users can access private pages.
- Keep URLs predictable by syncing search, filter, and sort states with query parameters.
- Validate form inputs before saving data.
- Use consistent colors for statuses:
  - Applied = Yellow
  - Interviewed = Green
  - Rejected = Red

## Future Improvements

- Add user-specific data storage by user ID
- Add job notes and interview reminders
- Add chart summaries for application progress
- Add edit mode improvements and better validation feedback

## Summary

This project is a small but complete job application tracker MVP designed to practice React routing, forms, state management, URL queries, protected routes, and JSON Server integration.
