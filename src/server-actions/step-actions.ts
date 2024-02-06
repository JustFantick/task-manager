'use server'
import prisma from "../../lib/prisma";

export async function changeStepName(stepId: number, newName: string) {
	try {
		const updatedStep = await prisma.steps.update({
			where: { stepId: stepId },
			data: { stepName: newName }
		});

		if (updatedStep) {
			return { success: true };
		} else {
			return { success: false, message: 'Failed step updating' };
		}
	} catch (error) {
		return {
			success: false,
			message: 'Database error occurred',
			error: error,
		}
	}
}

export async function changeStepComplete(stepId: number, newStatus: boolean) {
	try {
		const updatedStep = await prisma.steps.update({
			where: { stepId: stepId },
			data: { isCompleted: newStatus }
		});

		if (updatedStep) {
			return { success: true };
		} else {
			return { success: false, message: 'Failed step updating' };
		}
	} catch (error) {
		return {
			success: false,
			message: 'Database error occurred',
			error: error,
		}
	}
}

export async function createStep(taskId: number, newName: string) {
	try {
		const createdStep = await prisma.steps.create({
			data: {
				taskId: taskId,
				stepName: newName,
			}
		});

		if (createdStep) {
			return { success: true, createdStep: createdStep };
		} else {
			return { success: false, message: 'Failed step creating' };
		}
	} catch (error) {
		return {
			success: false,
			message: 'Database error occurred',
			error: error,
		}
	}
}

export async function deleteStep(stepId: number) {
	try {
		await prisma.steps.delete({
			where: { stepId: stepId }
		});

		return { success: true };
	} catch (error) {
		return {
			success: false,
			message: 'Database error occurred',
			error: error,
		}
	}
}