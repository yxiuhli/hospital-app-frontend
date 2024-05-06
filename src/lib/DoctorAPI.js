import apiRequest from "@/config/apiRequest";

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
    const res = await apiRequest.put(`/doctors/update/${id}`, doctor);
    return res.data;
}
export const deleteDoctorById = async (id) => {
    const doctor = await apiRequest.delete(`/doctors/${id}`);
    return doctor.data;
}