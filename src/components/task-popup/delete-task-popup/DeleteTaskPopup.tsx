import React from 'react'
import styles from './deleteTaskPopup.module.scss'
import PopupContainer from '@/components/popup-container/PopupContainer'

interface DeleteTaskPopupProps {
  taskName: string,
  isOpen: boolean,
  setIsOpen: (status: boolean) => void,
  deleteTask: () => void,
}

const DeleteTaskPopup = ({ taskName, isOpen, setIsOpen, deleteTask }: DeleteTaskPopupProps) => {
  return (
    <PopupContainer
      isOpen={isOpen}
      closePopup={() => setIsOpen(false)}
      contentAppearance='middleDialogWindow'
    >
      <div className={styles.deleteTaskPopup__body}>
        <h4 className={styles.title}>Delete task</h4>
        <p className={styles.detailsInfo}>Are you sure you want to delete this task?</p>
        <div className={styles.deleteTaskPopup__buttons}>
          <button type='button' className={styles.cancelBtn} onClick={() => setIsOpen(false)}>Cancel</button>
          <button type='button' className={styles.deleteBtn} onClick={() => {
            deleteTask();
            setIsOpen(false);
          }}>Delete</button>

        </div>

      </div>
    </PopupContainer>
  )
}

export default DeleteTaskPopup