import React from 'react'
import styles from './form.module.scss'
import { motion, spring } from 'framer-motion'
import { useFormStatus } from 'react-dom';

const SubmitButton = ({ title }: { title: string }) => {
	const { pending } = useFormStatus();

	return (
		<motion.button
			transition={{ type: spring }}
			whileHover={{ scale: 1.025 }}
			whileTap={{ scale: 0.95 }}

			variants={{
				disabled: { opacity: 0.5 },
				enabled: { opacity: 1 },
			}}
			animate={pending ? 'disabled' : 'enabled'}

			className={styles.submitButton}
			aria-disabled={pending}
		>
			{title}
		</motion.button>
	)
}

export default SubmitButton