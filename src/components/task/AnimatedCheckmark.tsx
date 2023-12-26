import React from 'react'
import styles from './taskCart.module.scss'
import { motion, AnimatePresence } from 'framer-motion';

function AnimatedCheckmark({ initial = true, isVisible }: { initial?: boolean, isVisible: boolean }) {
	return (
		<AnimatePresence initial={initial}>
			{isVisible && (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={2}
					stroke="currentColor"
					className={styles.status__checkmark}
				>
					<motion.path
						initial={{ pathLength: 0 }}
						animate={{ pathLength: 1 }}
						exit={{ pathLength: 0 }}
						transition={{
							type: "tween",
							duration: 0.3,
							ease: isVisible ? "easeOut" : "easeIn"
						}}
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M4.5 12.75l6 6 9-13.5"
					/>
				</svg>
			)}
		</AnimatePresence>
	);
}

export default AnimatedCheckmark