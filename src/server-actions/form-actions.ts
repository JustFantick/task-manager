'use server'
import prisma from "../../lib/prisma";
import { revalidatePath } from "next/cache";

export async function signIn(formData: FormData) {
	const userClientData = {
		login: formData.get('login'),
		password: formData.get('password'),
	}

	try {
		const userDbData = await prisma.users.findFirst({
			where: { login: userClientData.login as string }
		});

		revalidatePath('/');

		if (userDbData === null) {
			return {
				success: false,
				message: 'User not found',
			};
		} else if (userClientData.password !== userDbData.password) {
			return {
				success: false,
				message: 'Incorrect password',
			}
		} else {
			return {
				success: true,
				message: 'Authorization successful',
				userId: userDbData.userId,
			}
		}

	} catch (error) {
		return {
			success: false,
			message: 'Database error occurred',
			error: error,
		}
	}
}

export async function signUp(formData: FormData) {
	const userClientData = {
		login: formData.get('login'),
		password: formData.get('password'),
		email: formData.get('email'),
	}

	try {
		const findUser = await prisma.users.findFirst({
			where: { login: userClientData.login as string }
		});

		revalidatePath('/');

		if (findUser !== null) return {
			success: false,
			message: 'User already exist',
		}

		const createdUser = await prisma.users.create({
			data: {
				login: userClientData.login as string,
				password: userClientData.password as string,
				email: userClientData.email as string,
			}
		});

		return {
			success: true,
			message: 'Registered successfully',
			userId: createdUser.userId,
		}

	} catch (error) {
		return {
			success: false,
			message: 'Database error occurred',
			error: error,
		}
	}
}