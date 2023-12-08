import React from 'react'
import styles from './form.module.scss'

const ForgotPassword = () => {
	function onClickHandler(event: React.MouseEvent) {
		event.preventDefault();
		console.log('clicked');
	}
	return (
		<a className={styles.forgotPassword} href="#" onClick={(e) => onClickHandler(e)}>Forgot password</a>
	)
}

export default ForgotPassword