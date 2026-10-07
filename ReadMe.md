# Job Application Tracker

A responsive React and TypeScript app for tracking job applications. Users can record application details, update their status, and find applications using URL-backed search, filters, and sorting.

## Features

- Landing, login, registration, dashboard, job details, and not-found pages
- Registration and login backed by `json-server-auth`
- Protected dashboard, add-job, and job-details routes
- Create, read, update, and delete job applications
- Job fields: company, role, status, application date, and duties
- Search by company or role; filter by status; sort by application date
- Status colors: Applied (yellow), Interviewed (green), Rejected (red)
- Responsive layouts, including mobile navigation
- Loading and error states for data requests

## Design

The interface follows the supplied design and color direction. The project design file is available on [Figma](https://www.figma.com/design/sdD7srVyetSdYilKHwLfKB/Untitled?node-id=0-1&t=HOxzDpPN9FbzSwX6-1).

## Technology

- React 19 and TypeScript
- Vite
- React Router
- JSON Server with `json-server-auth`
- CSS

## Routes

| Path               | Page                            | Access    |
| ------------------ | ------------------------------- | --------- |
| `/`                | Landing                         | Public    |
| `/login`           | Login                           | Public    |
| `/register`        | Registration                    | Public    |
| `/home`            | Application dashboard           | Protected |
| `/jobs/new`        | Add an application              | Protected |
| `/jobs/:id`        | Application details and editing | Protected |
| Any unmatched path | Not found                       | Public    |

The dashboard stores its view state in query parameters. For example, `/home?search=design&filter=Interviewed&sort=oldest` searches for "design", filters to Interviewed applications, and sorts oldest first. Supported parameters are `search`, `filter` (`Applied`, `Interviewed`, `Rejected`), and `sort` (`newest`, `oldest`). Default values are omitted from the URL.

## Run Locally

Prerequisites: Node.js and npm.

1. Clone the repository and enter the project folder.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the Vite app and JSON Server together:

   ```bash
   npm run dev:all
   ```

4. Open the local URL printed by Vite, normally `http://localhost:5173`.

Alternatively, run the frontend and API in separate terminals with `npm run dev` and `npm run server`. The API runs on port `3001`; the frontend defaults to that local API URL.

## Configuration

To use a separately hosted API, define `VITE_API_URL` in a local `.env.local` file:

```env
VITE_API_URL=https://your-api-host.example
```

Do not add private credentials or real user data to the repository. `json-server-auth` and the JSON file are intended for this learning project and are not a production authentication or database solution. A hosted deployment needs a persistent database and appropriate security controls.

## Project Structure

```text
src/
  api/          API request helpers for authentication and jobs
  components/   Reusable buttons, cards, search, and navigation
  context/      Authentication state
  hooks/        Job data and CRUD operations
  pages/        Landing, authentication, dashboard, forms, details, 404
  types/        TypeScript data models
  App.tsx       Route definitions and protected route composition
db.json         JSON Server data
routes.json     JSON Server Auth route configuration
```

## Application Logic

1. A visitor registers or logs in; authentication state and token are persisted locally.
2. Protected routes check authentication before displaying application data.
3. The dashboard requests the signed-in user's jobs and computes the status totals.
4. Search, filter, and sort values are read from the URL; changing a control updates the corresponding query parameter.
5. Creating, editing, or deleting an application sends the matching API request, then refreshes the displayed data.
6. Selecting a job opens `/jobs/:id`; unmatched paths display the not-found page.

## Assignment Checklist

- [x] Six required page types and a not-found route
- [x] Job create, read, update, and delete operations
- [x] Search, status filters, and date sorting represented in the URL
- [x] Route parameters for individual job details and protected routes
- [x] Responsive styling with the requested 320, 480, 768, 1024, and 1200 px breakpoints
- [x] Form-required fields, loading feedback, and request error messages
- [ ] Run the app through the target screen sizes and test the main user flows before submission
- [ ] Push the final work to GitHub and open a pull request to the main branch with the mentor assigned
- [ ] Submit the task using the required submission form

The design file is linked above. Keep any separate planning, pseudocode, or algorithm artifacts with the project submission if they are required by the course; the application logic summary in this README is not a replacement for those deliverables.

## Verification

```bash
npm run lint
npm run build
```
