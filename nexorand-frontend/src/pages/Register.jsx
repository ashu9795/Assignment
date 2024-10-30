// src/components/RegistrationPage.js
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';

// Validation schema for registration
const registrationSchema = yup.object().shape({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    username: yup.string().required('Username is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const RegistrationPage = ({ onRegisterSuccess }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(registrationSchema),
    });

    const onRegistrationSubmit = async (data) => {
        try {
            const response = await axios.post('http://localhost:7000/api/auth/v1/register', data);
            alert('Registration successful');
            console.log(response.data); // handle success response
            if (onRegisterSuccess) onRegisterSuccess(response.data); // Call the success function if defined
            reset(); // Clear the form fields after successful registration
        } catch (error) {
            console.error(error);
            alert('Registration failed');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
            <div className="bg-white shadow-md rounded-lg p-6 sm:p-8 max-w-full sm:max-w-md lg:max-w-lg w-full">
                <h2 className="text-2xl font-bold text-center text-red-800 mb-6">Sign Up</h2>
                <form onSubmit={handleSubmit(onRegistrationSubmit)}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                            First Name
                        </label>
                        <input
                            type="text"
                            {...register('firstName')}
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="Enter your first name"
                        />
                        {errors.firstName && <p className="text-red-500 text-xs italic">{errors.firstName.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                            Last Name
                        </label>
                        <input
                            type="text"
                            {...register('lastName')}
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="Enter your last name"
                        />
                        {errors.lastName && <p className="text-red-500 text-xs italic">{errors.lastName.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            {...register('email')}
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="Enter your email"
                        />
                        {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
                    </div>

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
                        Sign Up
                    </button>
                </form>
                <p className="mt-4 text-center text-gray-600">
                    Already have an account? 
                    <a href="/login" className="text-red-600 hover:underline"> Login</a>
                </p>
            </div>
        </div>
    );
};

export default RegistrationPage;
