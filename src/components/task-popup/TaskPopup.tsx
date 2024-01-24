import React, { useState } from 'react'
import styles from './taskPopup.module.scss'
import { useProfileDataStore } from '@/store/userProfileData'
import HorizontalLine from '../horizontal-line/HorizontalLine'
import ArrowLeftIcon from '../../../public/arrow_left.svg'
import BinIcon from '../../../public/bin.svg'
import NoteSection from './NoteSection'
import TaskSection from './TaskSection'

const TaskPopup = () => {
	const { taskPopupId } = useProfileDataStore();
	const [note, setNote] = useState<string>('');

	function check(str: string | null) {
		console.log(str);
	}

	return (
		<div className={styles.taskPopup}>
			<div className={styles.taskPopupContent}>
				<div className={styles.taskPopupContent__dataSections}>
					<TaskSection
						taskName='fake task'
						onTaskNameChange={check}
						isTaskComplete={true}
						onTaskCompleteChange={() => console.log('task complete')}

						stepsList={[
							{
								stepId: 1,
								stepName: 'frst step',
								isCompleted: false,
							},
							{
								stepId: 2,
								stepName: 'scnd step',
								isCompleted: true,
							}
						]}
						onStepNameChange={() => console.log('step name')}
						onStepCompleteChange={() => console.log('step complete')}

						stepDeleteHandler={() => console.log('delete step')}
						stepCreateHandler={()=> console.log()}
					/>

					<NoteSection note={note} setNote={setNote} />

				</div>


				<HorizontalLine />
				<div className={styles.taskPopupContent__footer}>
					<ArrowLeftIcon className={styles.arrowLeftIcon} onClick={() => console.log('arrow')} />

					<div>Last edit: <time dateTime=''>20:00</time> </div>

					<BinIcon className={styles.binIcon} onClick={() => console.log('bin')} />

				</div>

			</div>

		</div>
	)
}

export default TaskPopup