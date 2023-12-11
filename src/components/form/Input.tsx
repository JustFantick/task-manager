import React from 'react'
import styles from './form.module.scss'

interface InputProps {
	type: string,
	label?: string,
	name: string,
	pattern?: string,
	title?: string,
	isRequired?: boolean,
	placeholder?: string,
}

const Input = ({
	label = '', type, name, pattern, title = '', isRequired = true, placeholder = ''
}: InputProps) => {
	return (
		<label className={styles.inputWrapper}>
			<div className={styles.inputWrapper__label}>
				{label}
			</div>

			<input className={styles.inputWrapper__input}
				type={type}
				name={name}
				pattern={pattern}
				title={title}
				required={isRequired}
				placeholder={placeholder}
			/>

		</label>
	)
}

export default Input