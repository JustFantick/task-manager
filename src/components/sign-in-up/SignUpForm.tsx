import React, { useState } from 'react'
import styles from './SignInUp.module.scss'
import Input from '../form/Input'
import Checkbox from '../form/Checkbox'
import SubmitButton from '../form/SubmitButton'

const SignUpForm = () => {
	const [loginValue, setLoginValue] = useState('');
	const [passwordValue, setPasswordValue] = useState('');
	const [emailValue, setEmailValue] = useState('');
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
				type='email'
				label='Email'
				isValid={true}
				value={emailValue}
				setValue={setEmailValue}
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

			<SubmitButton title='Register' />

		</form>
	)
}

export default SignUpForm