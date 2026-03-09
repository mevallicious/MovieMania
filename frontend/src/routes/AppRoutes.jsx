import React from 'react'
import { BrowserRouter,Route,Routes } from "react-router-dom";
import Login from '../features/pages/Login';
import SignUp from '../features/pages/SignUp';
import Home from '../features/pages/Home';
import Search from '../features/pages/Search';
import MovieDetails from '../features/pages/MovieDetails';
import Favorites from '../features/pages/Favorites';
import History from '../features/pages/History';
import ProtectedRoute from './ProtectedRoute';

const AppRoutes = () => {
    return (
        <BrowserRouter>

        <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<SignUp />} />

            <Route path="/" element={
                <ProtectedRoute>
                <Home />
                </ProtectedRoute>
            }/>

            <Route path="/search" element={
                <ProtectedRoute>
                <Search />
                </ProtectedRoute>
            }/>

            <Route path="/movie/:id" element={
                <ProtectedRoute>
                <MovieDetails />
                </ProtectedRoute>
            }/>

            <Route path="/favorites" element={
                <ProtectedRoute>
                <Favorites />
                </ProtectedRoute>
            }/>

            <Route path="/history" element={
                <ProtectedRoute>
                <History />
                </ProtectedRoute>
            }/>

        </Routes>

        </BrowserRouter>
    )
}

export default AppRoutes