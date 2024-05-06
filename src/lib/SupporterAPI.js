import apiRequest from "@/config/apiRequest";

export const addSupporter = async (supportStaff) => {
    const res = await apiRequest.post("/supportStaffs/add", supportStaff);
    return res.data;
}
export const getSupporters = async () =>{
    const supportStaffs = await apiRequest.get("/supportStaffs");
    return supportStaffs.data
}
export const getSupporterById = async (id) => {
    const supportStaff = await apiRequest.get(`/supportStaffs/${id}`);
    return supportStaff.data;
}
export const updateSupporter = async (supportStaff, id) => {
    const res = await apiRequest.put(`/supportStaffs/update/${id}`, supportStaff);
    return res.data;
}
export const deleteSupporterById = async (id) => {
    const supportStaff = await apiRequest.delete(`/supportStaffs/${id}`);
    return supportStaff.data;
}