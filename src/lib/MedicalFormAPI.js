import apiRequest from "@/config/apiRequest";

export const addMedicalForm = async (medicalForm) => {
    const res = await apiRequest.post("/medicalForms/add", medicalForm);
    return res.data;
}
export const getMedicalForms = async () =>{
    const medicalForms = await apiRequest.get("/medicalForms");
    return medicalForms.data
}
export const getMedicalFormById = async (id) => {
    const medicalForm = await apiRequest.get(`/medicalForms/${id}`);
    return medicalForm.data;
}
export const updateMedicalForm = async (medicalForm, id) => {
    const res = await apiRequest.put(`/medicalForms/update/${id}`, medicalForm);
    return res.data;
}
export const deleteMedicalFormById = async (id) => {
    const medicalForm = await apiRequest.delete(`/medicalForms/${id}`);
    return medicalForm.data;
}