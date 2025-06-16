import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';

function Header() {
	return (
		<Navbar expand="lg" className="bg-dark">
			<Container>
				<Navbar.Brand href="#home" className="text-light">
					Soundify
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link href="#home" className="text-light">
							Home
						</Nav.Link>
						<Nav.Link href="#link" className="text-light">
							Link
						</Nav.Link>
						<NavDropdown title="Dropdown" id="basic-nav-dropdown" className="text-light">
							<NavDropdown.Item href="#action/3.1" className="text-light">
								Action
							</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.2" className="text-light">
								Another action
							</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.3" className="text-light">
								Something
							</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item href="#action/3.4" className="text-light">
								Separated link
							</NavDropdown.Item>
						</NavDropdown>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default Header;
