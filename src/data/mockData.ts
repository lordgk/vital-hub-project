
export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  bloodType: string;
  address: string;
  phone: string;
  email: string;
  status: 'active' | 'discharged' | 'waiting';
  registrationDate: string;
  medicalHistory: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  department: string;
  qualification: string;
  experience: number;
  email: string;
  phone: string;
  schedule: string[];
  image: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  type: string;
  notes: string;
}

export interface Department {
  id: string;
  name: string;
  head: string;
  description: string;
  staffCount: number;
}

export const patients: Patient[] = [
  {
    id: 'P001',
    name: 'John Doe',
    age: 45,
    gender: 'Male',
    bloodType: 'O+',
    address: '123 Main St, Springfield',
    phone: '(555) 123-4567',
    email: 'john.doe@example.com',
    status: 'active',
    registrationDate: '2023-03-15',
    medicalHistory: 'Hypertension, Diabetes Type 2'
  },
  {
    id: 'P002',
    name: 'Jane Smith',
    age: 32,
    gender: 'Female',
    bloodType: 'A-',
    address: '456 Oak Ave, Riverdale',
    phone: '(555) 987-6543',
    email: 'jane.smith@example.com',
    status: 'active',
    registrationDate: '2023-05-22',
    medicalHistory: 'Asthma, Allergies'
  },
  {
    id: 'P003',
    name: 'Robert Johnson',
    age: 68,
    gender: 'Male',
    bloodType: 'B+',
    address: '789 Pine Rd, Westville',
    phone: '(555) 456-7890',
    email: 'robert.j@example.com',
    status: 'discharged',
    registrationDate: '2022-11-03',
    medicalHistory: 'Coronary Heart Disease, Arthritis'
  },
  {
    id: 'P004',
    name: 'Emily Wilson',
    age: 28,
    gender: 'Female',
    bloodType: 'AB+',
    address: '321 Cedar Ln, Eastwood',
    phone: '(555) 789-0123',
    email: 'emily.w@example.com',
    status: 'waiting',
    registrationDate: '2023-06-18',
    medicalHistory: 'None'
  },
  {
    id: 'P005',
    name: 'Michael Brown',
    age: 52,
    gender: 'Male',
    bloodType: 'A+',
    address: '654 Maple Dr, Southbay',
    phone: '(555) 234-5678',
    email: 'michael.b@example.com',
    status: 'active',
    registrationDate: '2023-01-09',
    medicalHistory: 'Gastric Ulcer, Hypertension'
  }
];

export const doctors: Doctor[] = [
  {
    id: 'D001',
    name: 'Dr. Sarah Parker',
    specialty: 'Cardiology',
    department: 'Cardiac Care',
    qualification: 'MD, DM Cardiology',
    experience: 12,
    email: 'dr.parker@hospital.com',
    phone: '(555) 111-2233',
    schedule: ['Mon 9-5', 'Wed 9-5', 'Fri 9-1'],
    image: 'https://picsum.photos/id/177/200'
  },
  {
    id: 'D002',
    name: 'Dr. James Wilson',
    specialty: 'Neurology',
    department: 'Neurosciences',
    qualification: 'MD, DM Neurology',
    experience: 15,
    email: 'dr.wilson@hospital.com',
    phone: '(555) 222-3344',
    schedule: ['Tue 9-5', 'Thu 9-5', 'Sat 9-1'],
    image: 'https://picsum.photos/id/175/200'
  },
  {
    id: 'D003',
    name: 'Dr. Maria Rodriguez',
    specialty: 'Pediatrics',
    department: 'Child Care',
    qualification: 'MD, DCH',
    experience: 10,
    email: 'dr.rodriguez@hospital.com',
    phone: '(555) 333-4455',
    schedule: ['Mon 9-5', 'Tue 9-5', 'Thu 9-5'],
    image: 'https://picsum.photos/id/176/200'
  },
  {
    id: 'D004',
    name: 'Dr. Thomas Lee',
    specialty: 'Orthopedics',
    department: 'Orthopedic Surgery',
    qualification: 'MD, MS Ortho',
    experience: 18,
    email: 'dr.lee@hospital.com',
    phone: '(555) 444-5566',
    schedule: ['Wed 9-5', 'Fri 9-5', 'Sat 9-2'],
    image: 'https://picsum.photos/id/178/200'
  },
  {
    id: 'D005',
    name: 'Dr. Elizabeth Chen',
    specialty: 'Dermatology',
    department: 'Skin & VD',
    qualification: 'MD, DVD',
    experience: 8,
    email: 'dr.chen@hospital.com',
    phone: '(555) 555-6677',
    schedule: ['Mon 1-8', 'Thu 1-8', 'Sat 9-1'],
    image: 'https://picsum.photos/id/179/200'
  }
];

export const appointments: Appointment[] = [
  {
    id: 'A001',
    patientId: 'P001',
    patientName: 'John Doe',
    doctorId: 'D001',
    doctorName: 'Dr. Sarah Parker',
    date: '2023-07-20',
    time: '10:00 AM',
    status: 'completed',
    type: 'Check-up',
    notes: 'Patient reported chest pain. ECG normal. Suggested stress test.'
  },
  {
    id: 'A002',
    patientId: 'P002',
    patientName: 'Jane Smith',
    doctorId: 'D003',
    doctorName: 'Dr. Maria Rodriguez',
    date: '2023-07-21',
    time: '11:30 AM',
    status: 'scheduled',
    type: 'Follow-up',
    notes: 'Follow-up on asthma medication adjustment.'
  },
  {
    id: 'A003',
    patientId: 'P003',
    patientName: 'Robert Johnson',
    doctorId: 'D002',
    doctorName: 'Dr. James Wilson',
    date: '2023-07-19',
    time: '3:00 PM',
    status: 'completed',
    type: 'Consultation',
    notes: 'Discussed treatment options for chronic migraines.'
  },
  {
    id: 'A004',
    patientId: 'P004',
    patientName: 'Emily Wilson',
    doctorId: 'D005',
    doctorName: 'Dr. Elizabeth Chen',
    date: '2023-07-22',
    time: '2:15 PM',
    status: 'scheduled',
    type: 'New Patient',
    notes: 'Initial consultation for skin rash.'
  },
  {
    id: 'A005',
    patientId: 'P005',
    patientName: 'Michael Brown',
    doctorId: 'D004',
    doctorName: 'Dr. Thomas Lee',
    date: '2023-07-18',
    time: '9:30 AM',
    status: 'cancelled',
    type: 'Surgery Consult',
    notes: 'Pre-surgery consultation for knee replacement.'
  },
  {
    id: 'A006',
    patientId: 'P002',
    patientName: 'Jane Smith',
    doctorId: 'D001',
    doctorName: 'Dr. Sarah Parker',
    date: '2023-07-23',
    time: '10:45 AM',
    status: 'scheduled',
    type: 'Check-up',
    notes: 'Annual heart check-up.'
  }
];

export const departments: Department[] = [
  {
    id: 'DEPT001',
    name: 'Cardiology',
    head: 'Dr. Sarah Parker',
    description: 'Specialized care for heart-related conditions and diseases',
    staffCount: 15
  },
  {
    id: 'DEPT002',
    name: 'Neurology',
    head: 'Dr. James Wilson',
    description: 'Diagnosis and treatment of nervous system disorders',
    staffCount: 12
  },
  {
    id: 'DEPT003',
    name: 'Pediatrics',
    head: 'Dr. Maria Rodriguez',
    description: 'Medical care for infants, children, and adolescents',
    staffCount: 20
  },
  {
    id: 'DEPT004',
    name: 'Orthopedics',
    head: 'Dr. Thomas Lee',
    description: 'Treatment of musculoskeletal system conditions',
    staffCount: 18
  },
  {
    id: 'DEPT005',
    name: 'Dermatology',
    head: 'Dr. Elizabeth Chen',
    description: 'Care for skin, hair, nails, and related diseases',
    staffCount: 8
  }
];

export const dashboardStats = {
  totalPatients: 2546,
  activePatients: 1832,
  totalDoctors: 87,
  totalAppointments: 178,
  occupancyRate: 76,
  avgWaitTime: 24, // minutes
  revenue: 128500,
  expenseRatio: 0.68
};
