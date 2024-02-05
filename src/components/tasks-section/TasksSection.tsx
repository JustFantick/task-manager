import React, { startTransition, useOptimistic } from 'react'
import styles from './tasksSection.module.scss'
import MainTitle from '../main-title/MainTitle'
import { Task, useProfileDataStore } from '@/store/userProfileData'
import AddTask from '../add-task-field/AddTask'
import TaskCart from '../task/TaskCart'
import { useInteractionStates } from '@/store/interactionStates'
import MenuBurger from '../menu-burger/MenuBurger'
import { changeTaskComplete, changeTaskPriority, createTask } from '@/server-actions/task-actions'
import { getRandomId } from '../side-menu/SideMenu'

const TasksSection = () => {
	const { userData, userTasks, setUserTasks, setTaskPopupId } = useProfileDataStore();
	const { chosenListName, setIsSideMenuOpen, isMobile, setIsTaskPopupOpen, activeList } = useInteractionStates();

	const [optimisticTasks, setOptimisticTasks] = useOptimistic(
		userTasks,
		(state, newList: Task[]) => newList,
	)

	function taskClickHandler(taskId: number) {
		setTaskPopupId(taskId);
		setIsTaskPopupOpen(true);
	}

	async function completeClickHandler(taskId: number) {
		let newBooleanValue: boolean = false;
		startTransition(() => {
			setOptimisticTasks(userTasks.map(task => {
				if (task.taskId === taskId) {
					newBooleanValue = !task.isCompleted;
					return {
						...task,
						isCompleted: newBooleanValue,
					}
				} else return task;
			}));
		});

		const response = await changeTaskComplete(taskId, newBooleanValue);
		if (response.success) {
			setUserTasks(userTasks.map(task => {
				if (task.taskId === taskId) {
					return {
						...task,
						isCompleted: newBooleanValue,
					}
				} else return task;
			}));
		}
	}

	async function priorityClickHandler(taskId: number) {
		let newBooleanValue = false;
		startTransition(() => {
			setOptimisticTasks(userTasks.map(task => {
				if (task.taskId === taskId) {
					newBooleanValue = !task.priority;
					return {
						...task,
						priority: newBooleanValue,
					}
				} else return task;
			}));
		});

		const response = await changeTaskPriority(taskId, newBooleanValue);
		if (response.success) {
			setUserTasks(userTasks.map(task => {
				if (task.taskId === taskId) {
					return {
						...task,
						priority: newBooleanValue,
					}
				} else return task;
			}));
		}
	}

	async function addTaskHandler(name: string) {
		const listId = typeof activeList === 'number' ? activeList : null;
		startTransition(() => {
			setOptimisticTasks([
				...userTasks,
				{
					taskId: getRandomId(),
					name: name,
					note: '',
					isCompleted: false,
					priority: false,
					editTime: new Date(),
					executeDate: null,
					steps: [],
					listId: listId,
				}
			]);
		});

		const response = await createTask(userData.userId, name, listId);

		if (response.success && response.createdTask) {
			setUserTasks([
				...userTasks,
				{
					taskId: response.createdTask.taskId,
					name: response.createdTask.taskName,
					note: response.createdTask.note,
					isCompleted: response.createdTask.isCompleted,
					priority: response.createdTask.priority,
					editTime: response.createdTask.editTime,
					executeDate: response.createdTask.executeDate,
					steps: [],
					listId: response.createdTask.listId,
				},
			])
		}
	}

	return (
		<main className={styles.taskSection}>
			<div className={styles.taskSection__head}>
				<MainTitle text={chosenListName} />

				{isMobile &&
					<MenuBurger onClickHandler={() => setIsSideMenuOpen(true)} />
				}
			</div>

			<ul className={styles.taskSection__tasksList}>
				{optimisticTasks.map(task => (
					<TaskCart key={task.taskId}
						title={task.name}
						isComplete={task.isCompleted}
						isPrioritize={task.priority}

						taskClickHandler={() => taskClickHandler(task.taskId)}
						completeChangeHandler={() => completeClickHandler(task.taskId)}
						priorityChangeHandler={() => priorityClickHandler(task.taskId)}
					/>
				))}

			</ul>

			<AddTask addTaskFunc={addTaskHandler} />

		</main>
	)
}

export default TasksSection