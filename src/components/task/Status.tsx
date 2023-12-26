"use client"
import React, { MouseEventHandler } from 'react'
import styles from './taskCart.module.scss'
import AnimatedCheckmark from './AnimatedCheckmark'

type AdaptSizeType = {
	pc: number,
	mb: number,
}

interface StatusProps {
	isComplete: boolean,
	onClickHandler?: MouseEventHandler,
	adaptSize?: AdaptSizeType,
}

const Status = ({
	isComplete,
	onClickHandler,
	adaptSize = { pc: 24, mb: 20 }
}: StatusProps) => {
	const calcFormula = 'calc(' + adaptSize.mb + 'px' + ' + (' + adaptSize.pc + ' - ' + adaptSize.mb + ') * ((100vw - 320px) / (1920 - 320)))';

	return (
		<div className={styles.status} onClick={onClickHandler} style={{
			width: calcFormula,
			height: calcFormula,
		}}>
			<AnimatedCheckmark isVisible={isComplete} />

		</div>
	)
}

export default Status