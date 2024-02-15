import React from 'react'
import prisma from '../../../../lib/prisma'
import SideMenu from '@/components/side-menu/SideMenu';
import StoreInitializer from '@/components/store-initializer/StoreInitializer';
import ProfilePageWrapper from '@/components/profile-page-wrapper/ProfilePageWrapper';

interface ProfilePageProps {
	params: { profileId: string },
}

const ProfilePage = async ({ params }: ProfilePageProps) => {
	const parsedProfileId = parseInt(params.profileId);
	
	const profileData = await prisma.users.findFirst({ where: { userId: parsedProfileId } });
	const profileTasks = await prisma.tasks.findMany({ where: { userId: parsedProfileId } });
	const profileLists = await prisma.lists.findMany({ where: { userId: parsedProfileId } });
	const profileSteps = await prisma.steps.findMany({ where: { taskId: { in: profileTasks.map(task => task.taskId) } } });

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
			steps: profileSteps.filter(step => step.taskId === task.taskId).map(step => {
				return {
					stepId: step.stepId,
					stepName: step.stepName,
					isCompleted: step.isCompleted,
				}
			}),
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
						}
					})
				}
			>
				<ProfilePageWrapper />

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