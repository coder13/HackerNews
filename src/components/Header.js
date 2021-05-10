import clsx from 'clsx';
import { Link, useLocation } from 'react-router-dom'

const NavLink = ({ to, children, props }) => {
  const location = useLocation();

  return (
    <Link
      className={clsx('hover:bg-yellow-700 p-2', {
        'text-gray-50': location.pathname === to
      })}
      to={to}
      {...props}
    >
      {children}
    </Link>
  );
};

function Header() {
  return (
    <nav className="flex flex-col flex-0 h-10 items-center bg-yellow-600 text-gray-900 shadow-md">
      <div className="flex w-10/12">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/newest">New</NavLink>
        <NavLink to="/best">Best</NavLink>
        <NavLink to="/past">Past</NavLink>
        <NavLink to="/comments">Comments</NavLink>
      </div>
    </nav>
  );
}

export default Header;
