import apiRequest from "@/config/apiRequest";

export const addDevice = async (device) => {
    const res = await apiRequest.post("/devices/add", device);
    return res.data;
}
export const getDevices = async () =>{
    const devices = await apiRequest.get("/devices");
    return devices.data
}
export const getDeviceById = async (id) => {
    const device = await apiRequest.get(`/devices/${id}`);
    return device.data;
}
export const updateDevice = async (device, id) => {
    const res = await apiRequest.post(`/devices/update/${id}`, device);
    return res.data;
}
export const deleteDeviceById = async (id) => {
    const device = await apiRequest.delete(`/devices/${id}`);
    return device.data;
}