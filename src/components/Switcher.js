import React, { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import useDarkSide from "../components/useDarkSide";
export default function Switcher() {
    const [colorTheme, setTheme] = useDarkSide();
    const [darkSide, setDarkSide] = useState(
        colorTheme === "light" ? true : false
    );


    const toggleDarkMode = (checked) => {
        setTheme(colorTheme);
        setDarkSide(checked);
    };
  
    const [isOpen, setIsOpen] = useState(false);

    const [user, setUser] = useState([]);

    const fetchData = () => {
      return fetch("https://api.github.com/users/almajor")
            .then((response) => response.json())
            .then((data) => setUser(data));
    }
  
    useEffect(() => {
      fetchData();
    },[])
    return (
        <div className="dark:bg-gray-900 ">
          <nav className="dark:bg-gray-900 dark:darkline">
            <div className="max-w-10xl darkline mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  <div className="space-x-4 inline-flex items-center justify-center rounded-md focus:outline-none">
                  <a href={user['html_url']} class="group relative flex justify-center">
                    
                  <button  type="button"><img
                      className="p-2 rounded-full h-16 w-16"
                      src={user['avatar_url']}
                      alt="Avatar"
                    /></button>
                    
  <a class="absolute top-10 space-y-px bg-gray-600 dark:bg-gray-800  scale-0 rounded p-1 text-xs text-white group-hover:scale-100">GitHub</a>
  
</a>

                                        <DarkModeSwitch 
            style={{marginBottom : "0px", color: "dark:text-white"}}
            checked={darkSide}
            onChange={toggleDarkMode}
            size={20}
        />

                  </div>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                    </div>
                  </div>
                </div>
              </div>
            </div>
    
            <Transition
              show={isOpen}
              enter="transition ease-out duration-100 transform"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="transition ease-in duration-75 transform"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              {(ref) => (
                <div className="md:hidden" id="mobile-menu">
                  <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  </div>
                </div>
              )}
            </Transition>
          </nav>
        </div>
      );
}