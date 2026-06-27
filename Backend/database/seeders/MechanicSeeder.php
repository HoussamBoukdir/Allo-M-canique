<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MechanicSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\User::create([
            'name' => 'Garage Hassan',
            'email' => 'hassan@example.com',
            'password' => \Illuminate\Support\Facades\Hash::make('password'),
            'role' => 'mechanic',
            'status' => 'active',
            'specialty' => 'engine',
            'city' => 'Casablanca',
            'latitude' => 33.5731,
            'longitude' => -7.5898,
        ]);

        \App\Models\User::create([
            'name' => 'Auto Expert',
            'email' => 'expert@example.com',
            'password' => \Illuminate\Support\Facades\Hash::make('password'),
            'role' => 'mechanic',
            'status' => 'active',
            'specialty' => 'electrical',
            'city' => 'Casablanca',
            'latitude' => 33.5831,
            'longitude' => -7.5998,
        ]);
        
        \App\Models\User::create([
            'name' => 'Mécanique Rapide',
            'email' => 'rapide@example.com',
            'password' => \Illuminate\Support\Facades\Hash::make('password'),
            'role' => 'mechanic',
            'status' => 'pending', // One pending for the admin dashboard
            'specialty' => 'general',
            'city' => 'Casablanca',
            'latitude' => 33.5631,
            'longitude' => -7.5798,
            'cin' => 'AB987654'
        ]);
    }
}
