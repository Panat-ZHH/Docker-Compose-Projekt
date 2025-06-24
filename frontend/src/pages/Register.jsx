import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './register.css';

function RegisterPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const handleRegister = (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			alert("Passwords don't match!");
			return;
		}

		// Registrierung-Logik hier implementieren
		console.log('Register attempt:', { email, password });
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
								{/* Header */}
								<div className="text-center mb-5">
									<h1 className="cyber-title">
										<span className="glitch-title" data-text="USER REGISTRATION">
											USER REGISTRATION
										</span>
									</h1>
									<div className="title-underline"></div>
									<p className="cyber-subtitle mt-3">Create your new cyber credentials</p>
								</div>

								{/* Register Form */}
								<Form onSubmit={handleRegister}>
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

									<Form.Group className="mb-4">
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

									<Form.Group className="mb-5">
										<Form.Label className="cyber-label">
											<span className="label-icon">🔐</span>
											Confirm Password
										</Form.Label>
										<Form.Control
											type="password"
											placeholder="••••••••"
											value={confirmPassword}
											onChange={(e) => setConfirmPassword(e.target.value)}
											className="cyber-input"
											required
										/>
										<div className="input-glow"></div>
									</Form.Group>

									{/* Submit Button */}
									<div className="d-grid gap-3">
										<Button type="submit" className="cyber-btn-register">
											<span className="btn-icon pulse-icon">⚡</span>
											<span className="btn-text glitch-text" data-text="REGISTER">
												REGISTER
											</span>
											<div className="btn-particles"></div>
										</Button>
									</div>
								</Form>

								{/* Footer Link */}
								<div className="text-center mt-4">
									<Link to="/login" className="cyber-link">
										← Back to Login
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

export default RegisterPage;
