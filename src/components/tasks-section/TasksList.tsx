import { Task, useProfileDataStore } from '@/store/userProfileData'
import React, { useOptimistic, startTransition, useEffect } from 'react'
import { BasicListNameType } from '../side-menu/SideMenu';
import styles from './tasksSection.module.scss'
import TaskCart from '../task/TaskCart';
import { changeTaskComplete, changeTaskPriority } from '@/server-actions/task-actions'
import { useInteractionStates } from '@/store/interactionStates';
import { useAutoAnimate } from '@formkit/auto-animate/react'

interface TasksListProps {
	tasksList: Task[],
	setTasksList: (arr: Task[]) => void,
	activeList: BasicListNameType | number,
}

const TasksList = ({ tasksList, setTasksList, activeList }: TasksListProps) => {
	const { setIsTaskPopupOpen } = useInteractionStates();
	const { setTaskPopupId } = useProfileDataStore();

	const [optimisticTasks, setOptimisticTasks] = useOptimistic(
		tasksList
			.sort((a, b) => Number(b.priority) - Number(a.priority))
			.sort((a, b) => Number(a.isCompleted) - Number(b.isCompleted))
	);

	useEffect(() => {
		startTransition(() => setOptimisticTasks(tasksList));
	}, [tasksList]);

	function taskClickHandler(taskId: number) {
		setTaskPopupId(taskId);
		setIsTaskPopupOpen(true);
	}

	async function completeClickHandler(taskId: number) {
		let newBooleanValue: boolean = false;
		startTransition(() => {
			setOptimisticTasks(optimisticTasks.map(task => {
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
			setTasksList(optimisticTasks.map(task => {
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
			setOptimisticTasks(optimisticTasks.map(task => {
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
			setTasksList(optimisticTasks.map(task => {
				if (task.taskId === taskId) {
					return {
						...task,
						priority: newBooleanValue,
					}
				} else return task;
			}));
		}
	}

	const [animListRef] = useAutoAnimate();

	return (
		<ul className={styles.taskSection__tasksList} ref={animListRef}>
			{
				typeof activeList === 'number' ?
					optimisticTasks.filter(task => task.listId === activeList).map(task => (
						<TaskCart key={task.taskId}
							title={task.name}
							isComplete={task.isCompleted}
							isPrioritize={task.priority}

							taskClickHandler={() => taskClickHandler(task.taskId)}
							completeChangeHandler={() => completeClickHandler(task.taskId)}
							priorityChangeHandler={() => priorityClickHandler(task.taskId)}
						/>
					)) :
					activeList === 'Planned' ?
						optimisticTasks.filter(task => task.executeDate !== null).map(task => (
							<TaskCart key={task.taskId}
								title={task.name}
								isComplete={task.isCompleted}
								isPrioritize={task.priority}

								taskClickHandler={() => taskClickHandler(task.taskId)}
								completeChangeHandler={() => completeClickHandler(task.taskId)}
								priorityChangeHandler={() => priorityClickHandler(task.taskId)}
							/>
						)) :
						activeList === 'Todays' ?
							optimisticTasks.filter(task => task.executeDate?.getDate() === new Date().getDate()).map(task => (
								<TaskCart key={task.taskId}
									title={task.name}
									isComplete={task.isCompleted}
									isPrioritize={task.priority}

									taskClickHandler={() => taskClickHandler(task.taskId)}
									completeChangeHandler={() => completeClickHandler(task.taskId)}
									priorityChangeHandler={() => priorityClickHandler(task.taskId)}
								/>
							)) :
							optimisticTasks.map(task => (
								<TaskCart key={task.taskId}
									title={task.name}
									isComplete={task.isCompleted}
									isPrioritize={task.priority}

									taskClickHandler={() => taskClickHandler(task.taskId)}
									completeChangeHandler={() => completeClickHandler(task.taskId)}
									priorityChangeHandler={() => priorityClickHandler(task.taskId)}
								/>
							))
			}

		</ul>
	)

}

export default TasksList