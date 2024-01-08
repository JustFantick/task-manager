'use server'
import prisma from "../../lib/prisma";
import { revalidatePath } from "next/cache";

export async function createList(userId: number, listName: string) {
	try {
		const createdList = await prisma.lists.create({
			data: {
				userId: userId,
				listName: listName,
			}
		})

		revalidatePath('/');

		return { success: true };
	} catch (error) {
		return {
			success: false,
			message: 'Database error occurred',
			error: error,
		}
	}
}