# Eco-Watch

Eco-Watch is an environmental telemetry and citizen incident reporting platform connecting citizens with municipal environmental protection authorities for rapid waterway monitoring, contamination triage, and statutory compliance.

## Project Architecture

- **`backend/`**: FastAPI REST API providing incident analysis endpoints and CORS middleware.
- **`frontend/`**: Modern React application powered by Vite, Tailwind CSS, and modular component architecture.

---

## Getting Started

### 1. Backend Setup (FastAPI)

1. Open a terminal and navigate to `backend/`:
   ```bash
   cd backend
   ```
2. Activate the virtual environment:
   - On Windows (PowerShell):
     ```powershell
     .\venv\Scripts\Activate.ps1
     ```
   - On Linux/macOS:
     ```bash
     source venv/bin/activate
     ```
3. Run the development server:
   ```bash
   uvicorn main:app --reload --port 8000
   ```
4. Verify the API is running at `http://localhost:8000/`.

---

### 2. Frontend Setup (React + Vite + Tailwind CSS)

1. Open a terminal and navigate to `frontend/`:
   ```bash
   cd frontend
   ```
2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open the frontend in your browser at `http://localhost:5173/`.

---

## Features

- **Citizen Public Reporting Portal (`LandingPage.jsx`)**:
  - Fast 3-step incident submission form (`IncidentForm.jsx`) with visual hazard cards, GPS auto-location, time selector, photo upload, and anonymity toggles.
  - Live API integration to `POST http://localhost:8000/api/analyze` sending `title` and `description`.
  - Instant dispatch tracking modal (`TrackingModal.jsx`) showing severity level, statutory rule broken, and response crew status.
  - Emergency SOS hotline, transparent 3-step guide (`HowItWorks.jsx`), and community transparency feed (`RecentAlerts.jsx`).

- **Authority Command Center (`Dashboard.jsx`)**:
  - EPA environmental triage command dashboard.
  - Multi-complaint feed with filters (Unassigned, Urgent, Under Investigation, Resolved) and search.
  - Complainant Dossier view with citizen profile, verbatim statement, EXIF geotagged evidence previews, and automated buoy cross-validation telemetry.
  - Action suite: Assign Field Crew, Containment Order, Statutory Case Linking, and SMS dispatch.
