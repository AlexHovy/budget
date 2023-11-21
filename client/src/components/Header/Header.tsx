import { useAuth } from "../../contexts/AuthContext";
import SignInButton from "../Auth/SignInButton";
import SignOutButton from "../Auth/SignOutButton";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import "./Header.css";

export const Header: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <header className="header">
      <HamburgerMenu />
      <div className="logo"></div>
      <div className="right-button">
        {isAuthenticated ? <SignOutButton /> : <SignInButton />}
      </div>
    </header>
  );
};

export default Header;
