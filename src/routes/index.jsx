import { createBrowserRouter } from "react-router-dom";
import Layout from "@/layout";
import Home from "@/pages/home";
import VisitIndex from "@/pages/visit/index/visit-index";
import InhabitantIndex from "@/pages/inhabitant/index/inhabitant-index";
import AdminIndex from "@/pages/admin/index/admin-index";
import AdminCreate from "@/pages/admin/create/admin-create";
import AdminEdit from "@/pages/admin/edit/admin-edit";
import Wrapper from "@/components/warpper";
import VisitCreate from "@/pages/visit/create/visit-create";
import VisitEdit from "@/pages/visit/edit/visit-edit";
import InhabitantCreate from "@/pages/inhabitant/create/inhabitant-create";
import InhabitantEdit from "@/pages/inhabitant/edit/inhabitant-edit";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "admin",
        element: <Wrapper />,
        children: [
          {
            path: "",
            element: <AdminIndex />,
          },
          {
            path: "create",
            element: <AdminCreate />,
          },
          {
            path: "edit/:id",
            element: <AdminEdit />,
          },
        ],
      },
      {
        path: "visit",
        element: <Wrapper />,
        children: [
          {
            path: "",
            element: <VisitIndex />,
          },
          {
            path: "create",
            element: <VisitCreate />,
          },
          {
            path: "edit/:id",
            element: <VisitEdit />,
          },
        ],
      },
      {
        path: "inhabitant",
        element: <Wrapper />,
        children: [
          {
            path: "",
            element: <InhabitantIndex />,
          },
          {
            path: "create",
            element: <InhabitantCreate />,
          },
          {
            path: "edit/:id",
            element: <InhabitantEdit />,
          },
        ],
      },
    ],
  },
]);
