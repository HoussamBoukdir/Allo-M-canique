<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class MechanicController extends Controller
{
    public function index()
    {
        $mechanics = User::where('role', 'mechanic')
            ->where('status', 'active')
            ->get();
            
        return response()->json($mechanics);
    }

    public function show($id)
    {
        $mechanic = User::where('role', 'mechanic')
            ->where('id', $id)
            ->firstOrFail();
            
        return response()->json($mechanic);
    }

    public function updateProfile(Request $request)
    {
        $user = $request->user();

        if ($user->role !== 'mechanic') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $user->update($request->only([
            'name', 'phone', 'city', 'address', 'specialty', 'experience'
        ]));

        return response()->json(['message' => 'Profile updated successfully', 'user' => $user]);
    }

    public function getRequests()
    {
        // Mock data or actual data from Request model
        return response()->json(\App\Models\Request::where('status', 'pending')->orWhere('mechanic_id', auth()->id())->get());
    }

    public function getSubscription($id)
    {
        return response()->json([
            'status' => 'active',
            'end_date' => '2026-12-31',
            'amount' => 200
        ]);
    }

    public function acceptRequest(Request $request, $id)
    {
        $req = \App\Models\Request::findOrFail($id);
        $req->mechanic_id = $request->user()->id;
        $req->status = 'in_progress';
        $req->save();
        return response()->json($req);
    }

    public function completeRequest(Request $request, $id)
    {
        $req = \App\Models\Request::findOrFail($id);
        $req->status = 'completed';
        $req->save();
        return response()->json($req);
    }
}
