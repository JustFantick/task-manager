import React from 'react'
import styles from './form.module.scss'
import { motion, spring } from 'framer-motion'
import { useFormStatus } from 'react-dom';

interface SubmitButtonProps {
	onSubmit: React.FormEventHandler,
	text: string,
}

const SubmitButton = ({ onSubmit, text }: SubmitButtonProps) => {
	const { pending } = useFormStatus();

	return (
		<motion.button
			transition={{ type: spring }}
			whileHover={{ scale: 1.025 }}
			whileTap={{ scale: 0.95 }}

			variants={{ disabled: { opacity: 0.75 } }}
			animate={pending && 'disabled'}

			className={styles.submitButton}
			onSubmit={onSubmit}
		>
			{text}
		</motion.button>
	)
}

export default SubmitButton