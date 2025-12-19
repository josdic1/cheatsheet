# CheatSheet - Frontend

React frontend for the CheatSheet snippet manager. Features a custom retro Apple IIgs aesthetic, full CRUD interface, and responsive filtering.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install the dependencies.

```bash
# Install dependencies
npm install
```

> **Server runs on: http://localhost:5173**

## Key Features

- **Retro UI**: Custom "Apple IIgs" CSS system with CRT scanlines and phosphor glow.
- **Live Filtering**: Instant search by language, category, or keyword.
- **Routing**: Client-side routing with react-router-dom.
- **Auth Flow**: Login/Signup forms with defensive error handling.

## Available Scripts

### Command Description

```bash
npm run dev	Start the development server
npm run build	Build the app for production
npm run lint	Run ESLint to check for code issues
npm run preview	Preview the production build locally
```

## Project Structure

```bash
src/
├── components/      # Reusable UI components (FilterPanel, CheatItem)
├── hooks/           # Custom hooks (useAuth)
├── pages/           # Page views (HomePage, CheatPage, LoginPage)
├── App.jsx          # Main application component
├── main.jsx         # Entry point
└── index.css        # Global retro styles
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Contact Me

emailjoshdicker@gmail.com
[GitHub/josdic1](https://github.com/josdic1/)
