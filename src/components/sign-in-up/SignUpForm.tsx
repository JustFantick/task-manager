import React, { useState } from 'react'
import styles from './signInUp.module.scss'
import Input from '../form/Input'
import Checkbox from '../form/Checkbox'
import SubmitButton from '../form/SubmitButton'
import { signUp } from '@/server-actions/form-actions'
import { useRouter } from 'next/navigation'
import { login } from '../../../lib/auth-session'

const SignUpForm = () => {
	const router = useRouter();
	const [reqMessage, setReqMessage] = useState<string>('');

	return (
		<form action={async (formData) => {
			const res = await signUp(formData);

			if (res.success === true && res.userId) {
				await login(res.userId, formData);
				router.push(`/profiles/${res.userId}`);
			} else {
				setReqMessage(res.message);
			}
		}} className={styles.formContainer}>
			<Input
				type='text'
				label='Login'
				name='login'
				pattern='[a-zA-Z0-9]{4,}'
				title='Must contain at least 4 letters or numbers'
			/>

			<Input
				type='email'
				label='Email'
				name='email'
				pattern='[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$'
				title='Must be a valid email address'
			/>

			<Input
				type='password'
				label='Password'
				name='password'
				pattern='[a-zA-Z0-9]{6,}'
				title='Must be at least 6 characters'
			/>

			<Checkbox label='Remember me' name='remember' />

			<SubmitButton title='Register' />

			{reqMessage !== '' && <center style={{ color: 'purple' }}>{reqMessage}*</center>}

		</form>
	)
}

export default SignUpForm