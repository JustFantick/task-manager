import React, { MouseEventHandler } from 'react'
import styles from './tasksListCard.module.scss'
import { motion } from 'framer-motion'

interface TasksListCardProps {
	listName: string,
	onClickHandler: MouseEventHandler,
	isActive: boolean,
	removeListHandler?: MouseEventHandler,
}

const TasksListCard = ({
	listName, onClickHandler, isActive, removeListHandler
}: TasksListCardProps) => {
	return (
		<motion.div className={styles.tasksListCard} onClick={onClickHandler}
			animate={isActive ? {
				borderBottom: '2px solid rgb(124, 185, 223)',
				backgroundColor: 'rgb(57, 58, 60)',
			} : {
				borderBottom: '2px solid rgba(124, 185, 223, 0)',
				backgroundColor: 'rgba(57, 58, 60, 0)',
			}}
			whileHover={{
				backgroundColor: 'rgb(57, 58, 60)',
			}}
		>
			<div className={styles.tasksListCard__name}>{listName}</div>

			{
				removeListHandler &&
				<div className={styles.tasksListCard__deleteBtn} onClick={removeListHandler}></div>
			}

		</motion.div>
	)
}

export default TasksListCard