'use client'
import React, { useState } from 'react'
import styles from './signInUp.module.scss'
import TabButton from './tab-button/TabButton'
import { AnimatePresence, MotionProps } from 'framer-motion'
import HorizontalLine from '../horizontal-line/HorizontalLine'
import { MotionCustomForm } from './CustomForm'

const SignInUp = () => {
	const [activeTabIndex, setActiveTabIndex] = useState(0);

	function animOptions(direction: 'left' | 'right'): MotionProps {
		return {
			transition: { duration: 0.3, type: 'spring' },
			animate: { opacity: 1, x: 0 },
			initial: { opacity: 0, x: direction === 'left' ? -100 : 100 },
			exit: { opacity: 0, x: direction === 'left' ? -100 : 100 },
		}
	}

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

			<HorizontalLine />

			<div>
				<AnimatePresence mode='wait'>
					{
						activeTabIndex === 0 ? (
							<MotionCustomForm
								type='login'
								key='login-form'
								{...animOptions('left')}
							/>
						) : (
							<MotionCustomForm
								type='register'
								key='register-form'
								{...animOptions('right')}
							/>
						)
					}

				</AnimatePresence>
			</div>

		</div>
	)
}

export default SignInUp