import React, { useState, useEffect } from "react";

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
  
    const [isOpen] = useState(false);

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
                  <a href={user['html_url']} className="group relative flex justify-center">
                    
                  <button  type="button"><img
                      className="p-2 rounded-full h-16 w-16"
                      src={user['avatar_url']}
                      alt="Avatar"
                    /></button>
                    
  <span className="absolute top-10 space-y-px bg-gray-600 dark:bg-gray-800  scale-0 rounded p-1 text-xs text-white group-hover:scale-100">GitHub</span>
  
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
          </nav>
        </div>
      );
}