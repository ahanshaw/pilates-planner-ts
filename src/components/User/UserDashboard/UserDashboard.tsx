import React, { useState, useEffect } from "react";
import { Redirect, Link } from 'react-router-dom';

import { database } from '../../../services/firebase';
import { auth, logout } from '../../../services/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

import UserLogin from "../UserLogin/UserLogin";
import UserRegister from "../UserRegister/UserRegister";

export default function UserDashboard() {
	const [user, loading] = useAuthState(auth);
	const [admin, setAdmin] = useState<boolean>(false);

	useEffect(() => {
		if (user && loading === false) {
			database.ref('users').child(user.uid).once('value', function (snapshot) {
				setAdmin(snapshot.child('verified').val());
			});
		}
	}, [user, loading]);

	if (loading) {
		return (
			<div className="container stack-xl">
				<h1>My Dashboard</h1>
				<p>Dashboard loading...</p>
			</div>
		);
	}

	if (user) {
		return (
			<div className="container stack-xl">
				<h1>My Dashboard</h1>
				<p><Link className="link" to={`/block/list`}>View Blocks</Link></p>
				{admin &&
					<p><Link className="btn-primary" to={`/block/add`}>Add a Block</Link></p>
				}
			</div>
		);
	}

	return (
		<>
			<p><a className="link" href="/account/login">Log In</a> <span className="divider"> or </span> <a className="link" href="/account/register">Register</a></p>
		</>
	);
}