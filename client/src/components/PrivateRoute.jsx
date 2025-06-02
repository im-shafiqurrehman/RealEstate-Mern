import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoute() {
    const {currentUser} = useSelector((state) => state.user);

  return currentUser ? <Outlet /> : <Navigate to={'/sign-in'} />;
}


// 🚀 Component	🔎       Explanation (Roman Urdu)
// <Outlet />	            Yeh nested route ko render karta hai. Agar user authenticated ho to actual content (e.g. profile page) show hota hai.
// <Navigate />          	Yeh user ko dusri route par programmatically redirect kar deta hai, jaise /sign-in page par le jata hai agar user authenticated nahi ho.

// 🔑 Summary
// <Outlet /> = Content show karo.

// <Navigate /> = Dusri page pe bhej do.