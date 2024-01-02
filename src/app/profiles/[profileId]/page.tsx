import React from 'react'
import prisma from '../../../../lib/prisma'

interface ProfilePageProps {
	params: {
		profileId: string,
	},
}

const PrifilePage = async ({ params }: ProfilePageProps) => {
	
	const profileData = await prisma.users.findFirst({
		where: {
			user_id: parseInt(params.profileId),
		}
	});

	console.log(profileData);

	return (
		<div>
			<h1>Profile page</h1>

			<ul>
				<li>user id: {profileData?.user_id}</li>
				<li>login: {profileData?.login}</li>
				<li>email: {profileData?.email}</li>
				<li>password: {profileData?.password}</li>
			</ul>
		</div>
	)
}

export default PrifilePage