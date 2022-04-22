import { Outlet, RouteObject } from "react-router-dom";

import Index from "../pages/Index";
import Simple from "../pages/Index";
import Board from "../pages/Index";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Outlet />,
    children: [
      { index: true, element: <Index /> },
      { path: "simple", element: <Simple /> },
      { path: "board", element: <Board /> },
      { path: "*", element: <Index /> },
    ],
  },
];
