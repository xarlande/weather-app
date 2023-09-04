import {defineStore} from "pinia";

type State = {
    id: number
}

export const useWeatherStore = defineStore('weatherStore', {
    state: (): State => ({
        id: 0
    }),
    getters: {
        getId(state): State['id'] {
            return state.id
        }
    },
    actions: {
        initStore(): void {

        },
        setId(value: State['id']): void {
            this.id = value
        }
    },
})
