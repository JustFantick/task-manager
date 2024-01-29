import React from 'react'
import styles from './tasksSection.module.scss'
import MainTitle from '../main-title/MainTitle'
import { useProfileDataStore } from '@/store/userProfileData'
import AddTask from '../add-task-field/AddTask'
import TaskCart from '../task/TaskCart'
import { useInteractionStates } from '@/store/interactionStates'

const TasksSection = () => {
	const { filteredTasks } = useProfileDataStore();
	const { chosenListName } = useInteractionStates();

	return (
		<main className={styles.taskSection}>
			<MainTitle text={chosenListName} />

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