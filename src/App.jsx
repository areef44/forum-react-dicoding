import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  const {
    authUser = null,
    isPreload = false,
  } = {}; // @TODO: get authUser and isPreLoad state from store

  const dispatch = null; // @TODO: get dispatch function from store

  useEffect(() => {
    // @TODO: dispatch async action to preload app

  }, [dispatch]);

  const onSignOut = () => {
    // @TODO: dispatch async action to sign out

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
      <Loading />
      <div className="app-container">
        <header>
          <Navigation authUser={authUser} signOut={onSignOut} />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/talks/:id" element={<DetailPage />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
