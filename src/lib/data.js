import apiRequest from "@/config/apiRequest";

export const getPatients = async () =>{
    const doctors = await apiRequest.get("/doctors");
    return doctors.data
}
export const getPatientById = async (id) => {
    const doctor = await apiRequest.get(`/doctors/${id}`);
    return doctor.data;
}

export const addDoctor = async (doctor) => {
    const res = await apiRequest.post("/doctors/add", doctor);
    return res.data;
}

export const getDoctors = async () =>{
    const doctors = await apiRequest.get("/doctors");
    return doctors.data
}
export const getDoctorById = async (id) => {
    const doctor = await apiRequest.get(`/doctors/${id}`);
    return doctor.data;
}

export const updateDoctor = async (doctor, id) => {
    const res = await apiRequest.post(`/doctors/update/${id}`, doctor);
    return res.data;
}

export const deleteDoctorById = async (id) => {
    const doctor = await apiRequest.delete(`/doctors/${id}`);
    return doctor.data;
}

export const getNurses = async () =>{
    const doctors = await apiRequest.get("/doctors");
    return doctors.data
}
export const getNurseById = async (id) => {
    const doctor = await apiRequest.get(`/doctors/${id}`);
    return doctor.data;
}

export const getSupporters = async () =>{
    const doctors = await apiRequest.get("/doctors");
    return doctors.data
}
export const getSupporterById = async (id) => {
    const doctor = await apiRequest.get(`/doctors/${id}`);
    return doctor.data;
}

export const getMedicines = async () =>{
    const medicines = [
        {
            id : 1,
            name : "Paracetamol",
            description: "any",
            quantity: 10,
            price: 1000
        },
        {
            id : 2,
            name : "Aspirin",
            description: "any",
            quantity: 20,
            price: 1000
        },
        {
            id : 3,
            name : "Ibuprofen",
            description: "any",
            quantity: 30,
            price: 1000
        },
        {
            id : 4,
            name : "Naproxen",
            description: "any",
            quantity: 40,
            price: 1000
        }
    ]
    return medicines; 
}