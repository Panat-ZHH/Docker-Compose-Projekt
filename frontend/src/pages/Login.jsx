import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './loginPage.css';

function LoginPage({ onLogin }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();

	// Mock-Daten für Login
	const MOCK_EMAIL = 'user@cyber.net';
	const MOCK_PASSWORD = 'cyber1234';

	const handleLogin = (e) => {
		e.preventDefault();

		// Prüfen, ob Email und Passwort stimmen
		if (email === MOCK_EMAIL && password === MOCK_PASSWORD) {
			setError('');
			onLogin(); // Setzt Login-Status in App.jsx
			navigate('/'); // Weiterleitung zur Startseite
		} else {
			setError('Invalid email or password.');
		}
	};

	const handleRegister = (e) => {
		e.preventDefault();
		navigate('/register');
	};

	return (
		<div className="cyber-login-page">
			<div className="login-background">
				<div className="grid-overlay"></div>
				<div className="floating-particles"></div>
			</div>

			<Container className="login-container">
				<Row className="justify-content-center align-items-center min-vh-100">
					<Col xs={12} sm={10} md={8} lg={6} xl={5}>
						<Card className="cyber-login-card">
							<div className="card-glow"></div>
							<div className="card-border"></div>

							<Card.Body className="p-5">
								<div className="text-center mb-5">
									<h1 className="cyber-title">
										<span className="glitch-title" data-text="ACCESS TERMINAL">
											ACCESS TERMINAL
										</span>
									</h1>
									<div className="title-underline"></div>
									<p className="cyber-subtitle mt-3">Enter your credentials to proceed</p>
								</div>

								{error && <div className="alert alert-danger text-center">{error}</div>}

								<Form onSubmit={handleLogin}>
									<Form.Group className="mb-4">
										<Form.Label className="cyber-label">
											<span className="label-icon">📧</span>
											Email Address
										</Form.Label>
										<Form.Control
											type="email"
											placeholder="user@cyber.net"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											className="cyber-input"
											required
										/>
										<div className="input-glow"></div>
									</Form.Group>

									<Form.Group className="mb-5">
										<Form.Label className="cyber-label">
											<span className="label-icon">🔐</span>
											Password
										</Form.Label>
										<Form.Control
											type="password"
											placeholder="••••••••"
											value={password}
											onChange={(e) => setPassword(e.target.value)}
											className="cyber-input"
											required
										/>
										<div className="input-glow"></div>
									</Form.Group>

									<div className="d-grid gap-3">
										<Button type="submit" className="cyber-btn-login-main">
											<span className="btn-icon pulse-icon">🚀</span>
											<span className="btn-text glitch-text" data-text="LOGIN">
												LOGIN
											</span>
											<div className="btn-particles"></div>
										</Button>

										<Button type="button" className="cyber-btn-register" onClick={handleRegister}>
											<span className="btn-icon pulse-icon">⚡</span>
											<span className="btn-text glitch-text" data-text="CREATE ACCOUNT">
												CREATE ACCOUNT
											</span>
											<div className="btn-particles"></div>
										</Button>
									</div>
								</Form>

								<div className="text-center mt-4">
									<Link to="/" className="cyber-link">
										← Back to Home
									</Link>
								</div>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</div>
	);
}

export default LoginPage;
