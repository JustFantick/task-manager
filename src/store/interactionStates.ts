import { create } from 'zustand'

export const useInteractionStates = create<{
	isTaskPopupOpen: boolean,
	chosenList: string,
	isMobile: boolean,
	isSideMenuOpen: boolean,
}>((set) => ({
	isTaskPopupOpen: false,
	chosenList: '',
	isMobile: false,
	isSideMenuOpen: false,
}));