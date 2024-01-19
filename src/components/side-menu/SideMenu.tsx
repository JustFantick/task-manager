'use client'
import React, { useOptimistic, useState } from 'react'
import HorizontalLine from '../horizontal-line/HorizontalLine'
import TasksListCard from '../tasks-list-card/TasksListCard'
import styles from './sideMenu.module.scss'
import LogOutIcon from '../../../public/log_out.svg'
import CreateListField from '../create-list-field/CreateListField'
import { useRouter } from 'next/navigation'
import { useProfileDataStore } from '@/store/userProfileData'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { removeList, createList } from '@/server-actions/lists-actions'

export function getRandomId() {
	return Math.ceil(Math.random() * Math.pow(10, 7));
}

const SideMenu = () => {
	const [animListRef] = useAutoAnimate();

	const router = useRouter();
	const { userData, userLists, setUserLists } = useProfileDataStore();
	const [optimisticLists, setOptimisticLists] = useOptimistic(userLists);

	const [basicLists, setBasicLists] = useState([
		{ name: 'Todays', isActive: true },
		{ name: 'Planned', isActive: false },
		{ name: 'All tasks', isActive: false },
	]);

	function basicListClickHandler(listName: string) {
		setOptimisticLists(userLists.map(li => {
			return { ...li, isActive: false };
		}));
		setUserLists(userLists.map(li => {
			return { ...li, isActive: false };
		}));

		setBasicLists(basicLists.map(li => {
			if (li.name === listName) {
				return { ...li, isActive: true };
			} else return { ...li, isActive: false };
		}));
	}

	function customListsClickHandler(listId: number) {
		setBasicLists(basicLists.map(li => {
			return { ...li, isActive: false };
		}));

		const updatedListsArr = optimisticLists.map(li => {
			if (li.listId === listId) {
				return { ...li, isActive: true };
			} else return { ...li, isActive: false };
		});

		setOptimisticLists(updatedListsArr);
		setUserLists(updatedListsArr);
	}

	async function removeListHandler(listId: number) {
		const updatedListsArr = optimisticLists.filter(list => list.listId !== listId);
		setOptimisticLists(updatedListsArr);

		const response = await removeList(listId);

		if (response.success === true) {
			setUserLists(updatedListsArr);
		} else {
			setUserLists(userLists);
		}
	}

	async function createListHandler(listName: string) {
		const inactiveLists = optimisticLists.map(li => {
			return { ...li, isActive: false };
		});
		setBasicLists(basicLists.map(li => {
			return { ...li, isActive: false };
		}));
		setOptimisticLists([...inactiveLists, {
			listId: getRandomId(),
			name: listName,
			isActive: true,
		}]);

		const response = await createList(userData.userId, listName);

		if (response.success === true && response.createList) {
			setUserLists([...inactiveLists, {
				listId: response.createList.listId,
				name: response.createList.listName,
				isActive: true,
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
							isActive={list.isActive}
							onClickHandler={() => basicListClickHandler(list.name)}
						/>
					))}

				</div>

				<HorizontalLine />

				<div className={styles.sideMenuCustomLists} ref={animListRef}>
					{optimisticLists.map(list => (
						<TasksListCard key={list.listId}
							listName={list.name}
							isActive={list.isActive}
							onClickHandler={() => customListsClickHandler(list.listId)}
							removeListHandler={() => removeListHandler(list.listId)}
						/>
					))}
				</div>


				<div className={styles.sideMenuFooter}>
					<HorizontalLine />

					<CreateListField createList={createListHandler} />

				</div>

			</div>

		</aside>
	)
}

export default SideMenu