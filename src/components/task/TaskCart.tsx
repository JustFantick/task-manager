import React from 'react'
import Status from './Status'
import Star from './Star'
import styles from './taskCart.module.scss'

interface TaskCartProps {
	taskId: number,
	title: string,
	isComplete: boolean,
	isPrioritize: boolean,
}

const TaskCart = ({ taskId, title, isComplete, isPrioritize }: TaskCartProps) => {
	return (
		<div className={styles.taskContainer}>
			<Status isComplete={isComplete} />

			<div className={styles.taskContainer__title}>{title}</div>

			<Star isComplete={isPrioritize} />

		</div>
	)
}

export default TaskCart