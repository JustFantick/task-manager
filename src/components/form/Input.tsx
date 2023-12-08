import React from 'react'
import styles from './form.module.scss'

interface InputProps {
	type: string,
	label: string,
	isValid: boolean,
	value: string,
	setValue: Function,
}

const Input = ({ type, label, isValid, value, setValue }: InputProps) => {
	return (
		<label className={styles.inputWrapper}>
			<div className={styles.inputWrapper__label}>
				{label}
			</div>

			<input className={styles.inputWrapper__input}
				type={type}
				name={type}
				value={value}
				onChange={(e) => setValue(e.target.value)}
			/>

		</label>
	)
}

export default Input