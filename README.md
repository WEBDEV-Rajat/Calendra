# Interactive Wall Calendar

A modern React calendar experience with a wall-calendar aesthetic, smooth month transitions, range selection, notes integration, and theme persistence.

## Overview

This project is a Vite-powered React app that simulates an interactive wall calendar. Users can select date ranges by dragging, attach notes to selected ranges, upload a custom hero image per month, and switch between light/dark mode.

## Key Features

- **Drag-to-Select Date Range**: Click and drag from one date to another to select contiguous days.
- **Single-Day and Range Selection**: Clicking or dragging handles both single-day and multi-day selection.
- **Notes System**: Add notes for selected date ranges with categories: Work, Personal, Travel.
- **Note Markers**: Selected dates display small colored dots for note categories.
- **Hero Image Header**: Month-specific hero images with optional custom file upload and reset.
- **Theme Toggle**: Dark/light mode stored in `localStorage`.
- **Swipe and Keyboard Navigation**:
  - Swipe left/right on touch devices to change months.
  - Press `ArrowLeft`/`ArrowRight` to navigate.
- **Page Flip Animation**: Month changes animate with a 3D page-flip effect.
- **Responsive Layout**: Works across desktop and mobile screen sizes.

## Tech Stack

- React 19
- Vite
- Tailwind CSS v4
- Framer Motion

## Installation

```bash
npm install
npm run dev
```

Then open the development URL shown in the terminal (usually `http://localhost:5173`).

## Usage Guide

### Calendar Interaction

- Click and drag across dates to select a range.
- Click a single day to select it as one day.
- Use the month navigation buttons or keyboard arrows or swipe gestures to move between months.
- Click the month title to open the month/year picker.
- Click the "Back to today" button when viewing a different month.

### Notes

- Choose a category and add a note for the current selection.
- Search notes using the search input to filter across months.
- Delete notes using the ✕ button on each note.
- Notes are persisted in `localStorage`.

### Hero Image

- Upload a custom header image for the current month.
- Custom images are stored in `sessionStorage` and can be reset.
- Each month starts with a curated monthly image.

### Theme and Navigation

- Toggle dark/light mode using the button in the top-right.
- The UI remembers the selected theme between sessions.
- Swipe left/right on touch devices to change months.

## Project Structure

```text
src/
├── App.jsx
├── components/
│   ├── calendar/
│   │   ├── Calendar.jsx
│   │   ├── CalendarGrid.jsx
│   │   ├── DayCell.jsx
│   │   └── MonthHeader.jsx
│   ├── layout/
│   │   ├── HeroImage.jsx
│   │   └── InsightsPanel.jsx
│   └── notes/
│       └── NotesPanel.jsx
├── hooks/
│   └── useRangeSelection.js
└── tailwind.config.js
```

## Component Responsibilities

- `App.jsx`
  - Main page shell, theme handling, localStorage persistence, navigation state, top-level layout.
- `Calendar.jsx`
  - Calendar container, keyboard hints, range change callback.
- `CalendarGrid.jsx`
  - Renders weekday headers and the full matrix of day cells.
- `DayCell.jsx`
  - Handles selection state, today marker, note indicators, and cell styling.
- `MonthHeader.jsx`
  - Month title, previous/next navigation, year/month picker, today shortcut.
- `HeroImage.jsx`
  - Month-themed hero image, custom upload, reset, and error handling.
- `InsightsPanel.jsx`
  - Displays selected day count, note count, and selected range summary.
- `NotesPanel.jsx`
  - Note creation, filtering, list view, delete handling.
- `useRangeSelection.js`
  - Drag selection logic, hover tracking, range membership evaluation.

## Notes on Persistence

- Notes are saved in `localStorage`.
- Theme preference is saved in `localStorage`.
- Custom hero images are saved in `sessionStorage`.

## Development Commands

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run preview` — Preview production build
- `npm run lint` — Run ESLint
