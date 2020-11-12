import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Header = () => {
	return (
		<header>
			<Navbar bg='dark' variant='dark' collapseOnSelect expand='lg'>
				<Container>
					<LinkContainer to='/'>
						<Navbar.Brand>GizmoShop</Navbar.Brand>
					</LinkContainer>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav className='ml-auto'>
							<LinkContainer to='/login'>
								<Nav.Link>
									<i className='fas fa-user'></i>
								</Nav.Link>
							</LinkContainer>
							<LinkContainer to='/cart'>
								<Nav.Link>
									<i
										className='fa fa-shopping-cart'
										aria-hidden='true'
									></i>
								</Nav.Link>
							</LinkContainer>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;
