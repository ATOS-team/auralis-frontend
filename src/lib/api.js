const BASE_URL = 'http://127.0.0.1:5000';

export const fetchPatients = async () => {
    const response = await fetch(`${BASE_URL}/patients`);
    if (!response.ok) throw new Error('Failed to fetch patients');
    return response.json();
};

export const fetchPatientById = async (id) => {
    const response = await fetch(`${BASE_URL}/patients/${id}`);
    if (!response.ok) throw new Error('Failed to fetch patient details');
    return response.json();
};

export const fetchPatientVitals = async (id) => {
    const response = await fetch(`${BASE_URL}/patients/${id}/vitals`);
    if (!response.ok) throw new Error('Failed to fetch vitals');
    return response.json();
};

export const fetchPatientTimeline = async (id) => {
    const response = await fetch(`${BASE_URL}/patients/${id}/timeline`);
    if (!response.ok) throw new Error('Failed to fetch timeline');
    return response.json();
};
export const addPatient = async (patientData) => {
    const response = await fetch(`${BASE_URL}/patients`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patientData)
    });
    if (!response.ok) throw new Error('Failed to admit patient');
    return response.json();
};

export const updatePatient = async (id, patientData) => {
    const response = await fetch(`${BASE_URL}/patients/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patientData)
    });
    if (!response.ok) throw new Error('Failed to update patient');
    return response.json();
};

export const fetchDoctors = async () => {
    const response = await fetch(`${BASE_URL}/doctors`);
    if (!response.ok) throw new Error('Failed to fetch clinical staff');
    return response.json();
};

export const fetchDoctorById = async (id) => {
    const response = await fetch(`${BASE_URL}/doctors/${id}`);
    if (!response.ok) throw new Error('Failed to fetch doctor details');
    return response.json();
};
export const deletePatient = async (id) => {
    const response = await fetch(`${BASE_URL}/patients/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete patient');
    return response.json();
};

export const deleteDoctor = async (id) => {
    const response = await fetch(`${BASE_URL}/doctors/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete doctor');
    return response.json();
};

export const updateDoctor = async (id, doctorData) => {
    const response = await fetch(`${BASE_URL}/doctors/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(doctorData)
    });
    if (!response.ok) throw new Error('Failed to update doctor profile');
    return response.json();
};
