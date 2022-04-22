import { Link, Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <>
      <header className="py-5 shadow-xl">
        <nav className="container mx-auto">
          <ul className="flex gap-10">
            <li>
              <Link to="/" className="font-semibold text-blue-400">
                Home
              </Link>
            </li>
            <li>
              <Link to="/simple" className="font-semibold text-blue-400">
                Simple DND
              </Link>
            </li>
            <li>
              <Link to="/board" className="font-semibold text-blue-400">
                Imitation of board with card
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};
