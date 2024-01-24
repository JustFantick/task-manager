import React, { ChangeEvent, useRef } from 'react'
import styles from './taskPopup.module.scss'

interface NoteSectionProps {
	note: string,
	setNote: Function,
}

const NoteSection = ({ note, setNote }: NoteSectionProps) => {
	const textareaRef = useRef<null | HTMLTextAreaElement>(null);

	function onChangeHandler(e: ChangeEvent) {
		setNote(textareaRef.current?.value);

		if (textareaRef.current) {
			if (textareaRef.current?.scrollHeight >= 170) return;
			textareaRef.current.style.height = `auto`;
			textareaRef.current.style.height = `${textareaRef.current?.scrollHeight}px`;
		}
	}

	return (
		<textarea className={styles.noteSection}
			name="note"
			ref={textareaRef}
			placeholder='Note text'
			value={note}
			onChange={onChangeHandler}>

		</textarea>
	)
}

export default NoteSection