'use client'
import React, { useState } from 'react'
import styles from './signInUp.module.scss'
import TabButton from './tab-button/TabButton'
import { AnimatePresence, MotionProps } from 'framer-motion'
import HorizontalLine from '../horizontal-line/HorizontalLine'
import { MotionCustomForm, FormType } from './CustomForm'

const SignInUp = () => {
	const [activeTabType, setActiveTabType] = useState<FormType>('login');

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
					onClickHandler={() => setActiveTabType('login')}
					isActive={activeTabType === 'login' ? true : false}
					text="Login"
				/>

				<TabButton
					onClickHandler={() => setActiveTabType('register')}
					isActive={activeTabType === 'register' ? true : false}
					text="Register"
				/>

			</div>

			<HorizontalLine />

			<div>
				<AnimatePresence mode='wait'>
					{
						<MotionCustomForm
							type={activeTabType}
							key={`${activeTabType}-form`}
							{...animOptions(activeTabType === 'login' ? 'left' : 'right')}
						/>
					}

				</AnimatePresence>
			</div>

		</div>
	)
}

export default SignInUp