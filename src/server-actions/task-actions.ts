'use server'
import prisma from "../../lib/prisma";

export async function createTask(userId: number, name: string, listId: number | null) {
	try {
		const createdTask = await prisma.tasks.create({
			data: {
				userId: userId,
				taskName: name,
				listId: listId,
			}
		});

		if (createdTask) {
			return { success: true, createdTask: createdTask };
		} else {
			return { success: false, message: 'Failed task creation' };
		}
	} catch (error) {
		return {
			success: false,
			message: 'Database error occurred',
			error: error,
		}
	}
}

export async function changeTaskName(taskId: number, newName: string) {
	try {
		const updatedTask = await prisma.tasks.update({
			where: { taskId: taskId },
			data: { taskName: newName }
		});

		if (updatedTask) {
			return { success: true };
		} else {
			return { success: false, message: 'Failed task updating' };
		}
	} catch (error) {
		return {
			success: false,
			message: 'Database error occurred',
			error: error,
		}
	}
}

export async function changeTaskComplete(taskId: number, completeStatus: boolean) {
	try {
		const updatedTask = await prisma.tasks.update({
			where: { taskId: taskId },
			data: { isCompleted: completeStatus }
		});

		if (updatedTask) {
			return { success: true };
		} else {
			return { success: false, message: 'Failed task updating' };
		}
	} catch (error) {
		return {
			success: false,
			message: 'Database error occurred',
			error: error,
		}
	}
}

export async function changeTaskPriority(taskId: number, priorityStatus: boolean) {
	try {
		const updatedTask = await prisma.tasks.update({
			where: { taskId: taskId },
			data: { priority: priorityStatus }
		});

		if (updatedTask) {
			return { success: true };
		} else {
			return { success: false, message: 'Failed task updating' }
		}
	} catch (error) {
		return {
			success: false,
			message: 'Database error occurred',
			error: error,
		}
	}
}

export async function changeTaskNote(taskId: number, note: string) {
	try {
		const updatedTask = await prisma.tasks.update({
			where: { taskId: taskId },
			data: { note: note }
		});

		if (updatedTask) {
			return { success: true };
		} else {
			return { success: false, message: 'Failed task updating' }
		}
	} catch (error) {
		return {
			success: false,
			message: 'Database error occurred',
			error: error,
		}
	}
}

export async function changeTaskExecutionDate(taskId: number, newDate: Date | null) {
	try {
		const updatedTask = await prisma.tasks.update({
			where: { taskId: taskId },
			data: { executeDate: newDate },
		});

		if (updatedTask) {
			return { success: true };
		} else {
			return { success: false, message: 'Failed task updating' }
		}
	} catch (error) {
		return {
			success: false,
			message: 'Database error occurred',
			error: error,
		}
	}
}

export async function deleteTask(taskId: number) {
	try {
		const removedTask = await prisma.tasks.delete({
			where: { taskId: taskId }
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