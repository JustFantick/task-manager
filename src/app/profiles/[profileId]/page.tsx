import React from 'react'
import prisma from '../../../../lib/prisma'
import SideMenu from '@/components/side-menu/SideMenu';
import StoreInitializer from '@/components/store-initializer/StoreInitializer';

interface ProfilePageProps {
	params: { profileId: string },
}

const ProfilePage = async ({ params }: ProfilePageProps) => {
	const parsedProfileId = parseInt(params.profileId);
	const profileData = await prisma.users.findFirst({ where: { userId: parsedProfileId } });
	const profileTasks = await prisma.tasks.findMany({ where: { userId: parsedProfileId } });
	const profileLists = await prisma.lists.findMany({ where: { userId: parsedProfileId } });

	const tasksToStore = profileTasks.map((task) => {
		return {
			taskId: task.taskId,
			name: task.taskName,
			note: task.note,
			isCompleted: task.isCompleted,
			priority: task.priority,
			editTime: task.editTime,
			executeDate: task.executeDate,
			listId: task.listId,
		}
	});

	if (profileData !== null) {
		return (
			<StoreInitializer
				userData={{
					userId: profileData.userId,
					login: profileData.login,
					email: profileData.email
				}}
				userTasks={tasksToStore}
				filteredTasks={tasksToStore}
				userLists={
					profileLists.map(list => {
						return {
							listId: list.listId,
							name: list.listName,
							isActive: false
						}
					})
				}
			>
				<SideMenu />

			</StoreInitializer>
		)

	} else return (
		<div style={{
			height: '100%',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
		}}>
			<h2>User not found</h2>
		</div>
	)
}

export default ProfilePage