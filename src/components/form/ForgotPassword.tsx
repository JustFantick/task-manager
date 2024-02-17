import React from 'react'
import styles from './form.module.scss'

const ForgotPassword = ({ clickHandler }: { clickHandler: () => void }) => {
	return (
		<button type='button' className={styles.forgotPassword} onClick={() => clickHandler()}>
			Forgot password
		</button>
	)
}

export default ForgotPassword