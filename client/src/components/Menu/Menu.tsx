import React, { useState } from "react";
import "./Menu.css";
import { useAuth } from "../../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { AuthService } from "../../services/AuthService";

const Menu: React.FC = () => {
  const authService = new AuthService();

  const { isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = async () => {
    await authService.signOut();
  };

  return (
    <nav>
      <div className="menu-icon" onClick={toggleMenu}>
        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
      </div>

      {isOpen && (
        <div className="full-screen-menu">
          <ul>
            {!isAuthenticated && (
              <div>
                <li>
                  <a href="/login">Sign In</a>
                </li>
              </div>
            )}
            <li>
              <a href="/">Home</a>
            </li>
            {isAuthenticated && (
              <div>
                <li>
                  <a href="/protected">Protected</a>
                </li>
                <li>
                  <a href="" onClick={handleSignOut}>
                    Sign Out
                  </a>
                </li>
              </div>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Menu;
