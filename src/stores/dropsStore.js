import {create} from "zustand";
import {persist} from "zustand/middleware";
import axios from "@/api/axios";

export const useDrops = create(
    persist(
        (set) => ({
            seasonsOfUser: [],
            getCompletedSeasons: async () => {
                try {
                    const response = await axios.get("/drops/seasons/completed")
                    set({seasonsOfUser: response.data})
                } catch (e) {
                    return {
                        status: e.response.status,
                        message: e.response.data.message || "Неизвестная ошибка!"
                    }
                }
            },
            createSeason: async (seasonData) => {
                try {
                    const response = await axios.post("/drops/seasons/new", seasonData)
                    return {
                        status: response.status,
                        message: response.data.message || "Вроде ОК...",
                    }
                } catch (e) {
                    return {
                        status: e.response.status,
                        message: e.response.data.message || "Неизвестная ошибка!"
                    }
                }
            },
            getSeason: async (seasonNumber) => {
                try {
                    const response = await axios.get(`/drops/seasons/${seasonNumber}`)
                    return response.data
                } catch (e) {
                    return {
                        status: e.response.status,
                        message: e.response.data.message || "Неизвестная ошибка!"
                    }
                }
            },
            updateSeason: async (id, seasonData) => {
                try {
                    const response = await axios.patch(`/drops/seasons/${id}`, seasonData)
                    return {
                        status: response.status,
                        message: response.data.message || "Вроде ОК...",
                    }
                } catch (e) {
                    return {
                        status: e.response.status,
                        message: e.response.data.message || "Неизвестная ошибка!"
                    }
                }
            },
            clearDrops: () => set(() => ({seasonsOfUser: []})),
        }),
        {
            name: "drops-storage",
            getStorage: () => localStorage,
        },
    )
);

export const useFormDrops = create(
    persist(
        (set, get) => ({
            // Values
            seasonId: null,
            dropBoxes: {},
            resetInput: false,
            selectedSeason: null,
            selectedMode: 'create',

            // Actions
            setSelectedSeason: (season) => set(() => ({selectedSeason: season})),
            setSelectedMode: (mode) => set(() => ({selectedMode: mode})),
            setSeasonId: (id) => set(() => ({seasonId: String(id)})),
            setDropBoxes: (data) => set(() => ({dropBoxes: {...data}})),
            clearBoxData: () => set(() => ({
                seasonId: null,
                dropBoxes: {},
                resetInput: true,
                selectedSeason: null,
                selectedMode: 'create',
            })),
            updateDropBoxes: (nameBox, items) => set(() => ({dropBoxes: {...get().dropBoxes, [nameBox]: items}})),
            resetInputFlag: () => set(() => ({resetInput: false})),
            clearFormDrops: () => set(() => ({
                seasonId: null,
                dropBoxes: {},
                resetInput: false,
                selectedSeason: null,
                selectedMode: 'create',
            })),
        }),
        {
            name: "drops-form",
            getStorage: () => localStorage,
        },
    )
)