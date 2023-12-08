import React from 'react'
import styles from './form.module.scss'
import { motion, spring } from 'framer-motion'

interface SubmitButtonProps {
	onSubmit: React.FormEventHandler,
	text: string,
}

const SubmitButton = ({ onSubmit, text }: SubmitButtonProps) => {
	return (
		<motion.button
			transition={{ type: spring }}
			whileHover={{ scale: 1.025 }}
			whileTap={{ scale: 0.95 }}

			className={styles.submitButton}
			onSubmit={onSubmit}
		>
			{text}
		</motion.button>
	)
}

export default SubmitButton