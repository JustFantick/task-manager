'use client'
import React from 'react'
import { UserData, Task, List, useProfileDataStore } from '@/store/userProfileData';

interface StoreInitializerProps {
	children: React.ReactNode,

	userData: UserData,
	userTasks: Task[],
	filteredTasks: Task[],
	userLists: List[],
}


const StoreInitializer = ({ children, userData, userTasks, filteredTasks, userLists }: StoreInitializerProps) => {
	useProfileDataStore.setState({
		userData: userData,
		userTasks: userTasks,
		filteredTasks: filteredTasks,
		userLists: userLists,
	});

	return (children);
}

export default StoreInitializer