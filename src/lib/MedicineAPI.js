import apiRequest from "@/config/apiRequest";

export const getMedicines = async () =>{
  const medicines = [
      {
          id : 1,
          name : "Paracetamol",
          description: "any",
          quantity: 10,
          price: 1000
      },
      {
          id : 2,
          name : "Aspirin",
          description: "any",
          quantity: 20,
          price: 1000
      },
      {
          id : 3,
          name : "Ibuprofen",
          description: "any",
          quantity: 30,
          price: 1000
      },
      {
          id : 4,
          name : "Naproxen",
          description: "any",
          quantity: 40,
          price: 1000
      }
  ]
  return medicines; 
}

export const addMedicine = async (nurse) => {
  const res = await apiRequest.post("/doctors/add", nurse);
  return res.data;
}

export const getMedicineById = async (id) => {
  const nurse = await apiRequest.get(`/doctors/${id}`);
  return nurse.data;
}

export const updateMedicine = async (nurse, id) => {
  const res = await apiRequest.post(`/doctors/update/${id}`, nurse);
  return res.data;
}

export const deleteMedicineById = async (id) => {
  const nurse = await apiRequest.delete(`/doctors/${id}`);
  return nurse.data;
}