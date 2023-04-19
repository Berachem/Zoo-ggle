import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Logo from "../../assets/images/Zooggle_white_logo.png";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Card,
} from "@material-tailwind/react";

export default function MinimalistNavbar() {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  return (
    <>
      <Navbar
        className=" max-w-full rounded-none px-4 lg:px-8 lg:py-4  lg:bg-white" 
        style={{
          zIndex: 999,
          backgroundColor: "transparent",
          border: "none",
          boxShadow: "none",
          backdropFilter: "blur(8px)",
        }}
      >
        <div className="flex items-center justify-between text-blue-gray-900">
          <img src={Logo} alt="logo" className="w-48 lg:ml-4" />

          <div className="flex items-center gap-4">
            <Button
              size="lg"
              color="green"
              className="px-4 py-2 rounded-md text-white font-bold bg-green-500 hidden lg:block"
            >
              Lancer
            </Button>
            <Button
              size="lg"
              color="orange"
              className="ml-4 px-4 py-2 rounded-md text-white font-bold hidden lg:block bg-orange-500"
            >
              Fermer
            </Button>
            <Button
              size="lg"
              color="red"
              className="ml-4 px-4 py-2 rounded-md text-white font-bold bg-red-500 hidden lg:block"
            >
              Quitter
            </Button>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <span className="text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </span>
              ) : (
                <span className="text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </span>
              )}
            </IconButton>
          </div>
        </div>
        <MobileNav open={openNav}>
          <Button size="sm" fullWidth className="mb-2 bg-green-600">
            <span>Lancer</span>
          </Button>
          <Button size="sm" fullWidth className="mb-2 bg-orange-600">
            <span>Fermer</span>
          </Button>
          <Button size="sm" fullWidth className="mb-2 bg-red-600">
            <span>Quitter</span>
          </Button>
        </MobileNav>
      </Navbar>
    </>
  );
}
