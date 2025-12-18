# Despliegue de n8n en Render

Esta guía te ayudará a desplegar tu fork de n8n en Render.

## 📋 Prerrequisitos

- Fork del repositorio n8n en tu cuenta de GitHub
- Cuenta en [Render](https://render.com)
- El repositorio debe estar público o tener acceso configurado

## 🚀 Pasos para el Despliegue

### 1. Conectar Repositorio en Render

1. Ve a [Render Dashboard](https://dashboard.render.com)
2. Haz clic en "New +" → "Blueprint"
3. Conecta tu repositorio de GitHub: `https://github.com/JSANCHEZP13/n8n.git`
4. Render detectará automáticamente el archivo `render.yaml`

### 2. Configuración Automática

El archivo `render.yaml` configurará automáticamente:
- ✅ Servicio web con Node.js
- ✅ Base de datos PostgreSQL
- ✅ Variables de entorno necesarias
- ✅ Comandos de build y start optimizados

### 3. Variables de Entorno Adicionales (Opcional)

Puedes agregar estas variables en el dashboard de Render si las necesitas:

```bash
# Configuración de email (opcional)
N8N_EMAIL_MODE=smtp
N8N_SMTP_HOST=smtp.gmail.com
N8N_SMTP_PORT=587
N8N_SMTP_USER=tu-email@gmail.com
N8N_SMTP_PASS=tu-contraseña-de-app
N8N_SMTP_SENDER=tu-email@gmail.com

# Gestión de usuarios (opcional)
N8N_USER_MANAGEMENT_DISABLED=false
N8N_OWNER_EMAIL=admin@tudominio.com
N8N_OWNER_PASSWORD=tu-contraseña-segura
```

### 4. Proceso de Despliegue

1. **Build**: Render ejecutará `pnpm install && pnpm build:deploy`
2. **Start**: Usará el script optimizado `start-render.js`
3. **Database**: Se creará automáticamente una base PostgreSQL
4. **SSL**: Render proporciona HTTPS automáticamente

## � Costios de Render

- **Web Service**: $7/mes (Starter Plan)
- **PostgreSQL Database**: GRATIS (Free Plan) - **PERSISTENTE**
- **Total**: $7/mes

¡Excelente! La base de datos PostgreSQL es gratuita, solo pagas por el servicio web.

## 🔧 Configuración Post-Despliegue

### Acceder a tu instancia

Una vez desplegado, tu n8n estará disponible en:
```
https://tu-app-name.onrender.com
```

### Configurar Webhooks

Las URLs de webhook serán automáticamente:
```
https://tu-app-name.onrender.com/webhook/[webhook-id]
```

### Primer Usuario

Si habilitaste la gestión de usuarios, crea el primer usuario admin:
1. Ve a tu URL de n8n
2. Completa el formulario de configuración inicial
3. O usa las variables `N8N_OWNER_EMAIL` y `N8N_OWNER_PASSWORD`

## 📊 Monitoreo

### Logs
- Ve a tu servicio en Render Dashboard
- Haz clic en "Logs" para ver los logs en tiempo real

### Métricas
- Render proporciona métricas básicas de CPU y memoria
- n8n tiene métricas habilitadas (`N8N_METRICS=true`)

### Health Check
- Render verificará `/healthz` automáticamente
- El servicio se reiniciará si no responde

## 🔄 Actualizaciones

### Despliegue Automático
- Cada push a la rama `main` desplegará automáticamente
- Puedes deshabilitar esto en la configuración del servicio

### Despliegue Manual
1. Ve a tu servicio en Render
2. Haz clic en "Manual Deploy"
3. Selecciona la rama o commit específico

## 🛠️ Troubleshooting

### Build Fallido
```bash
# Revisa los logs de build en Render
# Problemas comunes:
# - Memoria insuficiente (upgrade a plan superior)
# - Dependencias faltantes (revisa package.json)
```

### Servicio No Inicia
```bash
# Revisa las variables de entorno
# Verifica que la base de datos esté conectada
# Checa los logs de startup
```

### Base de Datos
```bash
# La conexión se configura automáticamente
# Si hay problemas, verifica las variables DB_POSTGRESDB_*
```

## 💡 Optimizaciones

### Performance
- Considera upgrade a plan "Professional" para mejor performance
- Habilita Redis para mejor rendimiento (requiere configuración adicional)

### Seguridad
- Cambia `N8N_ENCRYPTION_KEY` regularmente
- Usa contraseñas fuertes para usuarios
- Considera habilitar autenticación de dos factores

### Backup
- Render hace backup automático de la base de datos
- Considera exportar workflows importantes regularmente

## 📞 Soporte

- [Documentación de n8n](https://docs.n8n.io)
- [Documentación de Render](https://render.com/docs)
- [Comunidad n8n](https://community.n8n.io)

---

¡Tu instancia de n8n está lista para automatizar workflows! 🎉