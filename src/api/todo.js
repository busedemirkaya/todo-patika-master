import axiosInstance from "./axios";

export async function getTodos() {
    const {data}= await axiosInstance.get('todos');
    return data;
}

export async function putTodos(data) {
    const response = axiosInstance.put('todos/'+data.id,data) 
    return response
}

export async function postTodos(data) {
    const response = await axiosInstance.post('todos/',data)  
    return response
}

export async function deleteTodos(data) {
    const response = await axiosInstance.delete('todos/'+data.id,data)  
    return response;
}