import { defineStore } from 'pinia'


export const useThemeStore = defineStore('theme', {
    state: () => ({
        theme: 'light' as String,        
    }),
    getters: {
        getTheme: (state) => state.theme,        
    },
    actions: {
        setTheme(theme: String) {
            this.theme = theme
        },        
    },
    persist: {
        storage: persistedState.localStorage,
    },
})