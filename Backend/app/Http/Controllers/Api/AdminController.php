<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class AdminController extends Controller
{
    public function getPendingMechanics()
    {
        $mechanics = User::where('role', 'mechanic')
            ->where('status', 'pending')
            ->get();
            
        return response()->json($mechanics);
    }

    public function approveMechanic($id)
    {
        $mechanic = User::findOrFail($id);
        $mechanic->status = 'active';
        $mechanic->save();

        return response()->json(['message' => 'Mécanicien approuvé avec succès']);
    }

    public function rejectMechanic($id)
    {
        $mechanic = User::findOrFail($id);
        $mechanic->status = 'inactive';
        $mechanic->save();

        return response()->json(['message' => 'Mécanicien rejeté']);
    }

    public function getRequests()
    {
        return response()->json(\App\Models\Request::with(['client', 'mechanic'])->get());
    }

    public function getUsers()
    {
        return response()->json(User::all());
    }

    public function getSubscriptions()
    {
        // For now return empty or simple list if Subscription model is ready
        return response()->json(\App\Models\Subscription::all());
    }

    public function getStats()
    {
        return response()->json([
            'totalClients' => User::where('role', 'client')->count(),
            'totalMechanics' => User::where('role', 'mechanic')->count(),
            'activeRequests' => \App\Models\Request::count(), // Simplified
            'monthlyRevenue' => \App\Models\Subscription::sum('amount'), // Simplified
        ]);
    }
}
