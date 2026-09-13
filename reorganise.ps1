# FinanceGuard - Auto Reorganise Script
# Run this in VS Code terminal from your financeguard folder

Write-Host "Starting reorganisation..." -ForegroundColor Cyan

# ── CREATE ALL FOLDERS ──────────────────────────────────────────────────────
New-Item -ItemType Directory -Force -Path "backend/src/main/java/com/financeguard" | Out-Null
New-Item -ItemType Directory -Force -Path "backend/src/main/resources" | Out-Null
New-Item -ItemType Directory -Force -Path "frontend/src/components" | Out-Null
New-Item -ItemType Directory -Force -Path "frontend/src/pages" | Out-Null
New-Item -ItemType Directory -Force -Path "frontend/src/api" | Out-Null
New-Item -ItemType Directory -Force -Path "ml-engine/model" | Out-Null
New-Item -ItemType Directory -Force -Path "ml-engine/tests" | Out-Null
New-Item -ItemType Directory -Force -Path ".github/workflows" | Out-Null

Write-Host "Folders created" -ForegroundColor Green

# ── MOVE JAVA FILES ──────────────────────────────────────────────────────────
$javaFiles = @(
    "FinanceGuardApplication.java",
    "AuthController.java",
    "AuthService.java",
    "AuthResponse.java",
    "DashboardController.java",
    "DashboardService.java",
    "FraudController.java",
    "FraudAlert.java",
    "FraudAlertRepository.java",
    "FraudAlertResponse.java",
    "JwtAuthenticationFilter.java",
    "JwtConfig.java",
    "LoginRequest.java",
    "RegisterRequest.java",
    "SecurityConfig.java",
    "Transaction.java",
    "TransactionController.java",
    "TransactionRepository.java",
    "TransactionRequest.java",
    "TransactionService.java",
    "User.java",
    "UserRepository.java"
)

foreach ($file in $javaFiles) {
    if (Test-Path $file) {
        Move-Item -Path $file -Destination "backend/src/main/java/com/financeguard/$file" -Force
        Write-Host "Moved $file" -ForegroundColor Gray
    }
}

# ── MOVE BACKEND CONFIG FILES ────────────────────────────────────────────────
if (Test-Path "pom.xml") {
    Move-Item -Path "pom.xml" -Destination "backend/pom.xml" -Force
    Write-Host "Moved pom.xml" -ForegroundColor Gray
}
if (Test-Path "application.properties") {
    Move-Item -Path "application.properties" -Destination "backend/src/main/resources/application.properties" -Force
    Write-Host "Moved application.properties" -ForegroundColor Gray
}

# Move Dockerfile - check which one belongs to backend
# (if you have multiple Dockerfiles, rename them first)
if (Test-Path "Dockerfile") {
    Move-Item -Path "Dockerfile" -Destination "backend/Dockerfile" -Force
    Write-Host "Moved Dockerfile to backend" -ForegroundColor Gray
}

# ── MOVE FRONTEND COMPONENT FILES ────────────────────────────────────────────
$componentFiles = @(
    "Dashboard.tsx",
    "Dashboard.test.tsx",
    "TransactionForm.tsx",
    "TransactionList.tsx",
    "SpendingChart.tsx",
    "FraudAlerts.tsx",
    "BudgetRecommendations.tsx",
    "NavBar.tsx"
)

foreach ($file in $componentFiles) {
    if (Test-Path $file) {
        Move-Item -Path $file -Destination "frontend/src/components/$file" -Force
        Write-Host "Moved $file to components" -ForegroundColor Gray
    }
}

$pageFiles = @(
    "Login.tsx",
    "Home.tsx",
    "Fraud.tsx"
)

foreach ($file in $pageFiles) {
    if (Test-Path $file) {
        Move-Item -Path $file -Destination "frontend/src/pages/$file" -Force
        Write-Host "Moved $file to pages" -ForegroundColor Gray
    }
}

$apiFiles = @(
    "auth.ts",
    "transactions.ts",
    "fraud.ts"
)

foreach ($file in $apiFiles) {
    if (Test-Path $file) {
        Move-Item -Path $file -Destination "frontend/src/api/$file" -Force
        Write-Host "Moved $file to api" -ForegroundColor Gray
    }
}

$frontendRootFiles = @(
    "App.tsx",
    "main.tsx",
    "index.html",
    "index.css",
    "package.json",
    "tsconfig.json",
    "tailwind.config.js",
    "postcss.config.js",
    "vite.config.ts",
    "nginx.conf"
)

foreach ($file in $frontendRootFiles) {
    if (Test-Path $file) {
        Move-Item -Path $file -Destination "frontend/$file" -Force
        Write-Host "Moved $file to frontend root" -ForegroundColor Gray
    }
}

# Move main.tsx and index.css to src
if (Test-Path "frontend/main.tsx") {
    Move-Item -Path "frontend/main.tsx" -Destination "frontend/src/main.tsx" -Force
}
if (Test-Path "frontend/index.css") {
    Move-Item -Path "frontend/index.css" -Destination "frontend/src/index.css" -Force
}

# ── MOVE PYTHON ML FILES ─────────────────────────────────────────────────────
if (Test-Path "main.py") {
    Move-Item -Path "main.py" -Destination "ml-engine/main.py" -Force
    Write-Host "Moved main.py to ml-engine" -ForegroundColor Gray
}
if (Test-Path "requirements.txt") {
    Move-Item -Path "requirements.txt" -Destination "ml-engine/requirements.txt" -Force
    Write-Host "Moved requirements.txt" -ForegroundColor Gray
}
if (Test-Path "train.py") {
    Move-Item -Path "train.py" -Destination "ml-engine/model/train.py" -Force
    Write-Host "Moved train.py" -ForegroundColor Gray
}
if (Test-Path "predict.py") {
    Move-Item -Path "predict.py" -Destination "ml-engine/model/predict.py" -Force
    Write-Host "Moved predict.py" -ForegroundColor Gray
}
if (Test-Path "test_predict.py") {
    Move-Item -Path "test_predict.py" -Destination "ml-engine/tests/test_predict.py" -Force
    Write-Host "Moved test_predict.py" -ForegroundColor Gray
}

# ── MOVE CI/CD ───────────────────────────────────────────────────────────────
if (Test-Path "ci.yml") {
    Move-Item -Path "ci.yml" -Destination ".github/workflows/ci.yml" -Force
    Write-Host "Moved ci.yml" -ForegroundColor Gray
}

Write-Host ""
Write-Host "Reorganisation complete!" -ForegroundColor Green
Write-Host "Now pushing to GitHub..." -ForegroundColor Cyan

# ── GIT PUSH ─────────────────────────────────────────────────────────────────
git add .
git commit -m "Restructure: organise all files into backend, frontend, ml-engine folders"
git push origin main --force

Write-Host ""
Write-Host "Done! Check your GitHub repo now." -ForegroundColor Green
