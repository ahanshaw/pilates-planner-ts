import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { auth } from '../../services/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function UserLogin() {
	const [user] = useAuthState(auth);
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [error, setError] = useState<string>('');

	const signInWithEmailAndPassword = async (e: React.FormEvent<HTMLFormElement>, email: string, password: string) => {
		e.preventDefault();
		try {
			await auth.signInWithEmailAndPassword(email, password);
		} catch (err: any) {
			console.log(err);
			if (err.code === 'auth/user-not-found') {;
				setError('An account with this email address does not exist.');
			}
			if (err.code === 'auth/invalid-email') {;
				setError('Please enter a valid email address.');
			}
			if (err.code === 'auth/wrong-password') {;
				setError('The password you entered is incorrect.');
			}
		}
	};

	if (user) {
		return <Redirect to='/' />
	}

	return (
		<div className="container stack-xl">
			<h1>Log In</h1>
			<form onSubmit={(e) => signInWithEmailAndPassword(e, email, password)}>
				<fieldset>
					<label htmlFor="">Email</label>
					<input
						id="email"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="E-mail Address"
					/>
				</fieldset>
				<fieldset>
					<label htmlFor="password">Password</label>
					<input
						id="password"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Password"
					/>
				</fieldset>
				<button className="btn btn--primary">Log In</button>
				{error &&
					<p className="error">{error}</p>
				}
			</form>
		</div>
	);
}