import React, { useState } from 'react'
import styles from './taskPopup.module.scss'
import { useProfileDataStore } from '@/store/userProfileData'
import HorizontalLine from '../horizontal-line/HorizontalLine'
import ArrowLeftIcon from '../../../public/arrow_left.svg'
import BinIcon from '../../../public/bin.svg'
import NoteSection from './NoteSection'
import TaskSection from './TaskSection'
import DatePickerSection from './DatePickerSection'
import { useInteractionStates } from '@/store/interactionStates'
import { changeTaskComplete, changeTaskExecutionDate, changeTaskName, changeTaskNote, deleteTask } from '@/server-actions/task-actions'
import { changeStepComplete, changeStepName, createStep, deleteStep } from '@/server-actions/step-actions'
import DeleteTaskPopup from './delete-task-popup/DeleteTaskPopup'
import PopupContainer from '../popup-container/PopupContainer'

const TaskPopupContent = () => {
	const [isDeletePopupOpen, setIsDeletePopupOpen] = useState<boolean>(false);
	const { taskPopupId, userTasks, setUserTasks, setTaskPopupId } = useProfileDataStore();
	const { setIsTaskPopupOpen, isTaskPopupOpen } = useInteractionStates();

	const task = userTasks.find(task => task.taskId === taskPopupId);

	async function taskNameChangeHandler(newName: string) {
		const response = await changeTaskName(taskPopupId, newName);

		if (response.success) {
			setUserTasks(userTasks.map(task => {
				if (task.taskId === taskPopupId) {
					return { ...task, name: newName, editTime: new Date() };
				} else return task;
			}));
		}
	}

	async function taskCompleteChangeHandler(completeStatus: boolean) {
		const response = await changeTaskComplete(taskPopupId, completeStatus);

		if (response.success) {
			setUserTasks(userTasks.map(task => {
				if (task.taskId === taskPopupId) {
					return { ...task, isCompleted: completeStatus };
				} else return task;
			}));
		}
	}

	async function stepNameChangeHandler(stepId: number, newName: string) {
		const response = await changeStepName(stepId, newName);

		if (response.success) {
			setUserTasks(userTasks.map(task => {
				if (task.taskId === taskPopupId) {
					return {
						...task,
						editTime: new Date(),
						steps: task.steps.map(step => {
							if (step.stepId === stepId) {
								return { ...step, stepName: newName };
							} else return step;
						}),
					};
				} else return task;
			}));
		}
	}

	async function stepCompleteChangeHandler(stepId: number, completeStatus: boolean) {
		const response = await changeStepComplete(stepId, completeStatus);

		if (response.success) {
			setUserTasks(userTasks.map(task => {
				if (task.taskId === taskPopupId) {
					return {
						...task,
						steps: task.steps.map(step => {
							if (step.stepId === stepId) {
								return { ...step, isCompleted: completeStatus };
							} else return step;
						})
					};
				} else return task;
			}));
		}
	}

	async function createStepHandler(stepName: string) {
		const response = await createStep(taskPopupId, stepName);

		if (response.success && response.createdStep) {
			setUserTasks(userTasks.map(task => {
				if (task.taskId === taskPopupId) {
					return { ...task, steps: [...task.steps, response.createdStep], editTime: new Date() };
				} else return task;
			}))
		}
	}

	async function changeNoteHandler(noteText: string) {
		const response = await changeTaskNote(taskPopupId, noteText);

		if (response.success) {
			setUserTasks(userTasks.map(task => {
				if (task.taskId === taskPopupId) {
					return { ...task, note: noteText, editTime: new Date() };
				} else return task;
			}))
		}
	}

	async function changeDateHandler(date: Date | null) {
		const response = await changeTaskExecutionDate(taskPopupId, date);

		if (response.success) {
			setUserTasks(userTasks.map(task => {
				if (task.taskId === taskPopupId) {
					return { ...task, executeDate: date, editTime: new Date() };
				} else return task;
			}));
		}
	}

	async function deleteStepHandler(stepId: number) {
		const response = await deleteStep(stepId);

		if (response.success) {
			setUserTasks(userTasks.map(task => {
				if (task.taskId === taskPopupId) {
					return { ...task, steps: task.steps.filter(step => step.stepId !== stepId), editTime: new Date() };
				} else return task;
			}));
		}
	}

	async function deleteTaskHandler() {
		setIsTaskPopupOpen(false);
		const response = await deleteTask(taskPopupId);

		if (response.success) {
			setUserTasks(userTasks.filter(task => task.taskId !== taskPopupId));
			setTaskPopupId(0);
		}
	}

	if (taskPopupId === 0 || taskPopupId === null || !task) return null;

	return (
		<>
			<PopupContainer
				isOpen={isTaskPopupOpen}
				closePopup={() => setIsTaskPopupOpen(false)}
				contentAppearance='rightToLeft'
			>
				<div className={styles.taskPopupContent}>
					<div className={styles.taskPopupContent__dataSections}>
						<TaskSection
							taskName={task.name}
							onTaskNameChange={taskNameChangeHandler}
							isTaskComplete={task.isCompleted}
							onTaskCompleteChange={taskCompleteChangeHandler}

							stepsList={task.steps}
							onStepNameChange={stepNameChangeHandler}
							onStepCompleteChange={stepCompleteChangeHandler}

							stepDeleteHandler={deleteStepHandler}
							stepCreateHandler={createStepHandler}
						/>

						<NoteSection note={task.note ? task.note : ''} setNote={changeNoteHandler} />

						<DatePickerSection dateValue={task.executeDate} setDateValue={changeDateHandler} />

					</div>


					<HorizontalLine />
					<div className={styles.taskPopupContent__footer}>
						<ArrowLeftIcon className={styles.arrowLeftIcon} onClick={() => setIsTaskPopupOpen(false)} />

						<div className={styles.editTime}>Last edit: <time dateTime=''>
							{new Intl.DateTimeFormat('en-US', {
								hour: '2-digit',
								minute: '2-digit',
								hour12: false,
							}).format(task.editTime)}
						</time>
						</div>

						<BinIcon className={styles.binIcon} onClick={() => setIsDeletePopupOpen(true)} />

					</div>

				</div>

			</PopupContainer>

			<DeleteTaskPopup
				taskName={task.name}
				isOpen={isDeletePopupOpen}
				setIsOpen={setIsDeletePopupOpen}
				deleteTask={deleteTaskHandler}
			/>
		</>
	)
}

export default TaskPopupContent