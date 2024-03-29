'use client'
import React from 'react'
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
import { logout } from '../../../lib/auth-session'

export function getRandomId() {
	return Math.ceil(Math.random() * Math.pow(10, 7));
}

export type BasicListNameType = 'Todays' | 'Planned' | 'All tasks';

//basic lists created by default and couldn't be deleted
type BasicListType = {
	id: number,
	name: BasicListNameType,
}

const basicLists: BasicListType[] = [
	{ id: 1, name: 'Todays' },
	{ id: 2, name: 'Planned' },
	{ id: 3, name: 'All tasks' },
];

const SideMenu = () => {
	const router = useRouter();

	//userLists means custom Lists created by user that could be managed and deleted
	const { userData, userLists, setUserLists, userTasks } = useProfileDataStore();

	const { setChosenListName, activeList, setActiveList } = useInteractionStates();

	function basicListClickHandler(listName: BasicListNameType) {
		setActiveList(listName);

		if (listName === 'Todays') {
			//Instead of displaying "Todays" text, show current date
			setChosenListName(new Intl.DateTimeFormat('en-US', {
				month: 'long',
				day: 'numeric',
			}).format(new Date()));
		} else if (listName === 'Planned') {
			setChosenListName('Planned');
		} else if (listName === 'All tasks') {
			setChosenListName('All tasks');
		}
	}

	function customListClickhandler(id: number) {
		setActiveList(id);

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
						<LogOutIcon className={styles.logOutIcon} onClick={async () => {
							await logout();
							router.push('/');
						}} />

					</div>

					<a href={`mailto:${userData.email}`}>{userData.email}</a>

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
					activeList={activeList} setActiveList={setActiveList}
					listClickhandler={customListClickhandler}
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