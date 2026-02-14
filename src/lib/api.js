const BASE_URL = 'http://localhost:8000';

export const fetchPatients = async () => {
    const response = await fetch(`${BASE_URL}/patients`);
    if (!response.ok) throw new Error('Failed to fetch patients');
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
