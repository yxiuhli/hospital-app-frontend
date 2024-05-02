import apiRequest from "@/config/apiRequest";

export const addNurse = async (nurse) => {
  const res = await apiRequest.post("/doctors/add", nurse);
  return res.data;
}

export const getNurses = async () =>{
  const nurses = await apiRequest.get("/doctors");
  return nurses.data
}
export const getNurseById = async (id) => {
  const nurse = await apiRequest.get(`/doctors/${id}`);
  return nurse.data;
}

export const updateNurse = async (nurse, id) => {
  const res = await apiRequest.post(`/doctors/update/${id}`, nurse);
  return res.data;
}

export const deleteNurseById = async (id) => {
  const nurse = await apiRequest.delete(`/doctors/${id}`);
  return nurse.data;
}