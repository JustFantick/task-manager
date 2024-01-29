import { create } from 'zustand'

export interface UserData {
	userId: number,
	login: string,
	email: string,
}

export interface Step {
	stepId: number,
	stepName: string,
	isCompleted: boolean,
}

export interface Task {
	taskId: number,
	name: string,
	note: string | null,
	isCompleted: boolean,
	priority: boolean,
	editTime: Date,
	executeDate: Date | null,
	steps: Step[],
	listId: number | null,
}

export interface List {
	listId: number,
	name: string,
}

export const useProfileDataStore = create<{
	userData: UserData;
	userTasks: Task[];
	userLists: List[];
	filteredTasks: Task[];
	taskPopupId: number;

	setUserData: (id: number, login: string, email: string) => void;
	setUserTasks: (tasks: Task[]) => void;
	setUserLists: (lists: List[]) => void;
	setFilteredTasks: (tasks: Task[]) => void;
	setTaskPopupId: (id: number) => void;
}>((set) => ({
	userData: <UserData>{},
	userTasks: [],
	userLists: [],
	filteredTasks: [],
	taskPopupId: 0,

	setUserData: (id, login, email) => set(({
		userData: {
			userId: id,
			login: login,
			email: email,
		}
	})),
	setUserTasks: (array) => set(({ userTasks: array })),
	setUserLists: (array) => set(({ userLists: array })),
	setFilteredTasks: (array) => set(({ filteredTasks: array })),
	setTaskPopupId: (id) => set(({ taskPopupId: id })),
}));