import React from 'react'
import styles from './mainTitle.module.scss'

interface MainTitleProps {
  onClickHandler?: React.MouseEventHandler<HTMLHeadingElement>,
  text: string,
}

const MainTitle = ({ onClickHandler, text }: MainTitleProps) => {
  return (
    <h2 className={styles.mainTitle} onClick={onClickHandler}>{text}</h2>
  )
}

export default MainTitle;