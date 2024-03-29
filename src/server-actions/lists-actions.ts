'use server'
import prisma from "../../lib/prisma";

export async function createList(userId: number, listName: string) {
	try {
		const createdList = await prisma.lists.create({
			data: {
				userId: userId,
				listName: listName,
			}
		})

		if (createdList) {
			return { success: true, createList: createdList };
		} else {
			return { success: false, message: 'Failed list creation' }
		}
	} catch (error) {
		return {
			success: false,
			message: 'Database error occurred',
			error: error,
		}
	}
}

export async function renameList(listId: number, newName: string) {
	try {
		const updatedList = await prisma.lists.update({
			where: { listId: listId },
			data: { listName: newName }
		})

		if (updatedList) {
			return { success: true };
		} else {
			return { success: false, message: 'Failed list update' }
		}
	} catch (error) {
		return {
			success: false,
			message: 'Database error occurred',
			error: error,
		}
	}
}

export async function removeList(listId: number) {
	try {
		const removedList = await prisma.lists.delete({
			where: {
				listId: listId,
			}
		})

		return { success: true };
	} catch (error) {
		return {
			success: false,
			message: 'Database error occurred',
			error: error,
		}
	}
}