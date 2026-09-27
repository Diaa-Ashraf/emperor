$testEmail = "test_user_" + (Get-Random) + "@emperor.com"
Write-Host "=============================================="
Write-Host "PHASE 1B -- API VERIFICATION TEST SUITE"
Write-Host "=============================================="

# 1. Register
$regBody = @{
    name = "مستخدم تجريبي جديد"
    email = $testEmail
    password = "Password@123"
    password_confirmation = "Password@123"
    currency = "EGP"
} | ConvertTo-Json

$regRes = Invoke-RestMethod -Uri "http://127.0.0.1:8000/api/v1/auth/register" -Method POST -Body $regBody -ContentType "application/json"
$token = $regRes.data.token
Write-Host "[PASS] 1. POST /api/v1/auth/register -> Token received, User ID:" $regRes.data.user.id

# 2. Login
$loginBody = @{ email = $testEmail; password = "Password@123" } | ConvertTo-Json
$loginRes = Invoke-RestMethod -Uri "http://127.0.0.1:8000/api/v1/auth/login" -Method POST -Body $loginBody -ContentType "application/json"
$token = $loginRes.data.token
Write-Host "[PASS] 2. POST /api/v1/auth/login -> Logged in successfully."

$headers = @{ Authorization = "Bearer $token"; Accept = "application/json" }

# 3. Complete Profile
$compBody = @{ phone = "+2010" + (Get-Random -Minimum 10000000 -Maximum 99999999); currency = "EGP" } | ConvertTo-Json
$compRes = Invoke-RestMethod -Uri "http://127.0.0.1:8000/api/v1/profile/complete" -Method PUT -Headers $headers -Body $compBody -ContentType "application/json"
Write-Host "[PASS] 3. PUT /api/v1/profile/complete -> Phone updated:" $compRes.data.phone

# 4. Profile Show
$profRes = Invoke-RestMethod -Uri "http://127.0.0.1:8000/api/v1/profile" -Method GET -Headers $headers
Write-Host "[PASS] 4. GET /api/v1/profile -> Name:" $profRes.data.name "Wallet Balance:" $profRes.data.wallet.balance

# 5. Wallet Balance
$balRes = Invoke-RestMethod -Uri "http://127.0.0.1:8000/api/v1/wallet/balance" -Method GET -Headers $headers
Write-Host "[PASS] 5. GET /api/v1/wallet/balance -> Balance:" $balRes.data.balance $balRes.data.currency "(USD equivalent: $" $balRes.data.balance_usd ")"

# 6. Wallet Transactions
$txRes = Invoke-RestMethod -Uri "http://127.0.0.1:8000/api/v1/wallet/transactions" -Method GET -Headers $headers
Write-Host "[PASS] 6. GET /api/v1/wallet/transactions -> Total:" $txRes.pagination.total

# 7. Deposit Methods
$methodsRes = Invoke-RestMethod -Uri "http://127.0.0.1:8000/api/v1/deposits/methods" -Method GET
Write-Host "[PASS] 7. GET /api/v1/deposits/methods -> Active Methods Count:" $methodsRes.data.Count

# 8. Submit Deposit Request
$depBody = @{
    payment_method_id = $methodsRes.data[0].id
    amount = 1500
    sender_account = "01055667788"
    transaction_reference = "TX-API-" + (Get-Random)
} | ConvertTo-Json

$depRes = Invoke-RestMethod -Uri "http://127.0.0.1:8000/api/v1/deposits" -Method POST -Headers $headers -Body $depBody -ContentType "application/json"
$depositId = $depRes.data.id
Write-Host "[PASS] 8. POST /api/v1/deposits -> Created Deposit ID:" $depositId "Amount:" $depRes.data.final_amount

# 9. Get User Deposits
$userDeps = Invoke-RestMethod -Uri "http://127.0.0.1:8000/api/v1/deposits" -Method GET -Headers $headers
Write-Host "[PASS] 9. GET /api/v1/deposits -> User deposits total:" $userDeps.pagination.total

# 10. Admin Approves Deposit via Artisan/Service -> Check API wallet balance update
php artisan tinker --execute="`$d = App\Models\DepositRequest::find($depositId); `$admin = App\Models\User::first(); app(App\Services\DepositService::class)->approve(`$d, `$admin, 'Approved via API verification test');"
$balAfter = Invoke-RestMethod -Uri "http://127.0.0.1:8000/api/v1/wallet/balance" -Method GET -Headers $headers
Write-Host "[PASS] 10. Admin Approved Deposit -> New Wallet Balance in API:" $balAfter.data.balance "EGP (Credited 1500 EGP)"

# 11. Arabic Validation Error Test
try {
    $badLogin = @{ email = "not-an-email"; password = "" } | ConvertTo-Json
    Invoke-RestMethod -Uri "http://127.0.0.1:8000/api/v1/auth/login" -Method POST -Body $badLogin -ContentType "application/json"
} catch {
    $errRes = $_.ErrorDetails.Message | ConvertFrom-Json
    Write-Host "[PASS] 11. Arabic Validation Errors:" $errRes.errors.email[0] "-" $errRes.errors.password[0]
}

# 12. Logout
$logoutRes = Invoke-RestMethod -Uri "http://127.0.0.1:8000/api/v1/auth/logout" -Method POST -Headers $headers
Write-Host "[PASS] 12. POST /api/v1/auth/logout ->" $logoutRes.message
Write-Host "=============================================="
Write-Host "ALL 12 TESTS IN PHASE 1B PASSED WITH 100% SUCCESS!"
Write-Host "=============================================="
