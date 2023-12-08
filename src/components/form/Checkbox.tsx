import React from 'react'
import styles from './form.module.scss'

interface CheckboxProps {
	label: string,
	value: boolean,
	setValue: Function,
}

const Checkbox = ({ label, value, setValue }: CheckboxProps) => {
	return (
		<label className={styles.inputCheckbox}>
			{label}

			<input
				type="checkbox"
				name={label}
				checked={value}
				onChange={(e) => setValue(e.target.checked)}
			/>

		</label>
	)
}

export default Checkbox