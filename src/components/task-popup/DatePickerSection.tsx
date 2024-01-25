import React from 'react'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'

interface DatePickerSectionProps {
	dateValue: Date | null,
	setDateValue: (newValue: Date | null) => void,
}

const DatePickerSection = ({ dateValue, setDateValue }: DatePickerSectionProps) => {
	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<DatePicker
				label="Execution date"
				defaultValue={dateValue ? dateValue : null}
				onChange={(val) => setDateValue(dayjs(val).toDate())}

				slotProps={{
					field: { clearable: true, onClear: () => setDateValue(null) },
				}}

				sx={{
					backgroundColor: 'rgb(57, 58, 60)',
					borderRadius: '10px',
					"& *": { color: 'whitesmoke !important', borderColor: 'transparent !important' },
					"&.Mui-focused *": { color: 'whitesmoke !important', borderColor: 'whitesmoke !important' },
				}}
			/>

		</LocalizationProvider>
	)
}

export default DatePickerSection