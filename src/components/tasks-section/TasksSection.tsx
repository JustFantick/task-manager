import React from 'react'
import styles from './tasksSection.module.scss'
import MainTitle from '../main-title/MainTitle'
import { useProfileDataStore } from '@/store/userProfileData'
import AddTask from '../add-task-field/AddTask'
import TaskCart from '../task/TaskCart'
import { useInteractionStates } from '@/store/interactionStates'
import MenuBurger from '../menu-burger/MenuBurger'

const TasksSection = () => {
	const { filteredTasks } = useProfileDataStore();
	const { chosenListName, setIsSideMenuOpen, isMobile } = useInteractionStates();

	return (
		<main className={styles.taskSection}>
			<div className={styles.taskSection__head}>
				<MainTitle text={chosenListName} />

				{isMobile &&
					<MenuBurger onClickHandler={() => setIsSideMenuOpen(true)} />
				}
			</div>

			<ul className={styles.taskSection__tasksList}>
				{filteredTasks.map(task => (
					<TaskCart key={task.taskId}
						taskId={task.taskId}
						title={task.name}
						isComplete={task.isCompleted}
						isPrioritize={task.priority}
					/>
				))}

			</ul>

			<AddTask />

		</main>
	)
}

export default TasksSection