import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import ProfilePopper from '../../../components/ProfilePopper/ProfilePopper';
import useFirebase from '../../../hooks/useFirebase';

const Navigation = () => {
  const { user } = useFirebase();
  console.log('user from navigation', user);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/home" className="nav-link fs-6 fw-bold">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/about" className="nav-link fs-6 fw-bold">About</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/rides" className="nav-link fs-6 fw-bold">Service</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/membership" className="nav-link fs-6 fw-bold">Membership</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/contact" className="nav-link fs-6 fw-bold">Contact</NavLink>
            </li>
          </ul>
          <div>
            <div className="d-flex align-items-center">
              {
                user?.email ?
                  <>
                    <div className="user-img">
                      <ProfilePopper />
                    </div>
                  </>
                  :
                  <>
                    <Link to="/login">
                      <button className='btn px-3 fs-6'>Log in</button>
                    </Link>
                    <Link to="/signup">
                      <button className='btn px-3 fs-6'>Sign up</button>
                    </Link>
                  </>
              }
            </div>

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;