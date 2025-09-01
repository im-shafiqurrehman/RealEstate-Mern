import React from 'react'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { buildApiUrl, API_ENDPOINTS } from '../config/api.js';

export default function OAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      
      // Add additional scopes if needed
      provider.addScope('email');
      provider.addScope('profile');
      
      const result = await signInWithPopup(auth, provider); 
      const res = await fetch(buildApiUrl(API_ENDPOINTS.GOOGLE_AUTH),{
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body:JSON.stringify({
            name:result.user.displayName,
            email:result.user.email,
            photo:result.user.photoURL
        }),
        credentials: 'include',
      });
        const data = await res.json();
        
        if (data.success === false) {
          console.error('Server error:', data.message);
          return;
        }
        
        dispatch(signInSuccess(data));
        navigate("/");
    } catch (error) {
      console.error('Google sign-in error:', error);
      
      // Handle specific Firebase errors
      if (error.code === 'auth/unauthorized-domain') {
        alert('This domain is not authorized for Google Sign-In. Please contact the administrator.');
      } else if (error.code === 'auth/popup-blocked') {
        alert('Popup was blocked. Please allow popups for this site.');
      } else if (error.code === 'auth/popup-closed-by-user') {
        console.log('User closed the popup');
      } else {
        alert('Could not sign in with Google. Please try again.');
      }
    }
  };

  return (
    <button onClick={handleGoogleClick}
      type='button'
      className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>
      Continue with Google
    </button>
  );
}

