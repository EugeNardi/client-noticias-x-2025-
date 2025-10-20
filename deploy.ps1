# Script de despliegue automático para Noticias X
# Ejecutar con: .\deploy.ps1

Write-Host "═══════════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  🚀 DESPLIEGUE AUTOMÁTICO - NOTICIAS X FULLSTACK" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# Verificar si estamos en el directorio correcto
if (-Not (Test-Path "package.json")) {
    Write-Host "❌ Error: No se encuentra package.json" -ForegroundColor Red
    Write-Host "Asegúrate de ejecutar este script desde la carpeta client" -ForegroundColor Yellow
    exit 1
}

# Verificar si node_modules existe
if (-Not (Test-Path "node_modules")) {
    Write-Host "📦 Instalando dependencias..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Error al instalar dependencias" -ForegroundColor Red
        exit 1
    }
}

# Build del proyecto
Write-Host ""
Write-Host "🔨 Construyendo el proyecto..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error en el build" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "✅ Build completado exitosamente!" -ForegroundColor Green
Write-Host ""

# Verificar si Netlify CLI está instalado
$netlifyInstalled = Get-Command netlify -ErrorAction SilentlyContinue

if (-Not $netlifyInstalled) {
    Write-Host "⚠️  Netlify CLI no está instalado" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Opciones:" -ForegroundColor Cyan
    Write-Host "1. Instalar Netlify CLI: npm install -g netlify-cli" -ForegroundColor White
    Write-Host "2. Deploy manual: Arrastra la carpeta 'dist' a https://app.netlify.com" -ForegroundColor White
    Write-Host ""
    exit 0
}

# Preguntar si desea desplegar
Write-Host "¿Deseas desplegar a producción ahora? (S/N): " -ForegroundColor Cyan -NoNewline
$respuesta = Read-Host

if ($respuesta -eq "S" -or $respuesta -eq "s" -or $respuesta -eq "Y" -or $respuesta -eq "y") {
    Write-Host ""
    Write-Host "🚀 Desplegando a Netlify..." -ForegroundColor Yellow
    netlify deploy --prod
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "═══════════════════════════════════════════════════════════════════" -ForegroundColor Green
        Write-Host "  ✅ DESPLIEGUE COMPLETADO EXITOSAMENTE!" -ForegroundColor Green
        Write-Host "═══════════════════════════════════════════════════════════════════" -ForegroundColor Green
        Write-Host ""
        Write-Host "🌐 Tu sitio está disponible en:" -ForegroundColor Cyan
        Write-Host "   - https://noticias-x.netlify.app" -ForegroundColor White
        Write-Host "   - https://noticias-x.com (si configuraste el dominio)" -ForegroundColor White
        Write-Host ""
        Write-Host "🔍 Verifica la API:" -ForegroundColor Cyan
        Write-Host "   https://noticias-x.netlify.app/api" -ForegroundColor White
        Write-Host ""
    } else {
        Write-Host ""
        Write-Host "❌ Error al desplegar" -ForegroundColor Red
        Write-Host "Verifica tu conexión y que estés autenticado en Netlify" -ForegroundColor Yellow
    }
} else {
    Write-Host ""
    Write-Host "📁 Build listo en la carpeta 'dist'" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Para desplegar manualmente:" -ForegroundColor Yellow
    Write-Host "1. Ve a: https://app.netlify.com" -ForegroundColor White
    Write-Host "2. Arrastra la carpeta 'dist' completa" -ForegroundColor White
    Write-Host ""
    Write-Host "O ejecuta: netlify deploy --prod" -ForegroundColor White
    Write-Host ""
}
