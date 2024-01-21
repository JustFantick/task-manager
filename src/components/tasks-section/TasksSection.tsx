import React from 'react'
import styles from './tasksSection.module.scss'
import MainTitle from '../main-title/MainTitle'
import { useProfileDataStore } from '@/store/userProfileData'
import AddTask from '../add-task-field/AddTask'
import TaskCart from '../task/TaskCart'

const TasksSection = () => {
	const { filteredTasks } = useProfileDataStore();

	return (
		<main className={styles.taskSection}>
			<MainTitle text='Monday, 17th' />

			<ul className={styles.taskSection__tasksList}>
				{filteredTasks.map(task => (
					<TaskCart taskId={task.taskId}
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