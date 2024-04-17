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
    console.log(doctors.data)
    return doctors.data
  }