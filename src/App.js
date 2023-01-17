import React from "react";
import Switcher from "./components/Switcher";
import { useState, useEffect } from "react";

function getAge(dateString) {
  var today = new Date();
  var birthDate = new Date("2005/04/09");
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
  }
  return age;
}
function App() {
  const [time, setTime] = React.useState('');

  useEffect(()=>{
    var d = new Date();
    var local = d.getTime();
    var offset = d.getTimezoneOffset() * (60 * 1000);
    var utc = new Date(local + offset);
    var riyadh = new Date(utc.getTime() + (3 * 60 * 60 * 1000));
  
    setTime(riyadh.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    }))
    setInterval(()=>{ 
      var d = new Date();
      var local = d.getTime();
      var offset = d.getTimezoneOffset() * (60 * 1000);
      var utc = new Date(local + offset);
      var riyadh = new Date(utc.getTime() + (3 * 60 * 60 * 1000));

      setTime(riyadh.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }))}, 2000);
  },[])

  
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
<div id="top" className="dark:bg-gray-900">
<Switcher />
<div className="h-screen flex flex-col items-center justify-center">
    <form>
    <span href="!#"  className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{user['name']}</h5>
    <p className="font-bold text-gray-400 dark:text-gray-300">{user['bio']}</p>

    <p className="font-normal text-gray-700 dark:text-gray-400">Known online as alMajor, a {getAge()} y/o Software Engineer from {user['location']}<br></br>Currently a Fullstack web Developer.
interested in Cybersecurity, Data Analysis, Machine Learning.</p>



  <div className="px-0 pt-2 pb-0">
    <span className="inline-block bg-gray-200 rounded-full dark:bg-gray-700  px-3 py-1 text-sm font-semibold text-gray-500 dark:text-gray-200 mr-2 mb-2">{user['company']? user['company']:"I don't belong to company"}</span>
  </div>

  <span className="inline-block rounded-full px-3 py-1 text-sm font-semibold text-green-600 mr-2 mb-2">* Most of the information are collected directly from my github account</span>
  <div className="text-center py-4 lg:px-4">
  <a href={user['html_url']} className="p-1 m-1.5	 dark:bg-indigo-600 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex" role="alert">
    <span className="flex rounded-full dark:bg-indigo-700 bg-indigo-600 uppercase px-2 py-1 text-xs font-bold mr-3">CHECK</span>
    <span className="font-semibold mr-2 text-left flex-auto">Latest blog posts</span>
    <svg className="fill-current opacity-75 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"/></svg>
  </a>
  <a href={"mailto:abdulrahmanaab7@gmail.com"} className="p-1 m-1.5	dark:bg-red-600 bg-red-800 items-center text-red-100 leading-none lg:rounded-full flex lg:inline-flex" role="alert">
    <span className="flex rounded-full dark:bg-red-700 bg-red-600 uppercase px-2 py-1 text-xs font-bold mr-3">MAIL</span>
    <span className="font-semibold mr-2 text-left flex-auto">Reach me</span>
    <svg className="fill-current opacity-75 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"/></svg>
  </a>
  <p className="inline-block text-sm font-semibold text-gray-500 dark:text-gray-200">My local time: {time}</p>

    
</div>

</span>

            </form>
        </div>
  </div>

    );
}
  
export default App;
