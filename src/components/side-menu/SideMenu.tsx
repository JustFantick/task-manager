'use client'
import React from 'react'
import HorizontalLine from '../horizontal-line/HorizontalLine'
import TasksListCard from '../tasks-list-card/TasksListCard'
import styles from './sideMenu.module.scss'
import LogOutIcon from '../../../public/log_out.svg'
import CreateListField from '../create-list-field/CreateListField'
import { useRouter } from 'next/navigation'

interface SideMenuProps {
	login?: string,
	email?: string,
}

const SideMenu = ({ login, email }: SideMenuProps) => {
	const router = useRouter();

	return (
		<aside className={styles.sideMenu}>
			<div className={styles.sideMenu__body}>

				<div className={styles.sideMenuHeader}>
					<div className={styles.sideMenuHeader__row}>
						<h2>{login}</h2>
						<LogOutIcon className={styles.logOutIcon} onClick={() => router.push('/')} />

					</div>

					<p>{email}</p>

				</div>

				<HorizontalLine />

				<div className={styles.sideMenuBasicLists}>
					<TasksListCard listName='Todays tasks' listItemsNumber={3} isActive={true} />
					<TasksListCard listName='Planned tasks' listItemsNumber={5} />
					<TasksListCard listName='All tasks' listItemsNumber={10} />

				</div>

				<HorizontalLine />

				<div className={styles.sideMenuCustomLists}>
					{/* place custom list later */}
				</div>


				<div className={styles.sideMenuFooter}>
					<HorizontalLine />

					<CreateListField />

				</div>

			</div>

		</aside>
	)
}

export default SideMenu