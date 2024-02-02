import { create } from 'zustand'
import { BasicListNameType } from '@/components/side-menu/SideMenu';

export const useInteractionStates = create<{
	isTaskPopupOpen: boolean,
	chosenListName: string,
	isMobile: boolean,
	isSideMenuOpen: boolean,
	activeList: BasicListNameType | number,

	setIsTaskPopupOpen: (status: boolean) => void,
	setChosenListName: (listName: string) => void,
	setIsMobile: (status: boolean) => void,
	setIsSideMenuOpen: (status: boolean) => void,
	setActiveList: (activeList: BasicListNameType | number) => void,
}>((set) => ({
	isTaskPopupOpen: false,
	chosenListName: 'All tasks',
	isMobile: false,
	isSideMenuOpen: false,
	activeList: 'All tasks',	

	setIsTaskPopupOpen: (status) => set(({ isTaskPopupOpen: status })),
	setChosenListName: (listName) => set(({ chosenListName: listName })),
	setIsMobile: (status) => set(({ isMobile: status })),
	setIsSideMenuOpen: (status) => set(({ isSideMenuOpen: status })),
	setActiveList: (listValue) => set(({ activeList: listValue })),
}));