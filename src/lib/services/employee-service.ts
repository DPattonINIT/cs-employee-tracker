import { Employee } from "../interfaces/interfaces";

const baseURL = 'https://employee-student-api.azurewebsites.net/Employee/';


const getEmployees = async (token: string) => {

    const response = await fetch(`${baseURL}GetAllEmployees`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        cache: 'no-cache'
    });

    if(!response.ok) return 'Not Authorized';
    
    const data = await response.json();
    return data;
}

const addEmployee = async (token: string, employee: Employee) => {
    
    const response = await fetch(`${baseURL}AddEmployee`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(employee),
        cache: 'no-cache'
    });

    if (!response.ok) {
        const message = `An error has occurred ${response.status}`
        throw new Error(message);
    }
    return response;
}

const updateEmployee = async (token: string, employee: Employee) => {

    const response = await fetch(`${baseURL}UpdateEmployee`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(employee),
        cache: 'no-cache'
    });

    if (!response.ok) {
        const message = `An error has occurred ${response.status}`
        throw new Error(message);
    }
    return true;
}

const deleteEmployee = async (token: string, id: number) => {

    const response = await fetch(`${baseURL}DeleteEmployee/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
        cache: 'no-cache'
    });

    if (!response.ok) {
        const message = `An error has occurred ${response.status}`
        throw new Error(message);
    }
    return true;
}

const updateEmployeeDetails = async (token: string, employee: Employee) => {

    const response = await fetch(`${baseURL}UpdateEmployeeDetails`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(employee),
        cache: 'no-cache'
    });

    if (!response.ok) {
        const message = `An error has occurred ${response.status}`
        throw new Error(message);
    }
    return true;
}

const getEmployeeById = async (token: string, id: number) => {

    const response = await fetch(`${baseURL}GetEmployeeById/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        cache: 'no-cache'
    });

    if(!response.ok) return 'Not Authorized';
    
    const data = await response.json();
    console.log(data);
    return data;
}

export { getEmployees, addEmployee, updateEmployee, deleteEmployee, updateEmployeeDetails, getEmployeeById }