import { Step } from '@/store/userProfileData'
import React, { useState } from 'react'
import Status from '../task/Status'
import styles from './taskPopup.module.scss'
import PlusIcon from '../../../public/plus.svg'

interface TaskSectionProps {
	taskName: string,
	onTaskNameChange: (name: string) => void,
	isTaskComplete: boolean,
	onTaskCompleteChange: () => void,

	stepsList: Step[],
	onStepNameChange: (id: number, name: string) => void,
	onStepCompleteChange: (id: number) => void,

	stepDeleteHandler: (id: number) => void,
	stepCreateHandler: (name: string) => void,
}

const TaskSection = ({
	taskName, onTaskNameChange,
	isTaskComplete, onTaskCompleteChange,
	stepsList,
	stepDeleteHandler, stepCreateHandler,
	onStepCompleteChange, onStepNameChange,
}: TaskSectionProps) => {
	function toString(str: string | null) {
		if (str !== null) return str;
		return '';
	}

	return (
		<div className={styles.taskSection}>
			<div className={styles.taskSection__taskField}>
				<Status adaptSize={{ pc: 27, mb: 22 }}
					isComplete={isTaskComplete}
					onClickHandler={() => onTaskCompleteChange()}
				/>

				<div contentEditable
					onKeyDown={(e) => {
						if (e.code === "Enter") e.currentTarget.blur();
					}}
					onBlur={(e) => onTaskNameChange(toString(e.currentTarget.textContent))}
				>
					{taskName}
				</div>

			</div>

			<ul className={styles.taskSection__stepsList}>
				{stepsList.map(step => (
					<li key={step.stepId} className={styles.steps}>
						<Status isComplete={step.isCompleted} onClickHandler={() => onStepCompleteChange(step.stepId)} />

						<div className={styles.steps__name}
							contentEditable
							onKeyDown={(e) => {
								if (e.code === "Enter") e.currentTarget.blur();
							}}
							onBlur={(e) => onStepNameChange(step.stepId, toString(e.currentTarget.textContent))}
						>
							{step.stepName}
						</div>

					</li>
				))}

			</ul>

			<label className={styles.addStep}>
				<PlusIcon className={styles.addStep__icon} />
				<input className={styles.addStep__input}
					type="text"
					name="addStep"
					placeholder='Add step'
					onKeyUpCapture={(e) => {
						if (e.code === "Enter") {
							stepCreateHandler(toString(e.currentTarget.textContent));
							e.currentTarget.value = '';
							e.currentTarget.blur();
						};
					}}
				/>
			</label>

		</div>
	)
}

export default TaskSection