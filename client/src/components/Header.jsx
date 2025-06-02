import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
// useSelector: Redux state ko component me access karta hai.
// Agar user logged in hai to avatar ya username show karta hai.


export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  //   Redux store se state.user.currentUser ko le raha hai.
  // Agar user login hai to uska data (avatar, username etc.) yahan milega.
  const [searchTerm, setSearchTerm] = useState('');
  const [avatarError, setAvatarError] = useState(false);
  const navigate = useNavigate();


  // Ye ek arrow function hai jo e (event object) ko parameter ke taur pe accept karta hai.
  //e ya event object ek special JavaScript object hai jo automatically generate hota hai jab koi event (like click, submit, keypress)
  //  trigger hota hai.
  // Ye object event se related saari details rakhta hai (konsa element, kab, kahan click hua, etc.) 
  //  e.target → Element batata hai jis par event hua

  const handleSubmit = (e) => {
    e.preventDefault();
    // Browser ka default form submission rok deta hai, taki page reload na ho aur React routing ka use ho.

    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
    // 4️ navigate function se user ko programmatically "/search" page pe bhej raha hai.
    // e.g. navigate(`/search?searchTerm=newValue`)
    // Iska fayda ye hai ke bina page reload ke user search results dekh sakta hai.
  };


  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  useEffect(() => {
    if (currentUser && currentUser.avatar) {   // currectUser =>  state.user.currentUser
      const img = new Image();
      img.src = currentUser.avatar;
      img.onload = () => setAvatarError(false);
      img.onerror = () => setAvatarError(true);
    }
  }, [currentUser]);

  return (
    <header className='bg-slate-200 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
          <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-slate-500'>Al-Rehman</span>
            <span className='text-slate-700'>Estate</span>
          </h1>
        </Link>
        <form
          onSubmit={handleSubmit}
          className='bg-slate-100 p-3 rounded-lg flex items-center'
        >
          <input
            type='text'
            placeholder='Search...'
            className='bg-transparent focus:outline-none w-24 sm:w-64'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">
            <FaSearch className='text-slate-600' />
          </button>
        </form>
        <ul className='flex gap-4'>
          <Link to='/'>
            <li className='hidden sm:inline text-slate-700 hover:underline'>
              Home
            </li>
          </Link>
          <Link to='/about'>
            <li className='hidden sm:inline text-slate-700 hover:underline'>
              About
            </li>
          </Link>
          <Link to='/profile'>
            {currentUser ? (
              avatarError ? (
                <div className='rounded-full h-7 w-7 bg-slate-500 flex items-center justify-center text-white'>
                  {currentUser.username ? currentUser.username[0].toUpperCase() : '?'}
                </div>
              ) : (
                <img
                  className='rounded-full h-7 w-7 object-cover'
                  src={currentUser.avatar}
                  alt='profile'
                  onError={() => setAvatarError(true)}
                />
              )
            ) : (
              <li className='text-slate-700 hover:underline'> Sign in</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}