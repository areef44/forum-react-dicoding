import React, { useEffect } from 'react';
import { Routes, Route} from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DetailPage from './pages/DetailPage';
import { asyncPreloadProcess } from './states/isPreload/action';
import { asyncUnSetAuthUser } from './states/authUser/action';
import HomePage from './pages/HomePage';
import Navigation from './components/Navigation';
import LeaderboardPage from './pages/LeaderboardPage';

function App() {
  const {
    authUser = null,
    isPreload = false,
  } = useSelector(
    (states) => states
  );

  const dispatch = useDispatch(); 

  useEffect(() => {
    dispatch(asyncPreloadProcess())

  }, [dispatch]);

  const onSignOut = () => {
    dispatch(asyncUnSetAuthUser())
  };

  if (isPreload) {
    return null;
  }

  if (authUser === null) {
    return (
      <>
        <main>
          <Routes>
            <Route path="/*" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </main>
      </>
    );
  }

  return (
    <>
      <div>
        <header>
          <Navigation authUser={authUser} signOut={onSignOut}/>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/threads/:id" element={<DetailPage />} />
            <Route path="/leaderboards" element={<LeaderboardPage />}/>
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
