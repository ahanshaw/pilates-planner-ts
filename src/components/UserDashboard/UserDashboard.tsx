import React, { useState, useEffect } from "react";
import { Redirect, Link } from 'react-router-dom';

import { database } from '../../services/firebase';
import { auth, logout } from '../../services/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function UserDashboard() {
	const [user, loading] = useAuthState(auth);

	if (loading) {
		return (
			<div className="dashboard">
				<h1>My Dashboard</h1>
				<p>Dashboard loading...</p>
			</div>
        );
    }

	if (user) {
		return (
			<div className="container stack-xl">
				<h1>User Dashboard</h1>
			</div>
        );
	}

	return (
		<Redirect to='/' />
	);
}