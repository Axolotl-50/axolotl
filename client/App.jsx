import React, { useState } from 'react';
import Login from './component/login.jsx';
import Signup from './component/signup.jsx';
import Main from './component/main.jsx';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import './style.css';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [firstName, setFirstName] = useState('');
  const [activity, setActivity] = useState('');
  const [skillLevel, setSkillLevel] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [distance, setDistance] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [allActivities] = useState(['Golf', 'Hiking', 'Camping', 'Biking']);
  const [selectedA, setSelectedA] = useState({});
  const [zipcodes, setZipcodes] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  // const [miles, setMiles] = useState(0);

  const loginState = () => {
    setIsLogin(true);
  };

  return (
    <>
      <Router>
        <Routes>
          {/* <nav></nav> */}
          <Route
            path='/login'
            element={
              <Login
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                loginState={loginState}
                confirmPw={confirmPw}
                setConfirmPw={setConfirmPw}
                firstName={firstName}
                setFirstName={setFirstName}
                activity={activity}
                setActivity={setActivity}
                skillLevel={skillLevel}
                setSkillLevel={setSkillLevel}
                city={city}
                setCity={setCity}
                zipCode={zipCode}
                setZipCode={setZipCode}
                gender={gender}
                setGender={setGender}
                phone={phone}
                setPhone={setPhone}
                allActivities={allActivities}
                selectedA={selectedA}
                setSelectedA={setSelectedA}
              />
            }
          />
          <Route
            path='/'
            element={
              <Login
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                loginState={loginState}
              />
            }
          />
          <Route
            path='/signup'
            element={
              <Signup
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                confirmPw={confirmPw}
                setConfirmPw={setConfirmPw}
                firstName={firstName}
                setFirstName={setFirstName}
                activity={activity}
                setActivity={setActivity}
                skillLevel={skillLevel}
                setSkillLevel={setSkillLevel}
                city={city}
                setCity={setCity}
                zipCode={zipCode}
                setZipCode={setZipCode}
                gender={gender}
                setGender={setGender}
                phone={phone}
                setPhone={setPhone}
                allActivities={allActivities}
                selectedA={selectedA}
                setSelectedA={setSelectedA}
              />
            }
          />
          <Route
            path='/main'
            element={
              isLogin ? (
                <Main
                  email={email}
                  setEmail={setEmail}
                  password={password}
                  setPassword={setPassword}
                  confirmPw={confirmPw}
                  setConfirmPw={setConfirmPw}
                  firstName={firstName}
                  setFirstName={setFirstName}
                  activity={activity}
                  setActivity={setActivity}
                  skillLevel={skillLevel}
                  setSkillLevel={setSkillLevel}
                  city={city}
                  setCity={setCity}
                  zipCode={zipCode}
                  setZipCode={setZipCode}
                  distance={distance}
                  setDistance={setDistance}
                  gender={gender}
                  setGender={setGender}
                  phone={phone}
                  setPhone={setPhone}
                  allActivities={allActivities}
                  selectedA={selectedA}
                  setSelectedA={setSelectedA}
                  zipcodes={zipcodes}
                  setZipcodes={setZipcodes}
                  // miles={miles}
                  // setMiles={setMiles}
                />
              ) : (
                <Navigate to='/login' />
              )
            }
          />
        </Routes>
      </Router>
    </>
  );
}
