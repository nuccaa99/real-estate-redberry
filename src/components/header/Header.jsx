import React from 'react';
import logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import routes from '../../constants/routes';

const Header = () => {
  const navigate = useNavigate();
  return (
    <header>
      <img
        src={logo}
        alt="page logo"
        className="logo_img"
        onClick={() => navigate(routes.home)}
      />
    </header>
  );
};

export default Header;
