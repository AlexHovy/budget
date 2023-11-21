import React, { useState } from "react";
import "./HamburgerMenu.css";
import { useAuth } from "../../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

const HamburgerMenu: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav>
      <div className="menu-icon" onClick={toggleMenu}>
        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
      </div>

      {isOpen && (
        <div className="full-screen-menu">
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            {isAuthenticated && (
              <div>
                <li>
                  <a href="/protected">Protected</a>
                </li>
              </div>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default HamburgerMenu;
