import apiRequest from "@/config/apiRequest";

export const addEquipment = async (equipment) => {
  const res = await apiRequest.post("/doctors/add", equipment);
  return res.data;
}

export const getEquipments = async () =>{
  const equipments = [
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
    return equipments; 
}
export const getEquipmentById = async (id) => {
  const equipment = await apiRequest.get(`/doctors/${id}`);
  return equipment.data;
}

export const updateEquipment = async (equipment, id) => {
  const res = await apiRequest.post(`/doctors/update/${id}`, equipment);
  return res.data;
}

export const deleteEquipmentById = async (id) => {
  const equipment = await apiRequest.delete(`/doctors/${id}`);
  return equipment.data;
}