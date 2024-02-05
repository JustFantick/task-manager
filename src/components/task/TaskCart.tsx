import React from 'react'
import Status from './Status'
import Star from './Star'
import styles from './taskCart.module.scss'

interface TaskCartProps {
	title: string,
	isComplete: boolean,
	isPrioritize: boolean,

	taskClickHandler: () => void,
	completeChangeHandler: () => void,
	priorityChangeHandler: () => void,
}

const TaskCart = ({
	title, isComplete, isPrioritize,
	taskClickHandler, priorityChangeHandler, completeChangeHandler,

}: TaskCartProps) => {
	return (
		<div className={styles.taskContainer}>
			<Status isComplete={isComplete} onClickHandler={completeChangeHandler} />

			<div className={styles.taskContainer__title} onClick={taskClickHandler}>{title}</div>

			<Star isComplete={isPrioritize} onClickHandler={priorityChangeHandler} />

		</div>
	)
}

export default TaskCart