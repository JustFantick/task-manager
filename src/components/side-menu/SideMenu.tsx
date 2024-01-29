'use client'
import React, { startTransition, useEffect, useOptimistic, useState } from 'react'
import HorizontalLine from '../horizontal-line/HorizontalLine'
import TasksListCard from '../tasks-list-card/TasksListCard'
import styles from './sideMenu.module.scss'
import LogOutIcon from '../../../public/log_out.svg'
import CreateListField from '../create-list-field/CreateListField'
import { useRouter } from 'next/navigation'
import { useProfileDataStore } from '@/store/userProfileData'
import { useInteractionStates } from '@/store/interactionStates'
import { createList } from '@/server-actions/lists-actions'
import CustomLists from './CustomLists'

export function getRandomId() {
	return Math.ceil(Math.random() * Math.pow(10, 7));
}

type BasicListNameType = 'Todays' | 'Planned' | 'All tasks';

//basic lists created by default and couldn't be deleted
type BasicListType = {
	id: number,
	name: BasicListNameType,
	filterFunct: () => void,
}

const basicLists: BasicListType[] = [
	{ id: 1, name: 'Todays', filterFunct: () => console.log() },
	{ id: 2, name: 'Planned', filterFunct: () => console.log() },
	{ id: 3, name: 'All tasks', filterFunct: () => console.log() },
];

type ActiveListType = BasicListNameType | number;


const SideMenu = () => {
	const router = useRouter();

	//userLists means custom Lists created by user that could be managed and deleted
	const { userData, userLists, setUserLists, userTasks, setFilteredTasks } = useProfileDataStore();

	const { setChosenListName } = useInteractionStates();

	const [activeList, setActiveList] = useState<ActiveListType>('All tasks');

	function basicListClickHandler(listName: BasicListNameType) {
		setActiveList(listName);

		if (listName === 'Todays') {
			setFilteredTasks(userTasks.filter(task => task.executeDate?.getDate() === new Date().getDate()));

			setChosenListName(new Intl.DateTimeFormat('en-US', {
				month: 'long',
				day: 'numeric',
			}).format(new Date()));
		} else if (listName === 'Planned') {
			setFilteredTasks(userTasks.filter(task => task.executeDate !== null));
			setChosenListName('Planned');
		} else if (listName === 'All tasks') {
			setFilteredTasks(userTasks);
			setChosenListName('All tasks');
		}
	}

	function customListClickhandler(id: number) {
		setActiveList(id);
		setFilteredTasks(userTasks.filter(task => task.listId === id));

		const foundListName = userLists.find(list => list.listId === id)?.name;
		setChosenListName(foundListName === undefined ? 'List not found' : foundListName);
	}

	async function createListHandler(listName: string) {
		const response = await createList(userData.userId, listName);

		if (response.success === true && response.createList) {
			setUserLists([...userLists, {
				listId: response.createList.listId,
				name: response.createList.listName,
			}]);
		} else {
			setUserLists(userLists);
		}
	}

	return (
		<aside className={styles.sideMenu}>
			<div className={styles.sideMenu__body}>

				<div className={styles.sideMenuHeader}>
					<div className={styles.sideMenuHeader__row}>
						<h2>{userData.login}</h2>
						<LogOutIcon className={styles.logOutIcon} onClick={() => router.push('/')} />

					</div>

					<p>{userData.email}</p>

				</div>

				<HorizontalLine />

				<div className={styles.sideMenuBasicLists}>
					{basicLists.map((list, id) => (
						<TasksListCard key={id}
							listName={list.name}
							isActive={activeList === list.name ? true : false}
							onClickHandler={() => basicListClickHandler(list.name)}
						/>
					))}

				</div>

				<HorizontalLine />

				<CustomLists
					listsArr={userLists} setListsArr={setUserLists}
					activeList={activeList} listClickhandler={customListClickhandler}
				/>

				<div className={styles.sideMenuFooter}>
					<HorizontalLine />

					<CreateListField createList={createListHandler} />

				</div>

			</div>

		</aside>
	)
}

export default SideMenu