import {create} from "zustand";
import {persist} from "zustand/middleware";
import axios from "@/api/axios";

export const useStats = create(
    persist(
        (set, get) => ({
            // Values
            totalByQuality: null,
            totalBySeasons: null,
            totalProbabilityByContent: null,
            seasonByQuality: null,
            seasonProbabilityByContent: null,

            // Actions
            getTotalByQuality: async () => {
                try {
                    set({totalByQuality: null})
                    const response = await axios.get("/drops/stats/total/qualities")
                    set({totalByQuality: response.data})
                } catch (e) {
                    return {
                        status: e.response.status,
                        message: e.response.data.message || "Неизвестная ошибка!"
                    }
                }
            },
            getTotalBySeasons: async () => {
                try {
                    set({totalBySeasons: null})
                    const response = await axios.get("/drops/stats/total/seasons")
                    set({totalBySeasons: response.data})
                } catch (e) {
                    return {
                        status: e.response.status,
                        message: e.response.data.message || "Неизвестная ошибка!"
                    }
                }
            },
            getTotalProbabilityByContent: async () => {
                try {
                    set({totalProbabilityByContent: null})
                    const response = await axios.get("/drops/stats/total/probability")
                    set({totalProbabilityByContent: response.data})
                } catch (e) {
                    return {
                        status: e.response.status,
                        message: e.response.data.message || "Неизвестная ошибка!"
                    }
                }
            },
            getSeasonByQuality: async (seasonNumber) => {
                try {
                    set({seasonByQuality: null})
                    const response = await axios.get(`/drops/stats/seasons/${seasonNumber}/qualities`)
                    set({seasonByQuality: response.data})
                } catch (e) {
                    return {
                        status: e.response.status,
                        message: e.response.data.message || "Неизвестная ошибка!"
                    }
                }
            },
            getSeasonProbabilityByContent: async (seasonNumber) => {
                try {
                    set({seasonProbabilityByContent: null})
                    const response = await axios.get(`/drops/stats/seasons/${seasonNumber}/probability`)
                    set({seasonProbabilityByContent: response.data})
                } catch (e) {
                    return {
                        status: e.response.status,
                        message: e.response.data.message || "Неизвестная ошибка!"
                    }
                }
            },
            clearStats: () => set({
                totalByQuality: {},
                totalBySeasons: {},
                totalProbabilityByContent: [],
                seasonByQuality: {},
                seasonProbabilityByContent: {}
            }),
        }),
        {
            name: "total-stats",
            getStorage: () => localStorage,
        }
    )
)