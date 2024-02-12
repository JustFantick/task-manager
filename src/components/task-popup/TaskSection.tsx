import { Step } from '@/store/userProfileData'
import React, { startTransition, useEffect, useOptimistic, useState } from 'react'
import Status from '../task/Status'
import styles from './taskPopup.module.scss'
import PlusIcon from '../../../public/plus.svg'
import { useAutoAnimate } from '@formkit/auto-animate/react'

interface TaskSectionProps {
	taskName: string,
	onTaskNameChange: (name: string) => void,
	isTaskComplete: boolean,
	onTaskCompleteChange: (status: boolean) => void,

	stepsList: Step[],
	onStepNameChange: (id: number, name: string) => void,
	onStepCompleteChange: (id: number, status: boolean) => void,

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
	const [optimisticStepsList, setOptimisticStepsList] = useOptimistic<Step[]>(stepsList);

	//fixes random optimistic change cancel, so task status displays incorrect
	useEffect(() => {
		setOptimisticTaskStatus(isTaskComplete);
	}, [isTaskComplete]);

	//needed to update inner optimistic state, couse useOptimistic doesnt get updated when outer source updates
	useEffect(() => {
		startTransition(() => {
			setOptimisticStepsList(stepsList);
		})
	}, [stepsList]);

	const [animListRef] = useAutoAnimate();

	return (
		<div className={styles.taskSection}>
			<div className={styles.taskSection__taskField}>
				<Status adaptSize={{ pc: 27, mb: 22 }}
					isComplete={optimisticTaskStatus}
					onClickHandler={async () => {
						let newVal = !optimisticTaskStatus;
						startTransition(() => {
							setOptimisticTaskStatus(newVal);
						});
						await onTaskCompleteChange(newVal);
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

			<ul className={styles.taskSection__stepsList} ref={animListRef}>
				{optimisticStepsList.map(step => (
					<li key={step.stepId} className={styles.steps}>
						<Status isComplete={step.isCompleted} onClickHandler={async () => {
							let newVal = !step.isCompleted;
							startTransition(() => {
								setOptimisticStepsList(optimisticStepsList.map(li => {
									if (li.stepId === step.stepId) {
										return { ...li, isCompleted: newVal };
									} else return li;
								}))
							});

							await onStepCompleteChange(step.stepId, newVal);
						}} />

						<input type="text" name={`step${step.stepId}`}
							data-iscomplete={step.isCompleted}
							className={styles.steps__name}
							defaultValue={step.stepName}
							onKeyDown={(e) => {
								if (e.code === "Enter") e.currentTarget.blur();
							}}
							onBlur={(e) => onStepNameChange(step.stepId, e.currentTarget.value)}
						/>

						<button className={styles.steps__deleteBtn}
							type="button"
							onClick={async () => {
								startTransition(() => {
									setOptimisticStepsList(optimisticStepsList.filter(li => li.stepId !== step.stepId));
								});
								await stepDeleteHandler(step.stepId);
							}}
						></button>
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