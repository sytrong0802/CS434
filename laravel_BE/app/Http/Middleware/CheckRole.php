<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        $user = $request->user();

        if (! $user) {
            return response()->json([
                'status' => 0,
                'message' => 'Chưa đăng nhập',
            ], 401);
        }

        if (! in_array($user->vai_tro, $roles)) {
            return response()->json([
                'status' => 0,
                'message' => 'Không có quyền truy cập chức năng này',
            ], 403);
        }

        return $next($request);
    }
}
