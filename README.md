# sistemaSaude

Route::post('invites/send', [InviteController::class, 'sendInvite'])->middleware('permission:manage users');
Route::post('register/{token}', [AuthController::class, 'registerWithInvite']);

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::middleware('auth:api')->group(function () {
    // ...

    Route::middleware('permission:view admin dashboard')->group(function () {
        Route::get('/admin/dashboard', function () {
            return response()->json(['message' => 'Admin Dashboard']);
        });
    });

    Route::middleware('permission:view gerente dashboard')->group(function () {
        Route::get('/gerente/dashboard', function () {
            return response()->json(['message' => 'Gerente Dashboard']);
        });
    });

    Route::middleware('permission:view agendador dashboard')->group(function () {
        Route::get('/agendador/dashboard', function () {
            return response()->json(['message' => 'Agendador Dashboard']);
        });
    });

    Route::middleware('permission:view profissional dashboard')->group(function () {
        Route::get('/profissional/dashboard', function () {
            return response()->json(['message' => 'profissional Dashboard']);
        });
    });

});




criei um usuario com nome sistema
com email sistema@exemplo.com.br
com senha 12345678

class AdminUserSeeder extends Seeder
{
    public function run()
    {
        $user = DB::table('users')->insert([
            'name' => 'sistema',
            'email' => 'sistema@exemplo.com.br', // Substitua pelo email desejado
            'password' => Hash::make('12345678'),
        ]);

        $adminRole = Role::where('name', 'admin')->first(); // Assumindo que você já tem o role 'admin'
        $user = DB::table('users')->where('email', 'sistema@exemplo.com.br')->first();

        if ($adminRole && $user) {
            DB::table('model_has_roles')->insert([
                'role_id' => $adminRole->id,
                'model_type' => 'App\Models\User',
                'model_id' => $user->id,
            ]);
        }
    }
}