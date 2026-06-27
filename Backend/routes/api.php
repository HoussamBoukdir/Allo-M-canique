<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\MechanicController;
use App\Http\Controllers\Api\ClientController;
use App\Http\Controllers\Api\AdminController;

// Auth Routes
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/me', [AuthController::class, 'me']);
    
    // Admin Routes
    Route::prefix('admin')->group(function () {
        Route::get('/pending-mechanics', [AdminController::class, 'getPendingMechanics']);
        Route::post('/approve-mechanic/{id}', [AdminController::class, 'approveMechanic']);
        Route::post('/reject-mechanic/{id}', [AdminController::class, 'rejectMechanic']);
        Route::get('/stats', [AdminController::class, 'getStats']);
        Route::get('/users', [AdminController::class, 'getUsers']);
        Route::get('/payments', [AdminController::class, 'getSubscriptions']);
        Route::get('/requests', [AdminController::class, 'getRequests']);
    });

    // Mechanic Routes
    Route::prefix('mechanic')->group(function () {
        Route::put('/profile', [MechanicController::class, 'updateProfile']);
        Route::get('/requests/available', [MechanicController::class, 'getRequests']);
        Route::put('/requests/{id}/accept', [MechanicController::class, 'acceptRequest']);
        Route::put('/requests/{id}/complete', [MechanicController::class, 'completeRequest']);
        Route::get('/subscription/{id}', [MechanicController::class, 'getSubscription']);
    });
});

// Public Routes
Route::get('/mechanics', [MechanicController::class, 'index']);
Route::get('/mechanics/{id}', [MechanicController::class, 'show']);
