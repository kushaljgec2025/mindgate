import { create } from 'zustand'

const useQuizZustandStore = create((set) => ({
    QuizQuestions: [],
    setQuizQuestions: (data) => set({ QuizQuestions: data }),
 
}))

export default useQuizZustandStore