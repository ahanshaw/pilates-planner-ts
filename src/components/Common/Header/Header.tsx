import { auth, logout } from '../../../services/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

export function Header() {
	const [user, loading] = useAuthState(auth);

	return (
		<header className="header flex-between">
			<p className="header-title">
				<a href="/">Pilates Workout Planner</a>
			</p>
			{user && loading === false &&
				<div className="header-admin">
					<p><a className="link" href="/account/dashboard">Dashboard</a> <span className="divider">|</span> <button className="link" onClick={logout}>Log Out</button></p>
				</div>
			}
			{!user && loading === false &&
				<div className="header-admin">
					<p><a className="link" href="/account/login">Log In</a> <span className="divider">|</span> <a className="link" href="/account/register">Register</a></p>
				</div>
			}
		</header>
	);
}
