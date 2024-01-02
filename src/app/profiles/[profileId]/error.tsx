'use client'
import React from 'react'

const ErrorPage = ({ error }: { error: Error }) => {
	return (
		<div style={{
			height: '100%',
			width: '100%',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
		}}>
			<h1>Something went wrong</h1>
		</div>
	)
}

export default ErrorPage