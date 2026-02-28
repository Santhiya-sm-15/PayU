import api from "../../../lib/axios";

export const login = async (data: {email: string, password: string}) => {
    const response = await api.put("/users/login",data,{withCredentials:true})
    return response.data;
}

export const logout = async () => {
    const response = await api.put("/users/logout",{},{withCredentials:true});
    return response.data;
}

export const getProfile = async () => {
    const response = await api.get("/users/profile",{withCredentials:true});
    return response.data;
}