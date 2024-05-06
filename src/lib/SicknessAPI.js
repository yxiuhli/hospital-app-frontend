import apiRequest from "@/config/apiRequest";

export const addSickness = async (sickness) => {
    const res = await apiRequest.post("/sicknesses/add", sickness);
    return res.data;
}
export const getSicknesses = async () =>{
    const sicknesses = await apiRequest.get("/sicknesses");
    return sicknesses.data
}
export const getSicknessById = async (id) => {
    const sickness = await apiRequest.get(`/sicknesses/${id}`);
    return sickness.data;
}
export const updateSickness = async (sickness, id) => {
    const res = await apiRequest.put(`/sicknesses/update/${id}`, sickness);
    return res.data;
}
export const deleteSicknessById = async (id) => {
    const sickness = await apiRequest.delete(`/sicknesses/${id}`);
    return sickness.data;
}