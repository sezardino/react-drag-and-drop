import { Link } from "react-router-dom";

const Simple = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-xl">Project for edu drag and drop with ReactJS</h1>
      <nav className="mt-2">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/simple">Simple DND</Link>
          </li>
          <li>
            <Link to="/board">Imitation of board with card</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Simple;
