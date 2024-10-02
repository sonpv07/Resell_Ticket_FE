import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  
import './ViewProfile.scss';

function ViewProfile () {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phone: '',
    password: '', 
    rating: 0,
    ratingMax: 10,
  });

  const [showPassword, setShowPassword] = useState(false); // manage hide/show pass

  const navigate = useNavigate();  // Initialize navigation

  const fetchUserData = async () => {
    try {
      const response = await fetch('https://66f646f8436827ced976737d.mockapi.io/profile/1');
      const data = await response.json();
      setUserInfo(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // Toggle hiển thị mật khẩu
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container">
      <div className="profile">
        <img
          src="/avatar.jpg" 
          alt="Avatar"
          className="avatar"
        />
        <div className="info">
          <h1>{userInfo.name}</h1>
          <button className="edit-button" onClick={() => navigate('/edit-profile')}>Rename</button>
          <h3>Profile</h3>

          <div className="field">
            <p>Email address:</p>
            <div className="field-edit">
              <p>{userInfo.email}</p>
              <button onClick={() => navigate('/edit-profile')} className="small-edit-button">Edit</button>
            </div>
          </div>

          <div className="field">
            <p>Phone number:</p>
            <div className="field-edit">
              <p>{userInfo.phone}</p>
              <button onClick={() => navigate('/edit-profile')} className="small-edit-button">Edit</button>
            </div>
          </div>

          <div className="field">
            <p>Password:</p>
            <div className="field-edit">
              {/* kt nếu showPassword là true thì hiển thị, ngược lại ẩn */}
              <p>{showPassword ? userInfo.password : '*'.repeat(userInfo.password.length)}</p>
              <button onClick={toggleShowPassword} className="small-edit-button">
                {showPassword ? 'Hide' : 'Show'}
              </button>
              <button onClick={() => navigate('/edit-profile')} className="small-edit-button">Change</button>
            </div>
          </div>

          <p>Average Rating: {userInfo.rating}/{userInfo.ratingMax}</p>
        </div>
      </div>
    </div>
  );
}

export default ViewProfile;
