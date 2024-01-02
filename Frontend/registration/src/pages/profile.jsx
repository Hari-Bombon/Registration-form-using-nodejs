import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [userProfile, setUserProfile] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedBio, setEditedBio] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:8000/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        setUserProfile(response.data);
        setEditedBio(response.data.bio);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      await axios.put(
        'http://localhost:8000/profile',
        { bio: editedBio },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      setUserProfile((prevProfile) => ({ ...prevProfile, bio: editedBio }));
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user bio:', error);
    }
  };

  return (
    <div>
      <h1>Profile</h1>
      <div>
        <p>Name: {userProfile.name}</p>
        <p>Token ID: {userProfile.tokenId}</p>
        {isEditing ? (
          <>
            <textarea
              value={editedBio}
              placeholder="Enter bio"
              onChange={(e) => setEditedBio(e.target.value)}
            />
            <button onClick={handleSaveClick}>Save</button>
          </>
        ) : (
          <>
            <p>Bio: {userProfile.bio || 'Add a bio'}</p>
            <button onClick={handleEditClick}>Edit Bio</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
