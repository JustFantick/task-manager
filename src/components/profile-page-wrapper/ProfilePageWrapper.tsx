'use client'
import React, { useEffect, useState } from 'react'
import SideMenu from '../side-menu/SideMenu'
import styles from './profilePageWrapper.module.scss'
import MobileSideMenu from '../side-menu/MobileSideMenu'

const ProfilePageWrapper = () => {
	const [isMobile, setIsMobile] = useState<boolean>(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

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
		<>
			{
				isMobile ?
					<MobileSideMenu isOpen={isMobileMenuOpen} closeMenu={() => setIsMobileMenuOpen(false)} />
					:
					<SideMenu />
			}

		</>
	)
}

export default ProfilePageWrapper