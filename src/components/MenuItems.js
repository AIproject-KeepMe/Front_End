import {
  IconAlertCircle, IconLayoutDashboard, IconLogin, IconUserPlus,
} from "@tabler/icons";
import { useSelector } from "react-redux";
import { uniqueId } from "lodash";
import { useState } from 'react';

const Menuitems = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const { user } = useSelector((state) => state);

  if (user && !loggedIn) {
    setLoggedIn(true);
  }

  return [
    {
      navlabel: true,
      subheader: "Home",
    },
    {
      id: uniqueId(),
      title: "Home",
      icon: IconLayoutDashboard,
      href: "/home",
    },
    // {
    //   navlabel: true,
    //   subheader: "Utilities",
    // },
    // {
    //   id: uniqueId(),
    //   title: "웹소켓테스트",
    //   icon: IconAlertCircle,
    //   href: "/page2",
    // },
    {
      navlabel: true,
      subheader: "Auth",
    },
    ...(loggedIn
      ? []
      : [
        {
          id: uniqueId(),
          title: "Login",
          icon: IconLogin,
          href: "/auth/login",
        },
        {
          id: uniqueId(),
          title: "Register",
          icon: IconUserPlus,
          href: "/auth/register",
        },
      ]),
  ];
};

export default Menuitems;
