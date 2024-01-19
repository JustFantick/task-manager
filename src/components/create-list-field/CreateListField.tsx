import React, { useState } from 'react'
import styles from './createListField.module.scss'
import PlusIcon from '../../../public/plus.svg'
import { motion } from 'framer-motion'

const CreateListField = ({ createList }: { createList: Function }) => {
	const [isFocused, setIsFocused] = useState<boolean>(false);
	const [inputValue, setInputValue] = useState<string>('');

	function onKeyDownHandler(e: React.KeyboardEvent) {
		if (e.key === 'Enter' && inputValue !== '') {
			createList(inputValue);
			setInputValue('');
		}
	}

	return (
		<label className={styles.createList}>
			<motion.div animate={
				isFocused ? {
					rotate: '45deg'
				} : {
					rotate: '0'
				}
			}>
				<PlusIcon className={styles.createList__icon} />
			</motion.div>

			<input type="text" name="newList"
				className={styles.createList__input}
				placeholder='Create new list'

				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}

				onKeyUp={onKeyDownHandler}

				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}

			/>

		</label>)
}

export default CreateListField