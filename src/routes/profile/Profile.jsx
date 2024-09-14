import React from 'react'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Profile = () => {
  const user = useSelector(state => state.auth)

  console.log(user)

  return (
    <>
      <div>
        {user ? (
          <div>
            <h1>Профиль пользователя</h1>
            <p>Имя: {user.name}</p>
            <p>Email: {user.email}</p>
            {user.avatar && <img src={user.avatar} alt="Аватар пользователя" />}
          </div>
        ) : (
          <p>Пользователь не авторизован</p>
        )}
      </div>
      
      <Outlet />
    </>
  )
}

export default Profile
