import React from 'react'
import SideMenu from './SideMenu'
import { AnimatePresence, motion } from 'framer-motion'
import styles from './sideMenu.module.scss'

interface MobileSideMenuProps {
	isOpen: boolean,
	closeMenu: Function,
}

const MobileSideMenu = ({ isOpen, closeMenu }: MobileSideMenuProps) => {
	function closeMenuHandler(e: React.MouseEvent) {
		const el = e.target as HTMLElement;
		if (!el.closest('#menu-body')) closeMenu();
	}

	return (
		<AnimatePresence>
			{
				isOpen &&

				<motion.div
					onClick={closeMenuHandler}
					className={styles.mobileSideMenu}
					key="menu-wrapper"
					initial={{ backgroundColor: 'rgba(0,0,0, 0)' }}
					animate={{ backgroundColor: 'rgba(0,0,0, 0.5)' }}
					exit={{ backgroundColor: 'rgba(0,0,0, 0)' }}

				>
					<motion.div
						id='menu-body'
						initial={{ x: '-100%' }}
						animate={{ x: 0 }}
						exit={{ x: '-100%' }}
						transition={{ type: 'tween' }}
					>
						<SideMenu />
					</motion.div>

				</motion.div>
			}
		</AnimatePresence>
	)
}

export default MobileSideMenu