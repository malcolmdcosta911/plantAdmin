// const SideBarLayout = ({ children }: { children: React.ReactNode }) => {
//   return <div>{children}</div>;
// };

// export default SideBarLayout;

import authService from "@/services/authService";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import PlantSvg from "@/components/svgs/plantSvg";

type userType = {
  name?: string;
  email?: string;
};

const SideBarLayout = ({ children }: { children: React.ReactNode }) => {
  function displayUser() {
    const user = authService.getCurrentUser();
    // console.log("user", user);
    setUser(user as userType);
  }

  function logout() {
    authService.logout();
    window.location.href = "/";
  }

  useEffect(() => {
    displayUser();
  }, []);

  const [user, setUser] = useState<userType>();
  const [showSideBar, setShowSideBar] = useState(false);

  // hidden sm:block
  //sm	640px
  //sm:translate-x-0 -->transform: translateX(0);
  // -translate-x-full --> transform: translateX(-100%);
  //transform-none --> transform: none;

  return (
    <>
      <aside
        onClick={() => setShowSideBar(false)}
        className={`fixed top-0 left-0 z-40 w-56 h-screen transition-transform sm:translate-x-0 ${
          showSideBar ? "transform-none " : "-translate-x-full"
        } `}
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium mx-auto">
            <li>
              <NavLink
                to="/"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="w-8 h-5 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>

                <span className="ms-3 ">Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/users"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 "
              >
                <svg
                  className="flex-shrink-0 w-8 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                </svg>

                <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/plants"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 "
              >
                <PlantSvg className="flex-shrink-0 w-8 h-8" />

                <span className="flex-1 ms-3 whitespace-nowrap">Plants</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </aside>
      <div className=" sm:ml-56  ">
        <div className="border-b ">
          <div className="flex h-16 items-center justify-between px-4">
            <button
              className="p-2 sm:hidden "
              onClick={() => setShowSideBar(true)}
            >
              <span className="sr-only">open sidebar</span>
              <svg
                width="50px"
                height="50px"
                viewBox="0 -0.5 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.5 11.75C5.08579 11.75 4.75 12.0858 4.75 12.5C4.75 12.9142 5.08579 13.25 5.5 13.25V11.75ZM19.5 13.25C19.9142 13.25 20.25 12.9142 20.25 12.5C20.25 12.0858 19.9142 11.75 19.5 11.75V13.25ZM5.5 7.75C5.08579 7.75 4.75 8.08579 4.75 8.5C4.75 8.91421 5.08579 9.25 5.5 9.25V7.75ZM14.833 9.25C15.2472 9.25 15.583 8.91421 15.583 8.5C15.583 8.08579 15.2472 7.75 14.833 7.75V9.25ZM5.5 15.75C5.08579 15.75 4.75 16.0858 4.75 16.5C4.75 16.9142 5.08579 17.25 5.5 17.25V15.75ZM14.833 17.25C15.2472 17.25 15.583 16.9142 15.583 16.5C15.583 16.0858 15.2472 15.75 14.833 15.75V17.25ZM5.5 13.25H19.5V11.75H5.5V13.25ZM5.5 9.25H14.833V7.75H5.5V9.25ZM5.5 17.25H14.833V15.75H5.5V17.25Z"
                  fill="#000000"
                />
              </svg>
            </button>
            <div className="hidden sm:block"></div>

            <Popover>
              <PopoverTrigger>
                {" "}
                <div
                  className="inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-[200px] justify-between"
                  role="combobox"
                  aria-expanded="false"
                  aria-label="Select a team"
                  // type="button"
                  aria-haspopup="dialog"
                  aria-controls="radix-:r6:"
                  data-state="closed"
                >
                  <span className="relative flex shrink-0 overflow-hidden rounded-full mr-2 h-5 w-5">
                    <img
                      className="aspect-square h-full w-full grayscale"
                      alt="Alicia Koch"
                      src="https://avatar.vercel.sh/personal.png"
                    />
                  </span>
                  {user?.name}
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-56 px-0">
                <div className="flex flex-col space-y-1 px-2 ">
                  <p className="text-sm font-medium leading-none">Admin</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
                <Separator className="my-2" />
                <div className="flex flex-col space-y-1 px-2 ">
                  <p className="cursor-default select-none  rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-slate-200 hover:text-accent-foreground">
                    Profile
                  </p>
                </div>
                <div className="flex flex-col space-y-1 px-2 ">
                  <p className="cursor-default select-none  rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-slate-200 hover:text-accent-foreground">
                    Settings
                  </p>
                </div>
                <Separator className="my-2 " />
                <div className="flex flex-col space-y-1 px-2 " onClick={logout}>
                  <p className="cursor-default select-none  rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-slate-200 hover:text-accent-foreground">
                    Logout
                  </p>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default SideBarLayout;
