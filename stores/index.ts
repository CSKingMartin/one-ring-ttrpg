import { defineStore } from 'pinia'

export const useGlobalStore = defineStore({
  id: 'global',
  state: () => ({
    fellowship: [],
    inCombat: false,
  }),
})
