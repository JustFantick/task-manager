import React from 'react'
import styles from './tabButton.module.scss'
import { motion } from 'framer-motion'

interface TabButtonProps {
	onClickHandler: React.MouseEventHandler<HTMLHeadingElement>,
	text: string,
	isActive: boolean,
}

const TabButton = ({ onClickHandler, text, isActive }: TabButtonProps) => {
	return (
		<motion.h3
			onClick={onClickHandler}
			className={styles.tabButton}

			data-isactive={isActive}
			variants={{
				active: { scale: 1, transition: { duration: 0.3 } },
				disactive: { scale: 0.8, transition: { duration: 0.3 } }
			}}
			animate={isActive ? "active" : "disactive"}
		>
			{text}
		</motion.h3>
	)
}

export default TabButton