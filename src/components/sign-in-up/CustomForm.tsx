import React, { useState, forwardRef, Ref, useRef } from 'react'
import styles from './signInUp.module.scss'
import Input from '../form/Input'
import Checkbox from '../form/Checkbox'
import SubmitButton from '../form/SubmitButton'
import { signUp, signIn } from '@/server-actions/form-actions'
import { useRouter } from 'next/navigation'
import { login } from '../../../lib/auth-session'
import ForgotPassword from '../form/ForgotPassword'
import { motion } from 'framer-motion'
import ForgotPassPopup from './forgot-pass-popup/ForgotPassPopup'
import { sendPasswordOnEmail } from '@/server-actions/mail-actions'

export type FormType = 'login' | 'register';

const CustomForm = forwardRef(function CustomForm({ type }: { type: FormType }, ref: Ref<HTMLFormElement>) {
	const router = useRouter();
	const [reqMessage, setReqMessage] = useState<string>('');

	const [isForgotPassPopupOpen, setIsForgotPassPopupOpen] = useState(false);
	const loginInputRef = useRef<HTMLInputElement>(null);

	return (
		<>
			<form action={async (formData) => {
				const serverFn = type === 'login' ? signIn : signUp;
				const res = await serverFn(formData);

				if (res.success === true && res.userId) {
					await login(res.userId, formData);
					router.push(`/profiles/${res.userId}`);
				} else {
					setReqMessage(res.message);
				}
			}}
				className={styles.formContainer}
				ref={ref}
			>
				<Input
					type='text'
					label='Login'
					name='login'
					pattern='[a-zA-Z0-9]{4,}'
					title='Must contain at least 4 letters or numbers'
					ref={loginInputRef}
				/>

				{type === 'register' && (
					<Input
						type='email'
						label='Email'
						name='email'
						pattern='[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$'
						title='Must be a valid email address'
					/>
				)}

				<Input
					type='password'
					label='Password'
					name='password'
					pattern='[a-zA-Z0-9]{6,}'
					title='Must be at least 6 characters'
				/>

				<Checkbox label='Remember me' name='remember' />

				{type === 'login' && (
					<ForgotPassword clickHandler={() => {
						if (loginInputRef.current?.value === '') {
							setReqMessage("Please fill out the login field");
							return;
						}
						setIsForgotPassPopupOpen(true);
					}} />
				)}

				<SubmitButton title={type === 'login' ? 'Sign in' : 'Register'} />

				{reqMessage !== '' && <center style={{ color: 'purple' }}>{reqMessage}*</center>}

			</form>

			<ForgotPassPopup
				isOpen={isForgotPassPopupOpen}
				closePopup={() => setIsForgotPassPopupOpen(false)}
				sendPasswordFunc={async () => {
					if (!loginInputRef.current?.value || loginInputRef.current.value.length < 4) {
						setReqMessage('Login must contain at least 4 letters or numbers');
						return;
					}

					setIsForgotPassPopupOpen(false);

					setReqMessage('Processing action');
					const res = await sendPasswordOnEmail(loginInputRef.current.value);
					setReqMessage(res.message);
				}}
			/>
		</>
	)
});

export default CustomForm;
export const MotionCustomForm = motion(CustomForm, { forwardMotionProps: true });