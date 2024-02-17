'use server';
import { transporter } from "../../lib/nodemailer";

export async function sendPasswordOnEmail(userName: string) {
	try {
		const user = await prisma.users.findFirst({
			where: { login: userName }
		});

		if (user) {
			const info = await transporter.sendMail({
				from: process.env.EMAIL,
				to: user.email,
				subject: 'Task-manager forgot password',
				text: 'Test string',
				html: `
						<h2>Hi, from TaskManager</h2>
						<p>You've received this message because we got your "Forgot password" request.</p>
						<p>To log into account use: <strong>${user.password}</strong>.</p>
						<br>
						<p>Got any questions? Please, ask them to the <a href="mailto:kotelevskijdanil0@gmail.com">kotelevskijdanil0@gmail.com</a></p>
						<br>
						<p>Best regards.</p>
					`,
			});

			return { success: true, message: 'Password successfully mailed' };
		} else {
			return { success: false, message: 'User not found' }
		}
	} catch (error) {
		return {
			success: false,
			message: 'Database error occurred',
			error: error,
		}
	}
}