import React, { startTransition, useEffect, useOptimistic } from 'react'
import styles from './sideMenu.module.scss'
import TasksListCard from '../tasks-list-card/TasksListCard'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { List } from '@/store/userProfileData'
import { removeList } from '@/server-actions/lists-actions'

interface CustomListsProps {
	listsArr: List[],
	setListsArr: (arr: List[]) => void,
	activeList: string | number,
	listClickhandler: (id: number) => void,
}

const CustomLists = ({
	listsArr, setListsArr,
	activeList, listClickhandler
}: CustomListsProps) => {
	const [animListRef] = useAutoAnimate();

	//when global listsArr from store got updated - update this 'optimisticLists' too
	useEffect(() => {
		startTransition(() => setOptimisticLists(listsArr));
	}, [listsArr]);

	const [optimisticLists, setOptimisticLists] = useOptimistic(
		listsArr,
		(state, newArr: List[]) => newArr,
	);

	async function removeListHandler(listId: number) {
		startTransition(() => setOptimisticLists(optimisticLists.filter(list => list.listId !== listId)));

		const response = await removeList(listId);
		if (response.success) {
			await setListsArr(listsArr.filter(list => list.listId !== listId));
		} else {
			await setListsArr(listsArr);
		}
	}

	return (
		<div className={styles.sideMenuCustomLists} ref={animListRef}>
			{optimisticLists.map(list => (
				<TasksListCard key={list.listId}
					listName={list.name}
					isActive={typeof activeList !== 'string' && activeList === list.listId}
					onClickHandler={() => listClickhandler(list.listId)}
					removeListHandler={() => removeListHandler(list.listId)}
				/>
			))}
		</div>)
}

export default CustomLists