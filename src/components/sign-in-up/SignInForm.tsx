import React, { useState } from 'react'
import styles from './SignInUp.module.scss'
import Input from '../form/Input'
import Checkbox from '../form/Checkbox'
import ForgotPassword from '../form/ForgotPassword'
import SubmitButton from '../form/SubmitButton'

const SignInForm = () => {
	const [loginValue, setLoginValue] = useState('');
	const [passwordValue, setPasswordValue] = useState('');
	const [rememberUser, setRememberUser] = useState(true);

	return (
		<form className={styles.formContainer}>
			<Input
				type='text'
				label='Login'
				isValid={true}
				value={loginValue}
				setValue={setLoginValue}
			/>

			<Input
				type='password'
				label='Password'
				isValid={true}
				value={passwordValue}
				setValue={setPasswordValue}
			/>

			<Checkbox
				label='Remember me'
				value={rememberUser}
				setValue={setRememberUser}
			/>

			<ForgotPassword />

			<SubmitButton title='Authorize' />
		</form>
	)
}

export default SignInForm