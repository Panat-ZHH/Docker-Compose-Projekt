import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/logo.png';
import './Header.css'; // Custom CSS für zusätzliche Styles

function Header() {
	return (
		<Navbar expand="lg" className="cyber-header">
			<div className="header-glow"></div>
			<Container className="d-flex justify-content-between align-items-center position-relative">
				{/* Left: Search Button */}
				<Nav>
					<Button as={Link} to="/search" className="cyber-btn cyber-btn-search d-flex align-items-center">
						<span className="btn-icon pulse-icon">🔎</span>
						<span className="btn-text glitch-text">SEARCH</span>
						<div className="btn-particles"></div>
					</Button>
				</Nav>

				{/* Center: Logo Image */}
				<Navbar.Brand as={Link} to="/" className="logo-container">
					<div className="logo-ring"></div>
					<div className="logo-ring-2"></div>
					<img src={logo} alt="Logo" className="logo-image floating-logo" />
					<div className="logo-glow"></div>
				</Navbar.Brand>

				{/* Right: Playlist Button */}
				<Nav>
					<Button as={Link} to="/playlist" className="cyber-btn cyber-btn-playlist d-flex align-items-center">
						<span className="btn-icon pulse-icon">🎶</span>
						<span className="btn-text glitch-text">PLAYLIST</span>
						<div className="btn-particles"></div>
					</Button>
				</Nav>
			</Container>
		</Navbar>
	);
}

export default Header;
