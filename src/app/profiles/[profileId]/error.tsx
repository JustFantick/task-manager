'use client'
import React from 'react'
import styles from './errorPage.module.scss'

const ErrorPage = ({ error }: { error: Error }) => {
	return (
		<div className={styles.errorWrapper}>
			<details className={styles.tabWrapper}>
				<summary className={styles.tabWrapper__summary}>Something went wrong</summary>
				<p className={styles.tabWrapper__message}>{error.message}</p>
			</details>
		</div>
	)
}

export default ErrorPage