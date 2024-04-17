import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [isActive, setIsActive] = useState(false);
  
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="https://bulma.io">
          <img src="https://res.cloudinary.com/dwvc88n4u/image/upload/v1713213351/logo-galilea_vypi5q.png" />
        </a>

        <a
          role="button"
          className={isActive ? "navbar-burger is-active" : "navbar-burger"}
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          onClick={() => setIsActive(!isActive)}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        id="navbarBasicExample"
        className={isActive ? "navbar-menu is-active" : "navbar-menu"}
      >
        <div className="navbar-start">
          <NavLink
            className={({ isActive }) =>
              isActive ? "navbar-item is-active" : "navbar-item"
            }
            to="/"
          >
            Home
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActive ? "navbar-item is-active" : "navbar-item"
            }
            to="/admin"
          >
            Administradores
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActive ? "navbar-item is-active" : "navbar-item"
            }
            to="/visit"
          >
            Visitas
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActive ? "navbar-item is-active" : "navbar-item"
            }
            to="/inhabitant"
          >
            Moradores
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
