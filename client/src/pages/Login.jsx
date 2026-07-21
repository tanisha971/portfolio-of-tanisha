import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function Login() {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({ email: '', password: '' });
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const handleChange = (event) => {
		setFormData((current) => ({
			...current,
			[event.target.name]: event.target.value,
		}));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);
		setError('');

		try {
			const response = await api.post('/auth/login', formData);
			localStorage.setItem('token', response.data.token);
			localStorage.setItem('user', JSON.stringify(response.data.user));
			navigate('/');
		} catch (apiError) {
			setError(apiError?.response?.data?.message || 'Login failed');
		} finally {
			setLoading(false);
		}
	};

	return (
		<main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
			<div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/30 backdrop-blur-xl">
				<p className="text-sm font-medium uppercase tracking-[0.3em] text-gray-400">
					Welcome back
				</p>
				<h1 className="mt-4 text-3xl font-bold">Login</h1>
				<p className="mt-3 text-sm leading-6 text-gray-300">
					Sign in with the admin account stored in MongoDB.
				</p>

				<form className="mt-8 space-y-5" onSubmit={handleSubmit}>
					<div>
						<label htmlFor="email" className="mb-2 block text-sm text-gray-300">
							Email
						</label>
						<input
							id="email"
							name="email"
							type="email"
							value={formData.email}
							onChange={handleChange}
							required
							className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-white/30"
							placeholder="admin@example.com"
						/>
					</div>

					<div>
						<label htmlFor="password" className="mb-2 block text-sm text-gray-300">
							Password
						</label>
						<input
							id="password"
							name="password"
							type="password"
							value={formData.password}
							onChange={handleChange}
							required
							className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-white/30"
							placeholder="••••••••"
						/>
					</div>

					{error ? (
						<p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
							{error}
						</p>
					) : null}

					<button
						type="submit"
						disabled={loading}
						className="flex w-full items-center justify-center rounded-xl bg-white px-5 py-3 font-semibold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-60"
					>
						{loading ? 'Logging in...' : 'Login'}
					</button>
				</form>
			</div>
		</main>
	);
}
