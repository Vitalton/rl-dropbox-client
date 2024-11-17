import {create} from "zustand";
import {persist} from "zustand/middleware";
import axios from "@/api/axios";

export const useUser = create(
    persist(
        (set, get) => ({
            isAuth: false,
            user: null,
            token: null,
            setUser: (value) => set({user: value}),
            setIsAuth: (value) => set({isAuth: value}),
            logout: () => {
                set({isAuth: false, user: null, token: null})
                localStorage.removeItem("user-storage")
            },
            register: async (formData) => {
                try {
                    const response = await axios.post("/auth/register", formData)
                    return {
                        status: response.status,
                        message: response.data.message || "Вроде ОК..."
                    }
                } catch (e) {
                    return {
                        status: e.response.status,
                        message: e.response.data.message || "Неизвестная ошибка!"
                    }
                }
            },
            login: async (formData) => {
                try {
                    const response = await axios.post("/auth/login", formData)
                    const {token, ...user} = response.data
                    set({isAuth: true, token, user})
                    return {status: 200, message: "С возвращением!"}
                } catch (e) {
                    return {
                        status: e.response.status,
                        message: e.response.data.message || "Неизвестная ошибка!"
                    }
                }
            },
            updatePassword: async (formData) => {
                try {
                    const response = await axios.patch(`/users/${get().user._id}/password`, formData)
                    const {message} = response.data
                    return {status: 200, message}
                } catch (e) {
                    return {
                        status: e.response.status,
                        message: e.response.data.message || "Неизвестная ошибка!"
                    }
                }
            },
            updateUser: async (formData) => {
                try {
                    const response = await axios.patch(`/users/${get().user._id}`, formData)
                    const {message, ...user} = response.data
                    set({user})
                    return {status: 200, message}
                } catch (e) {
                    return {
                        status: e.response.status,
                        message: e.response.data.message || "Неизвестная ошибка!"
                    }
                }
            }
        }),
        {
            name: "user-storage",
            getStorage: () => localStorage,
        },
    ),
);
