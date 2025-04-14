
from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
import sqlite3
import os
from datetime import datetime

app = Flask(__name__)
app.secret_key = "vitalhub_secret_key"

# Database initialization
def init_db():
    if not os.path.exists('hospital.db'):
        conn = sqlite3.connect('hospital.db')
        cursor = conn.cursor()
        
        # Create patients table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS patients (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                age INTEGER,
                gender TEXT,
                blood_type TEXT,
                address TEXT,
                phone TEXT,
                email TEXT,
                status TEXT,
                registration_date TEXT,
                medical_history TEXT
            )
        ''')
        
        # Create doctors table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS doctors (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                specialty TEXT,
                department TEXT,
                qualification TEXT,
                experience INTEGER,
                email TEXT,
                phone TEXT,
                schedule TEXT,
                image TEXT
            )
        ''')
        
        # Create appointments table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS appointments (
                id TEXT PRIMARY KEY,
                patient_id TEXT,
                patient_name TEXT,
                doctor_id TEXT,
                doctor_name TEXT,
                date TEXT,
                time TEXT,
                status TEXT,
                type TEXT,
                notes TEXT,
                FOREIGN KEY (patient_id) REFERENCES patients (id),
                FOREIGN KEY (doctor_id) REFERENCES doctors (id)
            )
        ''')
        
        # Create departments table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS departments (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                head TEXT,
                description TEXT,
                staff_count INTEGER
            )
        ''')
        
        # Create medical records table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS medical_records (
                id TEXT PRIMARY KEY,
                patient_id TEXT,
                patient_name TEXT,
                record_type TEXT,
                date TEXT,
                department TEXT,
                doctor TEXT,
                status TEXT,
                FOREIGN KEY (patient_id) REFERENCES patients (id)
            )
        ''')
        
        # Insert sample data
        insert_sample_data(conn)
        
        conn.commit()
        conn.close()

def insert_sample_data(conn):
    cursor = conn.cursor()
    
    # Sample patients
    patients = [
        ("P001", "John Doe", 45, "Male", "O+", "123 Main St, Springfield", "(555) 123-4567", "john.doe@example.com", "active", "2023-03-15", "Hypertension, Diabetes Type 2"),
        ("P002", "Jane Smith", 32, "Female", "A-", "456 Oak Ave, Riverdale", "(555) 987-6543", "jane.smith@example.com", "active", "2023-05-22", "Asthma, Allergies"),
        ("P003", "Robert Johnson", 68, "Male", "B+", "789 Pine Rd, Westville", "(555) 456-7890", "robert.j@example.com", "discharged", "2022-11-03", "Coronary Heart Disease, Arthritis"),
        ("P004", "Emily Wilson", 28, "Female", "AB+", "321 Cedar Ln, Eastwood", "(555) 789-0123", "emily.w@example.com", "waiting", "2023-06-18", "None"),
        ("P005", "Michael Brown", 52, "Male", "A+", "654 Maple Dr, Southbay", "(555) 234-5678", "michael.b@example.com", "active", "2023-01-09", "Gastric Ulcer, Hypertension")
    ]
    
    cursor.executemany("INSERT OR REPLACE INTO patients VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", patients)
    
    # Sample doctors
    doctors = [
        ("D001", "Dr. Sarah Parker", "Cardiology", "Cardiac Care", "MD, DM Cardiology", 12, "dr.parker@hospital.com", "(555) 111-2233", "Mon 9-5, Wed 9-5, Fri 9-1", "https://picsum.photos/id/177/200"),
        ("D002", "Dr. James Wilson", "Neurology", "Neurosciences", "MD, DM Neurology", 15, "dr.wilson@hospital.com", "(555) 222-3344", "Tue 9-5, Thu 9-5, Sat 9-1", "https://picsum.photos/id/175/200"),
        ("D003", "Dr. Maria Rodriguez", "Pediatrics", "Child Care", "MD, DCH", 10, "dr.rodriguez@hospital.com", "(555) 333-4455", "Mon 9-5, Tue 9-5, Thu 9-5", "https://picsum.photos/id/176/200"),
        ("D004", "Dr. Thomas Lee", "Orthopedics", "Orthopedic Surgery", "MD, MS Ortho", 18, "dr.lee@hospital.com", "(555) 444-5566", "Wed 9-5, Fri 9-5, Sat 9-2", "https://picsum.photos/id/178/200"),
        ("D005", "Dr. Elizabeth Chen", "Dermatology", "Skin & VD", "MD, DVD", 8, "dr.chen@hospital.com", "(555) 555-6677", "Mon 1-8, Thu 1-8, Sat 9-1", "https://picsum.photos/id/179/200")
    ]
    
    cursor.executemany("INSERT OR REPLACE INTO doctors VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", doctors)
    
    # Sample appointments
    appointments = [
        ("A001", "P001", "John Doe", "D001", "Dr. Sarah Parker", "2023-07-20", "10:00 AM", "completed", "Check-up", "Patient reported chest pain. ECG normal. Suggested stress test."),
        ("A002", "P002", "Jane Smith", "D003", "Dr. Maria Rodriguez", "2023-07-21", "11:30 AM", "scheduled", "Follow-up", "Follow-up on asthma medication adjustment."),
        ("A003", "P003", "Robert Johnson", "D002", "Dr. James Wilson", "2023-07-19", "3:00 PM", "completed", "Consultation", "Discussed treatment options for chronic migraines."),
        ("A004", "P004", "Emily Wilson", "D005", "Dr. Elizabeth Chen", "2023-07-22", "2:15 PM", "scheduled", "New Patient", "Initial consultation for skin rash."),
        ("A005", "P005", "Michael Brown", "D004", "Dr. Thomas Lee", "2023-07-18", "9:30 AM", "cancelled", "Surgery Consult", "Pre-surgery consultation for knee replacement."),
        ("A006", "P002", "Jane Smith", "D001", "Dr. Sarah Parker", "2023-07-23", "10:45 AM", "scheduled", "Check-up", "Annual heart check-up.")
    ]
    
    cursor.executemany("INSERT OR REPLACE INTO appointments VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", appointments)
    
    # Sample departments
    departments = [
        ("DEPT001", "Cardiology", "Dr. Sarah Parker", "Specialized care for heart-related conditions and diseases", 15),
        ("DEPT002", "Neurology", "Dr. James Wilson", "Diagnosis and treatment of nervous system disorders", 12),
        ("DEPT003", "Pediatrics", "Dr. Maria Rodriguez", "Medical care for infants, children, and adolescents", 20),
        ("DEPT004", "Orthopedics", "Dr. Thomas Lee", "Treatment of musculoskeletal system conditions", 18),
        ("DEPT005", "Dermatology", "Dr. Elizabeth Chen", "Care for skin, hair, nails, and related diseases", 8)
    ]
    
    cursor.executemany("INSERT OR REPLACE INTO departments VALUES (?, ?, ?, ?, ?)", departments)
    
    # Sample medical records
    medical_records = [
        ("MR001", "P001", "John Doe", "Lab Results", "2023-07-15", "Cardiology", "Dr. Sarah Parker", "complete"),
        ("MR002", "P002", "Jane Smith", "X-Ray", "2023-07-12", "Orthopedics", "Dr. Thomas Lee", "pending"),
        ("MR003", "P003", "Robert Johnson", "Prescription", "2023-07-10", "Neurology", "Dr. James Wilson", "complete"),
        ("MR004", "P004", "Emily Wilson", "MRI Scan", "2023-07-08", "Neurology", "Dr. James Wilson", "complete"),
        ("MR005", "P005", "Michael Brown", "Blood Test", "2023-07-05", "Cardiology", "Dr. Sarah Parker", "complete"),
        ("MR006", "P001", "John Doe", "ECG", "2023-06-30", "Cardiology", "Dr. Sarah Parker", "complete"),
        ("MR007", "P002", "Jane Smith", "Allergy Test", "2023-06-28", "Dermatology", "Dr. Elizabeth Chen", "pending")
    ]
    
    cursor.executemany("INSERT OR REPLACE INTO medical_records VALUES (?, ?, ?, ?, ?, ?, ?, ?)", medical_records)

# Routes
@app.route('/')
def index():
    # Dashboard summary data
    conn = sqlite3.connect('hospital.db')
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    # Get counts
    cursor.execute("SELECT COUNT(*) FROM patients")
    total_patients = cursor.fetchone()[0]
    
    cursor.execute("SELECT COUNT(*) FROM patients WHERE status='active'")
    active_patients = cursor.fetchone()[0]
    
    cursor.execute("SELECT COUNT(*) FROM doctors")
    total_doctors = cursor.fetchone()[0]
    
    cursor.execute("SELECT COUNT(*) FROM appointments")
    total_appointments = cursor.fetchone()[0]
    
    # Get recent appointments
    cursor.execute("""
        SELECT * FROM appointments 
        ORDER BY date DESC, time DESC
        LIMIT 5
    """)
    recent_appointments = [dict(row) for row in cursor.fetchall()]
    
    conn.close()
    
    return render_template('index.html', 
                          total_patients=total_patients,
                          active_patients=active_patients,
                          total_doctors=total_doctors,
                          total_appointments=total_appointments,
                          recent_appointments=recent_appointments)

@app.route('/patients')
def patients():
    conn = sqlite3.connect('hospital.db')
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    cursor.execute("SELECT * FROM patients ORDER BY name")
    patients_data = [dict(row) for row in cursor.fetchall()]
    
    conn.close()
    
    return render_template('patients.html', patients=patients_data)

@app.route('/create_patient', methods=['GET', 'POST'])
def create_patient():
    if request.method == 'POST':
        # Generate a new patient ID
        conn = sqlite3.connect('hospital.db')
        cursor = conn.cursor()
        cursor.execute("SELECT COUNT(*) FROM patients")
        count = cursor.fetchone()[0] + 1
        patient_id = f"P{count:03d}"
        
        # Get form data
        name = request.form['name']
        age = request.form['age']
        gender = request.form['gender']
        blood_type = request.form['blood_type']
        address = request.form['address']
        phone = request.form['phone']
        email = request.form['email']
        status = request.form['status']
        medical_history = request.form['medical_history']
        
        # Current date for registration
        registration_date = datetime.now().strftime("%Y-%m-%d")
        
        # Insert new patient
        cursor.execute("""
            INSERT INTO patients 
            (id, name, age, gender, blood_type, address, phone, email, status, registration_date, medical_history)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            patient_id,
            name,
            age,
            gender,
            blood_type,
            address,
            phone,
            email,
            status,
            registration_date,
            medical_history
        ))
        
        conn.commit()
        conn.close()
        
        flash('Patient registered successfully!', 'success')
        return redirect(url_for('patients'))
    
    # GET request - prepare for new patient form
    conn = sqlite3.connect('hospital.db')
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*) FROM patients")
    count = cursor.fetchone()[0] + 1
    new_id = f"P{count:03d}"
    conn.close()
    
    return render_template('create_patient.html', new_id=new_id)

@app.route('/patient/<patient_id>')
def patient_details(patient_id):
    conn = sqlite3.connect('hospital.db')
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    # Get patient details
    cursor.execute("SELECT * FROM patients WHERE id = ?", (patient_id,))
    patient = dict(cursor.fetchone())
    
    # Get patient appointments
    cursor.execute("""
        SELECT * FROM appointments 
        WHERE patient_id = ? 
        ORDER BY date DESC, time DESC
    """, (patient_id,))
    appointments = [dict(row) for row in cursor.fetchall()]
    
    # Get patient medical records
    cursor.execute("""
        SELECT * FROM medical_records 
        WHERE patient_id = ? 
        ORDER BY date DESC
    """, (patient_id,))
    records = [dict(row) for row in cursor.fetchall()]
    
    conn.close()
    
    return render_template('patient_details.html', 
                          patient=patient,
                          appointments=appointments,
                          records=records)

@app.route('/edit_patient/<patient_id>', methods=['GET', 'POST'])
def edit_patient(patient_id):
    conn = sqlite3.connect('hospital.db')
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    if request.method == 'POST':
        # Update patient information
        cursor.execute("""
            UPDATE patients 
            SET name = ?, age = ?, gender = ?, blood_type = ?, 
                address = ?, phone = ?, email = ?, status = ?, medical_history = ?
            WHERE id = ?
        """, (
            request.form['name'],
            request.form['age'],
            request.form['gender'],
            request.form['blood_type'],
            request.form['address'],
            request.form['phone'],
            request.form['email'],
            request.form['status'],
            request.form['medical_history'],
            patient_id
        ))
        
        conn.commit()
        conn.close()
        
        flash('Patient information updated successfully!', 'success')
        return redirect(url_for('patient_details', patient_id=patient_id))
    
    # Get patient details for the form
    cursor.execute("SELECT * FROM patients WHERE id = ?", (patient_id,))
    patient = dict(cursor.fetchone())
    
    conn.close()
    
    return render_template('edit_patient.html', patient=patient)

@app.route('/doctors')
def doctors():
    conn = sqlite3.connect('hospital.db')
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    cursor.execute("SELECT * FROM doctors ORDER BY name")
    doctors_data = [dict(row) for row in cursor.fetchall()]
    
    conn.close()
    
    return render_template('doctors.html', doctors=doctors_data)

@app.route('/create_doctor', methods=['GET', 'POST'])
def create_doctor():
    if request.method == 'POST':
        # Generate a new doctor ID
        conn = sqlite3.connect('hospital.db')
        cursor = conn.cursor()
        cursor.execute("SELECT COUNT(*) FROM doctors")
        count = cursor.fetchone()[0] + 1
        doctor_id = f"D{count:03d}"
        
        # Insert new doctor
        cursor.execute("""
            INSERT INTO doctors 
            (id, name, specialty, department, qualification, experience, email, phone, schedule, image)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            doctor_id,
            request.form['name'],
            request.form['specialty'],
            request.form['department'],
            request.form['qualification'],
            request.form['experience'],
            request.form['email'],
            request.form['phone'],
            request.form['schedule'],
            request.form['image']
        ))
        
        conn.commit()
        conn.close()
        
        flash('Doctor registered successfully!', 'success')
        return redirect(url_for('doctors'))
    
    # GET request - prepare for new doctor form
    conn = sqlite3.connect('hospital.db')
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*) FROM doctors")
    count = cursor.fetchone()[0] + 1
    new_id = f"D{count:03d}"
    conn.close()
    
    return render_template('create_doctor.html', new_id=new_id)

@app.route('/doctor/<doctor_id>')
def doctor_details(doctor_id):
    conn = sqlite3.connect('hospital.db')
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    # Get doctor details
    cursor.execute("SELECT * FROM doctors WHERE id = ?", (doctor_id,))
    doctor = dict(cursor.fetchone())
    
    # Get doctor's appointments
    cursor.execute("""
        SELECT * FROM appointments 
        WHERE doctor_id = ? 
        ORDER BY date, time
    """, (doctor_id,))
    appointments = [dict(row) for row in cursor.fetchall()]
    
    conn.close()
    
    return render_template('doctor_details.html', doctor=doctor, appointments=appointments)

@app.route('/edit_doctor/<doctor_id>', methods=['GET', 'POST'])
def edit_doctor(doctor_id):
    conn = sqlite3.connect('hospital.db')
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    if request.method == 'POST':
        # Update doctor information
        cursor.execute("""
            UPDATE doctors 
            SET name = ?, specialty = ?, department = ?, qualification = ?,
                experience = ?, email = ?, phone = ?, schedule = ?, image = ?
            WHERE id = ?
        """, (
            request.form['name'],
            request.form['specialty'],
            request.form['department'],
            request.form['qualification'],
            request.form['experience'],
            request.form['email'],
            request.form['phone'],
            request.form['schedule'],
            request.form['image'],
            doctor_id
        ))
        
        conn.commit()
        conn.close()
        
        flash('Doctor information updated successfully!', 'success')
        return redirect(url_for('doctor_details', doctor_id=doctor_id))
    
    # Get doctor details for the form
    cursor.execute("SELECT * FROM doctors WHERE id = ?", (doctor_id,))
    doctor = dict(cursor.fetchone())
    
    conn.close()
    
    return render_template('edit_doctor.html', doctor=doctor)

@app.route('/appointments')
def appointments():
    conn = sqlite3.connect('hospital.db')
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    cursor.execute("SELECT * FROM appointments ORDER BY date, time")
    appointments_data = [dict(row) for row in cursor.fetchall()]
    
    conn.close()
    
    return render_template('appointments.html', appointments=appointments_data)

@app.route('/appointments/create', methods=['GET', 'POST'])
def create_appointment():
    if request.method == 'POST':
        # Generate a new appointment ID
        conn = sqlite3.connect('hospital.db')
        cursor = conn.cursor()
        cursor.execute("SELECT COUNT(*) FROM appointments")
        count = cursor.fetchone()[0] + 1
        appointment_id = f"A{count:03d}"
        
        # Get form data
        patient_id = request.form['patient_id']
        doctor_id = request.form['doctor_id']
        
        # Get patient name
        cursor.execute("SELECT name FROM patients WHERE id = ?", (patient_id,))
        patient_name = cursor.fetchone()[0]
        
        # Get doctor name
        cursor.execute("SELECT name FROM doctors WHERE id = ?", (doctor_id,))
        doctor_name = cursor.fetchone()[0]
        
        # Insert new appointment
        cursor.execute("""
            INSERT INTO appointments 
            (id, patient_id, patient_name, doctor_id, doctor_name, date, time, status, type, notes)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            appointment_id,
            patient_id,
            patient_name,
            doctor_id,
            doctor_name,
            request.form['date'],
            request.form['time'],
            'scheduled',
            request.form['type'],
            request.form['notes']
        ))
        
        conn.commit()
        conn.close()
        
        flash('Appointment created successfully!', 'success')
        return redirect(url_for('appointments'))
    
    # GET request - render the form
    conn = sqlite3.connect('hospital.db')
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    # Get patients for dropdown
    cursor.execute("SELECT id, name FROM patients ORDER BY name")
    patients = [dict(row) for row in cursor.fetchall()]
    
    # Get doctors for dropdown
    cursor.execute("SELECT id, name, specialty FROM doctors ORDER BY name")
    doctors = [dict(row) for row in cursor.fetchall()]
    
    # Pre-select patient or doctor if provided in query params
    preselected_patient = request.args.get('patient_id')
    preselected_doctor = request.args.get('doctor_id')
    
    conn.close()
    
    return render_template('create_appointment.html', 
                          patients=patients, 
                          doctors=doctors,
                          preselected_patient=preselected_patient,
                          preselected_doctor=preselected_doctor)

@app.route('/appointment/<appointment_id>')
def appointment_details(appointment_id):
    conn = sqlite3.connect('hospital.db')
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    # Get appointment details
    cursor.execute("SELECT * FROM appointments WHERE id = ?", (appointment_id,))
    appointment = dict(cursor.fetchone())
    
    conn.close()
    
    return render_template('appointment_details.html', appointment=appointment)

@app.route('/appointment/<appointment_id>/status/<status>', methods=['POST'])
def update_appointment_status(appointment_id, status):
    conn = sqlite3.connect('hospital.db')
    cursor = conn.cursor()
    
    # Update appointment status
    cursor.execute("UPDATE appointments SET status = ? WHERE id = ?", (status, appointment_id))
    
    conn.commit()
    conn.close()
    
    flash(f'Appointment has been marked as {status}!', 'success')
    return redirect(url_for('appointment_details', appointment_id=appointment_id))

@app.route('/edit_appointment/<appointment_id>', methods=['GET', 'POST'])
def edit_appointment(appointment_id):
    conn = sqlite3.connect('hospital.db')
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    if request.method == 'POST':
        # Update appointment information
        patient_id = request.form['patient_id']
        doctor_id = request.form['doctor_id']
        
        # Get patient name
        cursor.execute("SELECT name FROM patients WHERE id = ?", (patient_id,))
        patient_name = cursor.fetchone()[0]
        
        # Get doctor name
        cursor.execute("SELECT name FROM doctors WHERE id = ?", (doctor_id,))
        doctor_name = cursor.fetchone()[0]
        
        cursor.execute("""
            UPDATE appointments 
            SET patient_id = ?, patient_name = ?, doctor_id = ?, doctor_name = ?,
                date = ?, time = ?, type = ?, notes = ?
            WHERE id = ?
        """, (
            patient_id,
            patient_name,
            doctor_id,
            doctor_name,
            request.form['date'],
            request.form['time'],
            request.form['type'],
            request.form['notes'],
            appointment_id
        ))
        
        conn.commit()
        conn.close()
        
        flash('Appointment updated successfully!', 'success')
        return redirect(url_for('appointment_details', appointment_id=appointment_id))
    
    # Get appointment details for the form
    cursor.execute("SELECT * FROM appointments WHERE id = ?", (appointment_id,))
    appointment = dict(cursor.fetchone())
    
    # Get patients for dropdown
    cursor.execute("SELECT id, name FROM patients ORDER BY name")
    patients = [dict(row) for row in cursor.fetchall()]
    
    # Get doctors for dropdown
    cursor.execute("SELECT id, name, specialty FROM doctors ORDER BY name")
    doctors = [dict(row) for row in cursor.fetchall()]
    
    conn.close()
    
    return render_template('edit_appointment.html', 
                          appointment=appointment,
                          patients=patients,
                          doctors=doctors)

@app.route('/departments')
def departments():
    conn = sqlite3.connect('hospital.db')
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    cursor.execute("SELECT * FROM departments ORDER BY name")
    departments_data = [dict(row) for row in cursor.fetchall()]
    
    conn.close()
    
    return render_template('departments.html', departments=departments_data)

@app.route('/department/<department_id>')
def department_details(department_id):
    conn = sqlite3.connect('hospital.db')
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    # Get department details
    cursor.execute("SELECT * FROM departments WHERE id = ?", (department_id,))
    department = dict(cursor.fetchone())
    
    # Get doctors in this department
    cursor.execute("SELECT * FROM doctors WHERE department = ?", (department['name'],))
    doctors = [dict(row) for row in cursor.fetchall()]
    
    # For this example, we'll create mock department activities
    activities = [
        {"date": "2023-07-20", "title": "Department Meeting", "description": "Monthly staff meeting to discuss patient care protocols."},
        {"date": "2023-07-15", "title": "New Equipment", "description": f"New diagnostic equipment installed in the {department['name']} department."},
        {"date": "2023-07-10", "title": "Staff Training", "description": "Training session on new treatment methods for department staff."}
    ]
    
    conn.close()
    
    return render_template('department_details.html', 
                          department=department,
                          doctors=doctors,
                          activities=activities)

@app.route('/records')
def records():
    conn = sqlite3.connect('hospital.db')
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    # Get query parameter for search/filter
    search_query = request.args.get('search', '')
    record_type = request.args.get('type', 'all')
    patient_id = request.args.get('patient_id', '')
    
    # Build the SQL query based on filters
    sql = "SELECT * FROM medical_records WHERE 1=1"
    params = []
    
    if search_query:
        sql += " AND (patient_name LIKE ? OR doctor LIKE ? OR department LIKE ?)"
        query_param = f"%{search_query}%"
        params.extend([query_param, query_param, query_param])
    
    if record_type != 'all':
        sql += " AND record_type = ?"
        params.append(record_type)
        
    if patient_id:
        sql += " AND patient_id = ?"
        params.append(patient_id)
    
    sql += " ORDER BY date DESC"
    
    # Execute the query
    cursor.execute(sql, params)
    records_data = [dict(row) for row in cursor.fetchall()]
    
    conn.close()
    
    return render_template('records.html', records=records_data, search_query=search_query, record_type=record_type)

@app.route('/analytics')
def analytics():
    conn = sqlite3.connect('hospital.db')
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    # Get appointments by status
    cursor.execute("""
        SELECT status, COUNT(*) as count 
        FROM appointments 
        GROUP BY status
    """)
    appointment_stats = [dict(row) for row in cursor.fetchall()]
    
    # Get patient counts by gender
    cursor.execute("""
        SELECT gender, COUNT(*) as count 
        FROM patients 
        GROUP BY gender
    """)
    gender_stats = [dict(row) for row in cursor.fetchall()]
    
    # Get doctors by department
    cursor.execute("""
        SELECT department, COUNT(*) as count 
        FROM doctors 
        GROUP BY department
    """)
    department_stats = [dict(row) for row in cursor.fetchall()]
    
    conn.close()
    
    return render_template('analytics.html', 
                          appointment_stats=appointment_stats,
                          gender_stats=gender_stats,
                          department_stats=department_stats)

@app.route('/settings')
def settings():
    return render_template('settings.html')

@app.errorhandler(404)
def not_found(e):
    return render_template('404.html'), 404

if __name__ == '__main__':
    init_db()
    app.run(debug=True)
