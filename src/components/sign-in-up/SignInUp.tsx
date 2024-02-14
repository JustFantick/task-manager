'use client'
import React, { useState } from 'react'
import styles from './signInUp.module.scss'
import TabButton from './tab-button/TabButton'
import SignInForm from './SignInForm'
import SignUpForm from './SignUpForm'
import { AnimatePresence, motion } from 'framer-motion'

const SignInUp = () => {
	const [activeTabIndex, setActiveTabIndex] = useState(0);

	//animate tabs appearance
	const slideLeft = { opacity: 0, x: -100 }
	const slideRight = { opacity: 0, x: 100 }

	const tabsArray = [
		<SignInForm />,
		<SignUpForm />
	];

	return (
		<div className={styles.signInUpContainer}>
			<div className={styles.tabsContainer}>
				<TabButton
					onClickHandler={() => setActiveTabIndex(0)}
					isActive={activeTabIndex === 0 ? true : false}
					text="Login"
				/>

				<TabButton
					onClickHandler={() => setActiveTabIndex(1)}
					isActive={activeTabIndex === 1 ? true : false}
					text="Register"
				/>

			</div>

			<div className={styles.horizontalLine}></div>

			<div>
				<AnimatePresence mode='wait'>
					<motion.div
						key={activeTabIndex}

						transition={{ duration: 0.3, type: 'spring' }}
						initial={activeTabIndex ? slideRight : slideLeft}
						animate={{ opacity: 1, x: 0 }}
						exit={activeTabIndex ? slideRight : slideLeft}
					>
						{tabsArray[activeTabIndex]}
					</motion.div>

				</AnimatePresence>

			</div>

		</div>
	)
}

export default SignInUp