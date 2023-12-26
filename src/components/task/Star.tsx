"use client"
import React, { MouseEventHandler, useState } from 'react'
import styles from './taskCart.module.scss'
import StarIcon from '../../../public/star.svg'

interface StarProps {
	isComplete: boolean,
	onClickHandler?: MouseEventHandler,
}

const Star = ({ isComplete, onClickHandler }: StarProps) => {
	return (
		<div onClick={onClickHandler}>
			<StarIcon className={styles.star} data-isprioritized={isComplete} />
		</div>
	)
}

export default Star