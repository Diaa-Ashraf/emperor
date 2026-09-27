<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\View\View;

class PlaceholderAdminController extends Controller
{
    public function index(string $title, string $icon, string $description = ''): View
    {
        return view('admin.placeholder', compact('title', 'icon', 'description'));
    }
}
