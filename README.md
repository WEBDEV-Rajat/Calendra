# Interactive Wall Calendar

A modern React calendar experience with a wall-calendar aesthetic, smooth month transitions, range selection, notes integration, and theme persistence.

## Overview

This project is a Vite-powered React app that simulates an interactive wall calendar. Users can select dates and ranges, attach notes, upload custom hero images, swipe between months on touch devices, and persist preferences between sessions.

## Key Features

- **Tap & Range Selection**: Tap a start date and tap an end date to select a range.
- **Mobile-friendly swipe navigation**: Swipe left/right on mobile and tablet to change months.
- **Notes System**: Add notes for selected date ranges with categories: Work, Personal, Travel.
- **Note Markers**: Dates show colored dots for associated note categories.
- **Hero Image Header**: Month-themed hero images with optional custom upload and reset.
- **Theme Toggle**: Dark/light mode is stored in `localStorage`.
- **Keyboard Navigation**: Use `ArrowLeft` / `ArrowRight` to navigate months.
- **Page Flip Animation**: Month transitions animate with a polished 3D page-flip effect.
- **Responsive UI**: Designed for desktop, mobile, and tablet screens.

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

- Tap a date once to set the start of a selection.
- Tap a second date to complete the range.
- Use the month navigation buttons, keyboard arrows, or swipe left/right on mobile/tablet to move between months.
- Tap the month title to open the month/year picker.

### Notes

- Select a category and add a note for the current selection.
- Search notes using the search input.
- Delete notes with the ✕ button.
- Notes persist in `localStorage`.

### Hero Image

- Upload a custom hero image for the current month.
- Reset to the default monthly image if needed.
- Custom uploads are stored in `sessionStorage` for the browser session.

### Theme and Navigation

- Toggle dark/light mode using the top-right button.
- The app remembers the selected theme between visits.
- Swipe left/right to change months on touch devices.

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
  - Top-level layout, theme handling, persistence, month state, and app shell.
- `Calendar.jsx`
  - Calendar wrapper, selection messaging, and range callback handling.
- `CalendarGrid.jsx`
  - Renders weekdays and the grid of day cells.
- `DayCell.jsx`
  - Handles date selection state, note indicators, and cell styling.
- `MonthHeader.jsx`
  - Month navigation, picker toggle, and title display.
- `HeroImage.jsx`
  - Displays month-specific hero art, custom uploads, and reset.
- `InsightsPanel.jsx`
  - Shows selected day count, note count, and range summary.
- `NotesPanel.jsx`
  - Handles note creation, filtering, display, and deletion.
- `useRangeSelection.js`
  - Selects date ranges and evaluates whether days are inside the current range.

## Persistence

- Notes are saved in `localStorage`.
- Theme preference is saved in `localStorage`.
- Custom hero images are saved in `sessionStorage`.

## Development Commands

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run preview` — Preview production build
- `npm run lint` — Run ESLint

## Deployment

### Deploy to Vercel

1. Connect your repository to Vercel.
2. Set the framework preset to Vite.
3. Use `npm run build` as the build command and `dist` as the output directory.

### Local Production Preview

```bash
npm run build
npm run preview
```

Open the URL shown by `vite preview` to verify the production build locally.
