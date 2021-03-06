import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useHistory } from 'react-router-dom';
import { logout } from '../actions/userActions';
import logo from '../assets/logo-lg.png';

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { userInfo } = useSelector((state) => state.userLogin);

  const handleLogout = () => {
    dispatch(logout());
    history.push('/login');
  };

  return (
    <header>
      <Navbar bg="white" variant="light" collapseOnSelect expand="md">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img
                src={logo}
                alt=""
                width="45"
                height="45"
                className="d-inline-block align-top"
              />
              <h3 style={{ display: 'inline-block' }}>&nbsp;Gidgets</h3>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls=".navbar-toggle" />
          <Navbar.Collapse aria-controls="basic-navbar-nav">
            {' '}
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <NavDropdown title="Categories" className="navbar-toggle">
                <NavDropdown.Item href="/">Useless</NavDropdown.Item>
                <NavDropdown.Item href="/">Phone</NavDropdown.Item>
                <NavDropdown.Item href="/">Accessories</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#/">All Products</NavDropdown.Item>
              </NavDropdown>
              <LinkContainer to="/about">
                <Nav.Link href="#link">About</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>

          <Navbar.Collapse className="navbar-toggle">
            <Nav className="ml-auto">
              {userInfo ? (
                <NavDropdown
                  title={
                    <span>
                      <i className="fas fa-user"></i>
                      &nbsp;&nbsp;{userInfo.name}
                    </span>
                  }
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>

                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    Log Out
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                  <LinkContainer to={userInfo ? '/profile' : '/login'}>
                    <Nav.Link>
                      <i className="fas fa-user"></i> &nbsp;
                      {userInfo ? userInfo.name : 'Sign In'}
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fa fa-shopping-cart" aria-hidden="true"></i>{' '}
                  &nbsp;Cart
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
