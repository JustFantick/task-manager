'use client'
import React, { useEffect, useState } from 'react'
import SideMenu from '../side-menu/SideMenu'
import styles from './profilePageWrapper.module.scss'
import MobileSideMenu from '../side-menu/MobileSideMenu'

const ProfilePageWrapper = () => {
	const [isMobile, setIsMobile] = useState<boolean>(true);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(true);

	useEffect(() => {
		window.addEventListener("resize", () => {
			if (window.innerWidth < 1024) {
				setIsMobile(true);
			} else {
				setIsMobile(false);
			}
		});
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