import { Step } from '@/store/userProfileData'
import React, { startTransition, useOptimistic, useState } from 'react'
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
	const [optimisticTaskStatus, setOptimisticTaskStatus] = useOptimistic(isTaskComplete);
	const [optimisticStepsList, setOptimisticStepsList] = useOptimistic<Step[]>(stepsList)

	return (
		<div className={styles.taskSection}>
			<div className={styles.taskSection__taskField}>
				<Status adaptSize={{ pc: 27, mb: 22 }}
					isComplete={optimisticTaskStatus}
					onClickHandler={async () => {
						startTransition(() => {
							setOptimisticTaskStatus(!optimisticTaskStatus);
						});
						await onTaskCompleteChange();
					}}
				/>

				<input type="text" name="task-name"
					defaultValue={taskName}
					onKeyDown={(e) => {
						if (e.code === "Enter") e.currentTarget.blur();
					}}
					onBlur={(e) => onTaskNameChange(e.currentTarget.value)}
				/>

			</div>

			<ul className={styles.taskSection__stepsList}>
				{optimisticStepsList.map(step => (
					<li key={step.stepId} className={styles.steps}>
						<Status isComplete={step.isCompleted} onClickHandler={async () => {
							startTransition(() => {
								setOptimisticStepsList(optimisticStepsList.map(li => {
									if (li.stepId === step.stepId) {
										return { ...li, isCompleted: !li.isCompleted };
									} else return li;
								}))
							});

							await onStepCompleteChange(step.stepId);
						}} />

						<input type="text" name={`step${step.stepId}`}
							className={styles.steps__name}
							defaultValue={step.stepName}
							onKeyDown={(e) => {
								if (e.code === "Enter") e.currentTarget.blur();
							}}
							onBlur={(e) => onStepNameChange(step.stepId, e.currentTarget.value)}
						/>

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
							stepCreateHandler(e.currentTarget.value);
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