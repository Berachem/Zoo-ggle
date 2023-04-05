import React from "react";
import Logo from "../../assets/images/zooggle_lion_logo_blue.png";
import Mbappe from "../../assets/images/mbappe.jpg";
import googlePlayIcon from "../../assets/images/icons/google_play_icon.png";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Card,
  Switch,
  IconButton,
} from "@material-tailwind/react";
import {
  CubeTransparentIcon,
  UserCircleIcon,
  CodeBracketSquareIcon,
  Square3Stack3DIcon,
  ChevronDownIcon,
  PowerIcon,
  RocketLaunchIcon,
  Bars2Icon,
  HomeIcon,
  UserIcon,
  UserGroupIcon,
  BookmarkIcon,
  BookOpenIcon,
  PlayIcon,
} from "@heroicons/react/24/outline";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import routes from "../../routes";

import { faHippo, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { Helmet } from "react-helmet";
import {
  faAndroid,
  faGooglePay,
  faGooglePlay,
} from "@fortawesome/free-brands-svg-icons";

// profile menu component
const profileMenuItems = [
  {
    label: "Mon Profil",
    icon: UserCircleIcon,
    path: "/profile/me",
  },
  {
    label: "Se déconnecter",
    icon: PowerIcon,
    path: "/déconnexion",
  },
];

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="candice wu"
            className="border border-blue-500 p-0.5"
            src={Mbappe}
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon, path }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <a href={path}>
              <MenuItem
                key={label}
                onClick={closeMenu}
                className={`flex items-center gap-2 rounded ${
                  isLastItem
                    ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                    : ""
                }`}
              >
                {React.createElement(icon, {
                  className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                  strokeWidth: 2,
                })}
                <Typography
                  as="span"
                  variant="small"
                  className="font-normal"
                  color={isLastItem ? "red" : "inherit"}
                >
                  {label}
                </Typography>
              </MenuItem>
            </a>
          );
        })}
      </MenuList>
    </Menu>
  );
}

// nav list menu
const navListMenuItems = [
  {
    title: "@material-tailwind/html",
    description:
      "Learn how to use @material-tailwind/html, packed with rich components and widgets.",
  },
  {
    title: "@material-tailwind/react",
    description:
      "Learn how to use @material-tailwind/react, packed with rich components for React.",
  },
  {
    title: "Material Tailwind PRO",
    description:
      "A complete set of UI Elements for building faster websites in less time.",
  },
];

function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const triggers = {
    onMouseEnter: () => setIsMenuOpen(true),
    onMouseLeave: () => setIsMenuOpen(false),
  };

  const renderItems = navListMenuItems.map(({ title, description }) => (
    <a href="#" key={title}>
      <MenuItem>
        <Typography variant="h6" color="blue-gray" className="mb-1">
          {title}
        </Typography>
        <Typography variant="small" color="gray" className="font-normal">
          {description}
        </Typography>
      </MenuItem>
    </a>
  ));

  return (
    <React.Fragment>
      <Menu open={isMenuOpen} handler={setIsMenuOpen}>
        <MenuHandler>
          <Typography as="a" href="#" variant="small" className="font-normal">
            <MenuItem
              {...triggers}
              className="hidden items-center gap-2 text-blue-gray-900 lg:flex lg:rounded-full"
            >
              <Square3Stack3DIcon className="h-[18px] w-[18px]" /> Pages{" "}
              <ChevronDownIcon
                strokeWidth={2}
                className={`h-3 w-3 transition-transform ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
            </MenuItem>
          </Typography>
        </MenuHandler>
        <MenuList
          {...triggers}
          className="hidden w-[36rem] grid-cols-7 gap-3 overflow-visible lg:grid"
        >
          <Card
            color="blue"
            shadow={false}
            variant="gradient"
            className="col-span-3 grid h-full w-full place-items-center rounded-md"
          >
            <RocketLaunchIcon strokeWidth={1} className="h-28 w-28" />
          </Card>
          <ul className="col-span-4 flex w-full flex-col gap-1">
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
      <MenuItem className="flex items-center gap-2 text-blue-gray-900 lg:hidden">
        <Square3Stack3DIcon className="h-[18px] w-[18px]" /> Pages{" "}
      </MenuItem>
      <ul className="ml-6 flex w-full flex-col gap-1 lg:hidden">
        {renderItems}
      </ul>
    </React.Fragment>
  );
}

// nav list component
const navListItems = routes;

function NavList(
  props = {
    changeBackgroundMode: () => {},
    backgroundMode: false,
  }
) {
  return (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      {/* <NavListMenu /> */}
      {navListItems.map(({ label, icon, path }, key) => (
        <Typography
          key={label}
          as="a"
          href={path}
          variant="small"
          color="blue-gray"
          className="font-normal"
        >
          <MenuItem className="flex items-center gap-2 lg:rounded-full">
            {React.createElement(icon, { className: "h-[18px] w-[18px]" })}{" "}
            {label}
          </MenuItem>
        </Typography>
      ))}
      {/* ajoute un switch pour passer du mode Idéaliste ou réaliste avec des icônes */}

      <span className="flex items-center gap-2 text-blue-gray-900 lg:hidden">
        {props.backgroundMode ? <>
         <FontAwesomeIcon icon={faSun} />
         <Typography variant="small" color="blue-gray" className="font-normal">
          Mode Idéaliste
        </Typography>
        </> : <> 
        <FontAwesomeIcon icon={faMoon} />
        <Typography variant="small" color="blue-gray" className="font-normal">
          Mode Réaliste
        </Typography>
        </>}
      </span>
      <Switch
        onChange={() => props.changeBackgroundMode()}
        className="flex-shrink-0 h-5 w-9"
        style={{
          backgroundColor: props.backgroundMode ? "#6b7280" : "#f59e0b",
        }}
      ></Switch>
    </ul>
  );
}
// changeBackgroundMode
export default function AppBar(
  props = {
    changeBackgroundMode: () => {},
    backgroundMode: false,
  }
) {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
  const isLandingPage = window.location.pathname === "/accueil";

  /*   React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []); */
  // same but also set navbar width to 100% after scrolling
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);

  if (isLandingPage) {
    return (
      <div className="flex justify-end">
        <ul className="flex">
          <li className="mx-7">
            <br />
            <br />
            <Switch
              onChange={() => props.changeBackgroundMode()}
              className="flex-shrink-0 h-5 w-9"
              style={{
                backgroundColor: props.backgroundMode ? "#6b7280" : "#f59e0b",
              }}
            ></Switch>
          </li>
          <li className="mx-7">
            <a href="#">
              <br />
              <img src={googlePlayIcon} alt="google play" width={40} height={40} style={{ marginTop: 10 }} />
            </a>
          </li>
        </ul>
      </div>
    );
  }
  return (
    <Navbar
      className="mx-auto max-w-screen-xl p-2 lg:rounded-full lg:pl-6 sticky"
      id="navbar"
      style={{ backgroundColor: "white" }}
    >
      <div className="relative mx-auto flex items-center text-blue-gray-900">
        <img src={Logo} alt="logo" className="h-8 w-8" />
        <Typography
          as="a"
          href="#"
          variant="h6"
          className="ml-2 font-bold hidden lg:block"
        >
          Zoo-ggle
        </Typography>

        <div className="absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
          <NavList
            changeBackgroundMode={props.changeBackgroundMode}
            backgroundMode={props.backgroundMode}
          />
        </div>
        <IconButton
          size="sm"
          color="blue-gray"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto mr-2 lg:hidden"
        >
          <Bars2Icon className="h-6 w-6" />
        </IconButton>
        <ProfileMenu />
      </div>
      <MobileNav open={isNavOpen} className="overflow-scroll">
        <NavList
          changeBackgroundMode={props.changeBackgroundMode}
          backgroundMode={props.backgroundMode}
        />
      </MobileNav>
    </Navbar>
  );
}
