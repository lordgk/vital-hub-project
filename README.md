
# VitalHub Hospital Management System (Python Version)

A hospital management system implemented in Python using Flask framework.

## Features

- Dashboard with key hospital metrics
- Patient management
- Doctor profiles
- Appointment scheduling
- Medical records
- Department information
- Analytics and reporting
- System settings

## Installation

1. Clone the repository:
```
git clone https://github.com/yourusername/vitalhub-python.git
cd vitalhub-python
```

2. Create and activate a virtual environment:
```
python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```
pip install flask
```

4. Run the application:
```
python app.py
```

5. Open your browser and navigate to:
```
http://localhost:5000
```

## Database

The application uses SQLite for the database. The database file `hospital.db` will be created automatically when you first run the application with sample data.

## Project Structure

- `app.py` - Main application file with Flask routes
- `templates/` - HTML templates
  - `base.html` - Base template with layout structure
  - Other template files for specific pages
- `hospital.db` - SQLite database file (created on first run)

## License

MIT License
