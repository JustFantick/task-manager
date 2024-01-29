import { create } from 'zustand'

export const useInteractionStates = create<{
	isTaskPopupOpen: boolean,
	chosenListName: string,
	isMobile: boolean,
	isSideMenuOpen: boolean,

	setIsTaskPopupOpen: (status: boolean) => void,
	setChosenListName: (listName: string) => void,
	setIsMobile: (status: boolean) => void,
	setIsSideMenuOpen: (status: boolean) => void,
}>((set) => ({
	isTaskPopupOpen: false,
	chosenListName: 'All tasks',
	isMobile: false,
	isSideMenuOpen: false,

	setIsTaskPopupOpen: (status) => set(({ isTaskPopupOpen: status })),
	setChosenListName: (listName) => set(({ chosenListName: listName })),
	setIsMobile: (status) => set(({ isMobile: status })),
	setIsSideMenuOpen: (status) => set(({ isSideMenuOpen: status })),
}));