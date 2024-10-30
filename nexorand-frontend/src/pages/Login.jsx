// src/components/LoginPage.js
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

// Validation schema for login
const loginSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
});

const LoginPage = () => {
    const { login } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(loginSchema),
    });

    const navigate = useNavigate();

    const onLoginSubmit = async (data) => {
        try {
            await login(data);
            alert('Login successful');
            reset();
            navigate('/');
        } catch (error) {
            console.error('Login error:', error);
            alert('Login failed');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
            <div className="bg-white shadow-md rounded-lg p-6 sm:p-8 lg:p-10 max-w-xs sm:max-w-md w-full">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center text-red-800 mb-4 sm:mb-6">Login</h2>
                <form onSubmit={handleSubmit(onLoginSubmit)}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            type="text"
                            {...register('username')}
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.username ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="Enter your username"
                        />
                        {errors.username && <p className="text-red-500 text-xs italic">{errors.username.message}</p>}
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            {...register('password')}
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="Enter your password"
                        />
                        {errors.password && <p className="text-red-500 text-xs italic">{errors.password.message}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-4 text-center text-gray-600 text-sm sm:text-base">
                    Don't have an account? 
                    <a href="/register" className="text-red-600 hover:underline"> Sign Up</a>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
