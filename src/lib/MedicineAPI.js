import apiRequest from "@/config/apiRequest";

export const addMedicine = async (medicine) => {
    const res = await apiRequest.post("/medicines/add", medicine);
    return res.data;
}
export const getMedicines = async () =>{
    const medicines = await apiRequest.get("/medicines");
    return medicines.data
}
export const getMedicineById = async (id) => {
    const medicine = await apiRequest.get(`/medicines/${id}`);
    return medicine.data;
}
export const updateMedicine = async (medicine, id) => {
    const res = await apiRequest.post(`/medicines/update/${id}`, medicine);
    return res.data;
}
export const deleteMedicineById = async (id) => {
    const medicine = await apiRequest.delete(`/medicines/${id}`);
    return medicine.data;
}