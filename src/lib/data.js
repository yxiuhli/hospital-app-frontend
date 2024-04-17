import apiRequest from "@/config/apiRequest";

export const getPatients = async () =>{
    const posts = await fetch("http://jsonplaceholder.typicode.com/users");
    return posts.json();
}

export const getEmployees = async () =>{
    const posts = await fetch("http://jsonplaceholder.typicode.com/users");
    return posts.json();
}

export const getDoctors = async () =>{
    const doctors = await apiRequest.get("/doctors");
    return doctors.data
}

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
    // const medicines = await fetch("");
    return medicines; 
}

export const getDoctor = async (id) => {
    const doctor = await apiRequest.get(`/doctors/${id}`);
    return doctor.data;
}