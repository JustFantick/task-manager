'use client'
import React, { useRef, useState } from 'react'
import styles from './addTask.module.scss'
import PlusIcon from '../../../public/plus.svg'
import { motion } from 'framer-motion'

const AddTask = ({ addTaskFunc }: { addTaskFunc: (name: string) => void }) => {
	const formRef = useRef<HTMLFormElement | null>(null);
	const inputRef = useRef<HTMLInputElement | null>(null);

	const [isFocused, setIsFocused] = useState(false);

	function actionHandler() {
		if (inputRef.current?.value) addTaskFunc(inputRef.current.value);

		formRef.current?.reset();
		inputRef.current?.blur();
	}

	return (
		<form className={styles.addTask} action={actionHandler} ref={formRef}>
			<label className={styles.addTask__label}>
				<motion.div className={styles.plusContainer}
					variants={{
						onFocus: {
							rotate: 45,
							opacity: 1,
						},
						onBlur: {
							rotate: 0,
							opacity: 0.75,
						}
					}}
					animate={isFocused ? 'onFocus' : 'onBlur'}
				>
					<PlusIcon className={styles.plusIcon} />
				</motion.div>

				<input type="text" name="title" placeholder='Add new task'
					ref={inputRef}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
				/>

			</label>

			<button type="submit" style={{ display: 'none' }}></button>

		</form>
	)
}

export default AddTask