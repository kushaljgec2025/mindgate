import { create } from 'zustand'

const useZustandStore = create((set) => ({
    // Quiz-related state
    QuizQuestions: [],
    setQuizQuestions: (data) => set({ QuizQuestions: data }),

    // User-related state
    userDetails: null,
    setUserDetails: (data) => set({ userDetails: data }),

    // Optional: Clear store
    clearStore: () => set({
        QuizQuestions: [],
        userDetails: null
    }),

}))



export default useZustandStore