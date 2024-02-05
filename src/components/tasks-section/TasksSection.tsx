import React from 'react'
import styles from './tasksSection.module.scss'
import MainTitle from '../main-title/MainTitle'
import { useProfileDataStore } from '@/store/userProfileData'
import AddTask from '../add-task-field/AddTask'
import { useInteractionStates } from '@/store/interactionStates'
import MenuBurger from '../menu-burger/MenuBurger'
import { createTask } from '@/server-actions/task-actions'
import TasksList from './TasksList'

const TasksSection = () => {
	const { userData, userTasks, setUserTasks } = useProfileDataStore();
	const { chosenListName, setIsSideMenuOpen, isMobile, activeList } = useInteractionStates();

	async function addTaskHandler(name: string) {
		const listId = typeof activeList === 'number' ? activeList : null;

		const response = await createTask(userData.userId, name, listId);

		if (response.success && response.createdTask) {
			setUserTasks([
				...userTasks,
				{
					taskId: response.createdTask.taskId,
					name: response.createdTask.taskName,
					note: response.createdTask.note,
					isCompleted: response.createdTask.isCompleted,
					priority: response.createdTask.priority,
					editTime: response.createdTask.editTime,
					executeDate: response.createdTask.executeDate,
					steps: [],
					listId: response.createdTask.listId,
				},
			])
		}
	}

	return (
		<main className={styles.taskSection}>
			<div className={styles.taskSection__head}>
				<MainTitle text={chosenListName} />

				{isMobile &&
					<MenuBurger onClickHandler={() => setIsSideMenuOpen(true)} />
				}
			</div>

			<TasksList tasksList={userTasks} setTasksList={setUserTasks} activeList={activeList} />

			<AddTask addTaskFunc={addTaskHandler} />

		</main>
	)
}

export default TasksSection