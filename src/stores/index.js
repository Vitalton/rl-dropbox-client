import {useDrops as useDropsZus, useFormDrops as useFormDropsZus} from './dropsStore.js'
import {useUser as useUserZus} from './userStore.js'
import {useStats as useStatsZus} from './statStore.js'
import {useShallow} from 'zustand/react/shallow'

const useFormDrops = selector => useFormDropsZus(useShallow(selector));
const useDrops = selector => useDropsZus(useShallow(selector));
const useUser = selector => useUserZus(useShallow(selector));
const useStats = selector => useStatsZus(useShallow(selector));


export {
    useFormDrops,
    useDrops,
    useUser,
    useStats
}