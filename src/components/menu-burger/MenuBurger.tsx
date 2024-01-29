import React from 'react'
import styles from './menuBurger.module.scss'

interface MenuBurgerProps {
	onClickHandler: () => void,
}

const MenuBurger = ({ onClickHandler }: MenuBurgerProps) => {
	return (
		<button type='button' title='menu-burger'
			className={styles.menuBurger}
			onClick={onClickHandler}
		>
			<span></span>
			<span></span>
			<span></span>
		</button>
	)
}

export default MenuBurger