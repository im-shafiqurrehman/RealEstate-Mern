import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Profile from './pages/Profile';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import CreateListing from './pages/CreateListing';
import UpdateListing from './pages/UpdateListing';
import Listing from './pages/Listing';
import Search from './pages/Search';


export default function App() {
  return (
    <BrowserRouter>
      {/* Har page pe Header show karwana (navigation bar) */}
      <Header />

      {/* Routes define kar rahe hain */}
      <Routes>
        {/* Public routes (koi bhi user inko access kar sakta hai) */}
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/listing/:listingId" element={<Listing />} />
        <Route path="/search" element={<Search />} />

        {/* PrivateRoute component ek guard ki tarah kaam karta hai, agar user authorized nahi to redirect karega */}
        <Route element={<PrivateRoute />}>
          {/* Private pages: */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/update-listing/:listingId" element={<UpdateListing />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

// ✅ BrowserRouter — React Router ke liye main wrapper jo URL ko listen karta hai.
// ✅ Routes — Saare route definitions ko group karta hai.
// ✅ Route — Ek specific path aur uss path par render hone wale component ko define karta hai.
// ✅ PrivateRoute — Ye ek custom component hoga jisme protected routes ki logic hogi (jaise agar user login nahi to redirect to SignIn page).
// ✅ Dynamic params — :listingId se dynamic URL ko handle kiya jata hai (jaise /listing/12345).