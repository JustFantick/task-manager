'use client'
import React, { useEffect, useState } from 'react'
import SideMenu from '../side-menu/SideMenu'
import styles from './profilePageWrapper.module.scss'
import MobileSideMenu from '../side-menu/MobileSideMenu'
import TasksSection from '../tasks-section/TasksSection'
import TaskPopup from '../task-popup/TaskPopup'
import { useInteractionStates } from '@/store/interactionStates'

const ProfilePageWrapper = () => {
	const { isMobile, setIsMobile, isSideMenuOpen, setIsSideMenuOpen, isTaskPopupOpen } = useInteractionStates();

	function defineDeviceType() {
		if (window.innerWidth < 1024) {
			setIsMobile(true);
		} else {
			setIsMobile(false);
		}
	}

	useEffect(() => {
		defineDeviceType();
		window.addEventListener("resize", defineDeviceType);
	}, []);

	return (
		<div style={{ display: 'flex' }}>
			{
				isMobile ?
					<MobileSideMenu isOpen={isSideMenuOpen} closeMenu={() => setIsSideMenuOpen(false)} />
					:
					<SideMenu />
			}

			<TasksSection />

			<TaskPopup />

		</div>
	)
}

export default ProfilePageWrapper