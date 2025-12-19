# CheatSheet - Backend

Flask + SQLAlchemy backend API for the CheatSheet snippet manager. Provides RESTful endpoints with session-based authentication, CRUD operations, and reference data endpoints.

> **Defensive note:** This README anticipates instructor questions about database choice, migrations, auth, and deployment.

## Installation

Use the package manager [pip](https://pip.pypa.io/en/stable/) to install the dependencies.

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Initialize database
flask db upgrade

# Seed with example data
python seed.py
```

## Usage
Running the Server

```bash
# Start Flask development server
python run.py

# Server runs on: http://localhost:5555
```
## Available Commands

```bash
flask db init       # Initialize migrations (first time only)
flask db migrate    # Create new migration
flask db upgrade    # Apply migrations
flask db downgrade  # Rollback last migration
python seed.py      # Seed database with example data

API Endpoints
Python
```

## Authentication
```bash
POST /api/signup          # Create account
POST /api/login           # Authenticate user
POST /api/logout          # End session
GET  /api/check_session   # Verify session
```

## Cheats
```bash
GET    /api/cheats        # List all cheats
POST   /api/cheats        # Create cheat
PATCH  /api/cheats/<id>   # Update cheat
DELETE /api/cheats/<id>   # Delete cheat
```

## Reference Data
```bash
GET /api/languages        # List languages
GET /api/categories       # List categories
```

## Key Concepts & Structure
> **Instructor Note**: The App Factory pattern is used to allow multiple apps with different configs (dev/test/prod). SQLite is used for dev/testing, while PostgreSQL is recommended for production.

```bash
server/
├── app/
│   ├── __init__.py          # App factory
│   ├── config.py            # Config (DB, sessions, secrets)
│   ├── extensions.py        # db, bcrypt, Marshmallow instances
│   ├── models.py            # User, Cheat, Language, Category
│   └── routes.py            # API endpoints
├── migrations/              # Alembic migration files
├── instance/                # SQLite database
└── run.py                   # Entry point
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate


## License
[MIT](https://choosealicense.com/licenses/mit/)

## Contact Me
emailjoshdicker@gmail.com
[GitHub/josdic1](https://github.com/josdic1/)

