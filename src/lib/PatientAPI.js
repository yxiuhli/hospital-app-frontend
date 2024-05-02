import apiRequest from "@/config/apiRequest";

export const getPatients = async () =>{
    const patients = await apiRequest.get("/doctors");
    return patients.data
}
export const getPatientById = async (id) => {
    const patient = await apiRequest.get(`/doctors/${id}`);
    return patient.data;
}