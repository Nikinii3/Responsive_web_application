# Estate Agent — React SPA

A responsive single-page estate agent web application built with React and Vite. Users can search a portfolio of properties by type, price, bedrooms, location, and date added, view detailed property pages with an image gallery and map, and save/manage favourites via drag-and-drop.

Built for the **5COSC026W | Advanced Client-Side Web Development** coursework.

## Live Demo

[View the deployed app](----)

## Features

- **Property search** : a simple keyword search box plus a collapsible advanced filter panel (property type, min/max price, min/max bedrooms, date added range, postcode/location)
- **Results grid** : responsive card layout showing price, bedrooms, tenure, location, description, and date added for each property
- **Property detail page** : full-size image gallery, tabbed content (Description, Floor Plan, Location), and an embedded Google Map of the property's location
- **Favourites** : add properties to a favourites panel by clicking the heart icon or dragging a property card into the drop zone; remove items individually, drag them out, or clear all at once
- **Drag-and-drop** powered by `react-dnd`
- **Client-side routing** between the search page and individual property pages via `react-router-dom`
- **Unit tests** for the search/filter logic

## Tech Stack

| Purpose | Library |
|---|---|
| UI framework | React 19 |
| Build tool | Vite |
| Routing | React Router v7 |
| Drag and drop | react-dnd + react-dnd-html5-backend |
| Image gallery | react-image-gallery |
| Tabs | react-tabs |
| Form controls (dropdowns, number picker) | react-widgets |
| Linting | ESLint |
| Testing | Jest (with Babel for JSX/ESM transform) |

## Project Structure

```
estate-agent/
├── public/
│   └── Images/              # Property photos, grouped by property ID (prop1–prop7)
├── src/
│   ├── assets/               # Static assets (hero image, icons)
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── SearchForm.jsx        # Search box + advanced filters
│   │   ├── PropertyCard.jsx      # Draggable property summary card
│   │   └── FavouritesPanel.jsx   # Drop zone + favourites list
│   ├── context/
│   │   └── FavouritesContext.jsx # Global favourites state (add/remove/clear)
│   ├── data/
│   │   └── properties.json       # Property listings (7 sample properties)
│   ├── pages/
│   │   ├── SearchPage.jsx        # Search form + results grid + favourites sidebar
│   │   └── PropertyPage.jsx      # Full property detail view
│   ├── styles/
│   │   └── global.css
│   ├── tests/
│   │   └── searchUtils.test.js   # Jest tests for the filtering utilities
│   ├── utils/
│   │   └── searchUtils.js        # Filtering, searching, and price/date formatting helpers
│   ├── App.jsx                   # Route definitions
│   └── main.jsx                  # App entry point, providers (Router, DnD, Favourites)
├── index.html
├── package.json
└── vite.config.js
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended) and npm

### Installation

```bash
git clone https://github.com/Nikinii3/Responsive_web_application.git
cd Responsive_web_application/estate-agent
npm install
```

### Running the app

```bash
npm run dev
```

This starts the Vite dev server (with hot module reloading) — open the printed local URL (typically `http://localhost:5173`) in your browser.

### Building for production

```bash
npm run build
```

Output is generated in the `dist/` folder. Preview the production build locally with:

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

### Running tests

Unit tests for the search/filter utilities live in `src/tests/searchUtils.test.js` and use Jest with a Babel transform (`src/tests/babel.config.cjs`) for JSX/ESM support. To run them, install Jest and Babel's Jest support as dev dependencies:

```bash
npm install --save-dev jest babel-jest @babel/preset-env @babel/preset-react
npx jest
```

## How Search Works

Search logic lives in `src/utils/searchUtils.js` as small, composable filter functions (`filterByType`, `filterByPrice`, `filterByBedrooms`, `filterByDateAdded`, `filterByPostcode`), combined by `searchProperties`. This keeps the filtering logic independent of the UI and straightforward to unit test.

## Data

Property listings are stored as static JSON in `src/data/properties.json`, with each entry including type, price, bedrooms, tenure, location, description, date added, and paths to images/floor plan stored under `public/Images/<propertyId>/`. There's no backend, everything runs client-side.

## Notes

- Favourites are held in React state via `FavouritesContext` and reset on page reload (no persistence layer such as `localStorage` is currently implemented).
- The location map on the property page is a Google Maps iframe embed built from the property's location string.
