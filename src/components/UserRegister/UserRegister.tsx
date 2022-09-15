import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { database } from '../../services/firebase';
import { auth, logout } from '../../services/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function UserRegister() {
	const [firstName, setFirstName] = useState<string>('');
	const [lastName, setLastName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [user] = useAuthState(auth);

	const [error, setError] = useState<string>('');
	const [userExists, setUserExists] = useState<boolean>(false);
	const [resetSent, setResetSent] = useState<boolean>(false);
	const [registered, setRegistered] = useState<boolean>(false);

	const createUserWithEmailAndPassword = async (e: React.FormEvent<HTMLFormElement>, email: string, password: string) => {
		e.preventDefault();
		setResetSent(false);
		setRegistered(false);
		try {
			await auth.createUserWithEmailAndPassword(email, password);
			setRegistered(true);
		}
		catch (err: any) {
			console.log(err);
			if (err.code === 'auth/email-already-in-use') {
				setUserExists(true);
			}
			if (err.code === 'auth/invalid-email') {
				;
				setError('Please enter a valid email address.');
			}
			if (err.code === 'auth/weak-password') {
				setError('Your password must contain at least six characters.');
			}
		}
	};

	const addUser = (reg: any) => {
		database.ref('users')
			.child(reg.uid)
			.set(reg)
			.then()
			.catch()
	};

	if (user && registered) {
		let reg = {
			uid: user.uid,
			firstName: firstName,
			lastName: lastName,
			email: user.email,
			verified: false
		}
		addUser(reg);
	}

	const sendPasswordResetEmail = async (e: React.FormEvent<HTMLButtonElement>, email: string) => {
		e.preventDefault();
		try {
			await auth.sendPasswordResetEmail(email);
			setResetSent(true);
		}
		catch (err) {
			console.log(err);
		}
	};

	if (user) {
		return (
			<div>
				<button onClick={logout}>
					Logout
				</button>
			</div>
		);
	}

	return (
		<div className="container stack-xl">
			<h1>Register</h1>
			<form onSubmit={(e) => createUserWithEmailAndPassword(e, email, password)}>
				<fieldset>
					<label htmlFor="firstName">First Name</label>
					<input
						type="text"
						id="firstName"
						className="login__textBox"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						placeholder="First Name"
						required
					/>
				</fieldset>
				<fieldset>
					<label htmlFor="lastName">Last Name</label>
					<input
						type="text"
						id="lastName"
						className="login__textBox"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						placeholder="Last Name"
						required
					/>
				</fieldset>
				<fieldset>
					<label htmlFor="email">Email Address</label>
					<input
						type="email"
						id="email"
						className="login__textBox"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="E-mail Address"
						required
					/>
				</fieldset>
				<fieldset>
					<label htmlFor="password">Password <span>(must have at least 6 characters)</span></label>
					<input
						type="password"
						id="password"
						className="login__textBox"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Password"
						required
					/>
				</fieldset>
				<button className="btn btn--primary">Create Account</button>
				{userExists && !resetSent &&
					<div>
						<p>An account with that email address already exists. <Link to={`/account/login`}>Log in</Link> or <button onClick={(e) => sendPasswordResetEmail(e, email)}>reset your password</button>.</p>
					</div>
				}
				{resetSent &&
					<p>Password reset sent! Check your email.</p>
				}
				{error &&
					<p className="error">{error}</p>
				}
			</form>
		</div>
	);
}