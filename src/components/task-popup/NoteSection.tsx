import React, { ChangeEvent, useEffect, useRef } from 'react'
import styles from './taskPopup.module.scss'

interface NoteSectionProps {
	note: string,
	setNote: Function,
}

const NoteSection = ({ note, setNote }: NoteSectionProps) => {
	const textareaRef = useRef<null | HTMLTextAreaElement>(null);

	useEffect(() => {
		correctHeight();
	}, []);

	function correctHeight() {
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
			defaultValue={note}
			onChange={correctHeight}
			onKeyDown={(e) => {
				if (e.code === "Enter") e.currentTarget.blur();
			}}
			onBlur={(e) => setNote(e.currentTarget.value)}
		>

		</textarea>
	)
}

export default NoteSection