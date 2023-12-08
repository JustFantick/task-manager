'use client'
import React, { useState } from 'react'
import styles from './SignInUp.module.scss'
import TabButton from './tab-button/TabButton'
import SignInForm from './SignInForm'
import SignUpForm from './SignUpForm'

const SignInUp = () => {
	const [activeTabIndex, setActiveTabIndex] = useState(0);

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
				{
					activeTabIndex === 0 ? <SignInForm /> : <SignUpForm />
				}

			</div>

		</div>
	)
}

export default SignInUp