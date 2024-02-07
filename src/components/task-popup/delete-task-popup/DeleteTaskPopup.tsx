import React from 'react'
import styles from './deleteTaskPopup.module.scss'
import { AnimatePresence, motion } from 'framer-motion'

interface DeleteTaskPopupProps {
  taskName: string,
  isOpen: boolean,
  setIsOpen: (status: boolean) => void,
  deleteTask: () => void,
}
const DeleteTaskPopup = ({ taskName, isOpen, setIsOpen, deleteTask }: DeleteTaskPopupProps) => {
  return (
    <AnimatePresence>
      {isOpen &&
        <motion.div className={styles.deleteTaskPopup}
          key='detele-task-popup'
          onClick={(e) => {
            const el = e.target as HTMLElement;
            if (!el.closest('#delete-task-popup-content')) setIsOpen(false);
          }}
          initial={{ backgroundColor: 'rgba(0,0,0, 0)' }}
          animate={{ backgroundColor: 'rgba(0,0,0, 0.5)' }}
          exit={{ backgroundColor: 'rgba(0,0,0, 0)' }}
        >
          <motion.div className={styles.deleteTaskPopup__body}
            id='delete-task-popup-content'
            initial={{ opacity: 0, scale: 0.9, }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', duration: 0.3 }}
          >
            <h4 className={styles.title}>Delete task</h4>
            <p className={styles.detailsInfo}>Are you sure you want to delete this task?</p>
            <div className={styles.deleteTaskPopup__buttons}>
              <button type='button' className={styles.cancelBtn} onClick={() => setIsOpen(false)}>Cancel</button>
              <button type='button' className={styles.deleteBtn} onClick={() => {
                deleteTask();
                setIsOpen(false);
              }}>Delete</button>
            </div>

          </motion.div>

        </motion.div>
      }

    </AnimatePresence>
  )
}

export default DeleteTaskPopup