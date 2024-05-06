import apiRequest from "@/config/apiRequest";

export const addPatient = async (patient) => {
    const res = await apiRequest.post("/patients/add", patient);
    return res.data;
}
export const getPatients = async () =>{
    const patients = await apiRequest.get("/patients");
    return patients.data
}
export const getPatientById = async (id) => {
    const patient = await apiRequest.get(`/patients/${id}`);
    return patient.data;
}
export const updatePatient = async (patient, id) => {
    const res = await apiRequest.post(`/patients/update/${id}`, patient);
    return res.data;
}
export const deletePatientById = async (id) => {
    const patient = await apiRequest.delete(`/patients/${id}`);
    return patient.data;
}