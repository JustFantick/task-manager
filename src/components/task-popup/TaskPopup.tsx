import React from 'react'
import styles from './taskPopup.module.scss'
import { AnimatePresence, motion } from 'framer-motion'
import TaskPopupContent from './TaskPopupContent'
import { useInteractionStates } from '@/store/interactionStates'

const TaskPopup = () => {
	const { isTaskPopupOpen, setIsTaskPopupOpen } = useInteractionStates();

	return (
		<AnimatePresence>
			{
				isTaskPopupOpen &&
				<motion.div className={styles.taskPopup}
					onClick={(e) => {
						const el = e.target as HTMLElement;
						if (!el.closest('#task-popup-content')) setIsTaskPopupOpen(false);
					}}
					key="task-popup"
					initial={{ backgroundColor: 'rgba(0,0,0, 0)' }}
					animate={{ backgroundColor: 'rgba(0,0,0, 0.5)' }}
					exit={{ backgroundColor: 'rgba(0,0,0, 0)' }}
				>
					<motion.div
						id='task-popup-content'
						initial={{ x: '100%' }}
						animate={{ x: 0 }}
						exit={{ x: '100%' }}
						transition={{ type: 'tween' }}
					>
						<TaskPopupContent />
					</motion.div>

				</motion.div>

			}
		</AnimatePresence>

	)
}
export default TaskPopup