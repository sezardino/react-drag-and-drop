import { RouteObject } from "react-router-dom";
import { Layout } from "../components";

import Index from "../pages/Index";
import Simple from "../pages/Simple";
import Board from "../pages/Board";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Index /> },
      { path: "simple", element: <Simple /> },
      { path: "board", element: <Board /> },
      { path: "*", element: <Index /> },
    ],
  },
];
