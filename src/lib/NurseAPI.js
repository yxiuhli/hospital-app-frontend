import apiRequest from "@/config/apiRequest";

export const addNurse = async (nurse) => {
    const res = await apiRequest.post("/nurses/add", nurse);
    return res.data;
}
export const getNurses = async () =>{
    const nurses = await apiRequest.get("/nurses");
    return nurses.data
}
export const getNurseById = async (id) => {
    const nurse = await apiRequest.get(`/nurses/${id}`);
    return nurse.data;
}
export const updateNurse = async (nurse, id) => {
    const res = await apiRequest.post(`/nurses/update/${id}`, nurse);
    return res.data;
}
export const deleteNurseById = async (id) => {
    const nurse = await apiRequest.delete(`/nurses/${id}`);
    return nurse.data;
}