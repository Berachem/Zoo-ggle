import React from "react";
import Logo from "../../assets/images/zooggle_lion_logo_blue.png";
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
  UserCircleIcon,
  Square3Stack3DIcon,
  ChevronDownIcon,
  PowerIcon,
  RocketLaunchIcon,
  Bars2Icon,
} from "@heroicons/react/24/outline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import routes from "../../routes";
import {
  faUser,
} from "@fortawesome/free-solid-svg-icons";


// profile menu component
const profileMenuItems = [
  {
    label: "Mon Profil",
    icon: UserCircleIcon,
    onClickAction: () => {
      window.location.assign("/profile/me");
    },
  },
  {
    label: "Se déconnecter",
    icon: PowerIcon,
    onClickAction: async () => {
      // remove session storage
      localStorage.removeItem("connected");
      const res = await fetch("http://localhost/backend/api/disconnect.php", {
        credentials: "include",
      }).then((res) => res.json());
      window.location.assign(res.redirect);
    },
  },
];

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">

      {localStorage.getItem("connected") === "true" ? (
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
              src="https://source.boringavatars.com/beam/120/Stefan?colors=579A86,579A86,80e8b6"
            />
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`h-3 w-3 transition-transform ${
                isMenuOpen ? "rotate-180" : ""
              }`}
            />
          </Button>
        </MenuHandler>
      ) : (
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <a href="/connexion">
            <FontAwesomeIcon icon={faUser} className="h-4 w-4" />
            Connexion
          </a>
        </Button>
      )}
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon, onClickAction }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <span onClick={onClickAction}>
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
            </span>
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
      {navListItems.filter(({ label }) => label).map(({ label, icon, path }, key) => (
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

      <Switch
        /* about="Mode Réaliste ou Idéaliste"
        label={props.backgroundMode ? "Mode Réaliste" : "Mode Idéaliste"} */
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
  const isLandingPage = window.location.pathname === "/";

  // same but also set navbar width to 100% after scrolling
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);

  if (isLandingPage) {
    return (
      <div
        className="flex justify-end"
        style={{  top: 0, right: 0, zIndex: 1000 }}
        id="navbar"
      >
        <ul className="flex">
          <li className="mx-7">
            <br />
            <br />
            <span style={{color:"black",fontWeight:"bold",backgroundColor:"white",borderRadius:"15px",display:"flex",justifyContent:"space-evenly",padding:"10px",width:"250px",opacity:"0.95"}}>
              Changer le mode 
              <Switch
                onChange={() => props.changeBackgroundMode()}
                className="flex-shrink-0 h-5 w-9"
                style={{
                  backgroundColor: props.backgroundMode ? "#6b7280" : "#f59e0b",
                }}
              ></Switch>
            </span>
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
          className="ml-2 font-bold lg:block"
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
