import React, { useState } from 'react';
import {Link } from 'react-router-dom';
import { auth } from '../../services/firebase';

export default function UserPasswordReset() {
	const [email, setEmail] = useState<string>('');
	const [resetSent, setResetSent] = useState<boolean>(false);

	const sendPasswordResetEmail = async (e: React.FormEvent<HTMLFormElement>, email: string) => {
		e.preventDefault();
		try {
			await auth.sendPasswordResetEmail(email);
			setResetSent(true);
		}
		catch (err) {
			console.log(err);
		}
	};

	if (resetSent) {
		return (
			<div>
				<p>Password reset sent! Check your email.</p>
			</div>
        );
    }

	return (
		<div className="container stack-xl">
			<form onSubmit={(e) => sendPasswordResetEmail(e, email)}>
				<label htmlFor="email">Email Address</label>
				<input
					type="email"
					id="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="E-mail Address"
				/>
				<button>Reset Password</button>
			</form>
		</div>
	);
}