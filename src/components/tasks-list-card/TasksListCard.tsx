import React, { MouseEventHandler } from 'react'
import styles from './tasksListCard.module.scss'
import { motion } from 'framer-motion'

interface TasksListCardProps {
	listName: string,
	listItemsNumber: number,
	onClickHandler?: MouseEventHandler,
	isActive?: boolean
}

const TasksListCard = ({
	listName, listItemsNumber, onClickHandler, isActive = false
}: TasksListCardProps) => {
	return (
		<motion.div className={styles.tasksListCard} onClick={onClickHandler}
			animate={isActive && {
				borderBottom: '2px solid #7CB9DF',
				backgroundColor: 'rgb(57, 58, 60)',
			}}
			whileHover={{
				backgroundColor: 'rgb(57, 58, 60)',
			}}
		>
			<div className={styles.tasksListCard__name}>{listName}</div>
			<div className={styles.tasksListCard__counter}>{listItemsNumber}</div>

		</motion.div>
	)
}

export default TasksListCard