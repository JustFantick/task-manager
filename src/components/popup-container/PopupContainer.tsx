import React from 'react'
import { motion, AnimatePresence, MotionProps } from 'framer-motion'
import styles from './popupContainer.module.scss'

interface PopupContainerProps {
	children: React.ReactElement,
	isOpen: boolean,
	closePopup: () => void,
	contentAppearance: 'rightToLeft' | 'middleDialogWindow' | MotionProps,
}

const PopupContainer = ({ children, isOpen, closePopup, contentAppearance }: PopupContainerProps) => {
	const popupContentAnimProps = (): MotionProps => {
		if (contentAppearance === 'rightToLeft') {
			return {
				initial: { x: '100%' },
				animate: { x: 0 },
				exit: { x: '100%' },
				transition: { type: 'tween' },
			}
		} else if (contentAppearance === 'middleDialogWindow') {
			return {
				initial: { opacity: 0, scale: 0.9, },
				animate: { opacity: 1, scale: 1 },
				exit: { opacity: 0, scale: 0.95 },
				transition: { type: 'spring', duration: 0.3 }
			}
		} else {
			return { ...contentAppearance }
		}
	}

	return (
		<AnimatePresence>
			{
				isOpen &&
				<motion.div
					className={styles.popupContainer}
					data-centerchild={contentAppearance === 'middleDialogWindow'}
					onClick={(e) => {
						if (e.target === e.currentTarget) closePopup();
					}}
					key="popup-container"
					initial={{ backgroundColor: 'rgba(0,0,0, 0)' }}
					animate={{ backgroundColor: 'rgba(0,0,0, 0.5)' }}
					exit={{ backgroundColor: 'rgba(0,0,0, 0)' }}
				>
					<motion.div
						key='task-popup-content'
						{...popupContentAnimProps()}
					>
						{children}
					</motion.div>

				</motion.div>
			}

		</AnimatePresence>
	)
}

export default PopupContainer