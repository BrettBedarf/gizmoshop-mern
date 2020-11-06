import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

const Header = () => {
	return (
		<header>
			<Navbar bg='dark' variant='dark' collapseOnSelect expand='lg'>
				<Container>
					<Navbar.Brand href='#home'>React-Bootstrap</Navbar.Brand>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav className='ml-auto'>
							<Nav.Link href='/login'>
								<i class='fas fa-user'></i>
							</Nav.Link>
							<Nav.Link href='/cart'>
								<i
									className='fa fa-shopping-cart'
									aria-hidden='true'
								></i>
							</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;
