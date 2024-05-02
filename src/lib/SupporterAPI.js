import apiRequest from "@/config/apiRequest";

export const addSupporter = async (supporter) => {
  const res = await apiRequest.post("/doctors/add", supporter);
  return res.data;
}

export const getSupporters = async () =>{
  const supporters = await apiRequest.get("/doctors");
  return supporters.data
}
export const getSupporterById = async (id) => {
  const supporter = await apiRequest.get(`/doctors/${id}`);
  return supporter.data;
}

export const updateSupporter = async (supporter, id) => {
  const res = await apiRequest.post(`/doctors/update/${id}`, supporter);
  return res.data;
}

export const deleteSupporterById = async (id) => {
  const supporter = await apiRequest.delete(`/doctors/${id}`);
  return supporter.data;
}