import React from 'react'
import PopupContainer from '@/components/popup-container/PopupContainer'
import styles from './forgotPassPopup.module.scss'

interface ForgotPassPopupProps {
	isOpen: boolean,
	closePopup: () => void,
	sendPasswordFunc: () => void,
}

const ForgotPassPopup = ({ isOpen, closePopup, sendPasswordFunc }: ForgotPassPopupProps) => {
	return (
		<PopupContainer
			isOpen={isOpen}
			closePopup={() => closePopup()}
			contentAppearance='middleDialogWindow'
		>
			<div className={styles.popupContent}>
				<h4>Forgot password?</h4>
				<p>We could send yours password on the email this account was registered.</p>
				<div className={styles.popupContent__buttons}>
					<button type='button' className={styles.cancelBtn} onClick={() => closePopup()}>Cancel</button>
					<button type='button' className={styles.actionBtn} onClick={() => sendPasswordFunc()}>
						Send password
					</button>

				</div>

			</div>

		</PopupContainer>
	)
}

export default ForgotPassPopup