import React from 'react'
import styles from './form.module.scss'

interface CheckboxProps {
	label: string,
	name: string,
	defaultChecked?: boolean,
}

const Checkbox = ({ label, name, defaultChecked = true }: CheckboxProps) => {
	return (
		<label className={styles.inputCheckbox}>
			{label}

			<input
				type="checkbox"
				name={name}
				defaultChecked={defaultChecked}
			/>

		</label>
	)
}

export default Checkbox