# 🎨 Portafolio Frontend

Portafolio profesional desarrollado con **Vite + React + TypeScript**. Diseñado para ser desplegado en **Vercel**.

## 🚀 Características

- ✨ Diseño moderno y responsivo
- 🎯 Sección Hero con presentación personal
- 💼 Dashboard de proyectos con filtros por estado (All, Completed, In Progress, Planned)
- 🛠️ Showcase de habilidades y tecnologías
- 🎨 Esquema de colores azul profesional
- ⚡ Super rápido con Vite
- 📱 100% Mobile-friendly
- 🔄 Filtrado dinámico de proyectos

## 🛠️ Tecnologías

- **React 19** - Librería UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool ultra rápido
- **CSS3** - Estilos personalizados

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Correr en desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

## 🌐 Deploy en Vercel

### Opción 1: Desde GitHub (Recomendado)

1. Sube tu código a un repositorio de GitHub
2. Ve a [vercel.com](https://vercel.com)
3. Haz clic en "New Project"
4. Importa tu repositorio
5. Vercel detectará automáticamente que es un proyecto Vite
6. Haz clic en "Deploy"

### Opción 2: Desde CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Configuración de Vercel

Vercel detectará automáticamente la configuración, pero si necesitas personalizarla:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

## 🎨 Personalización

### Cambiar tu información personal

Edita el archivo `src/components/Hero.tsx`:

```tsx
<h1 className="hero-name">Tu Nombre</h1>
<h2 className="hero-title">Tu Título</h2>
<p className="hero-description">Tu descripción...</p>
```

### Actualizar tus Skills

Edita el array `skillCategories` en `src/components/Skills.tsx`

### Agregar/Editar Proyectos

Edita el array `projects` en `src/components/Projects.tsx`

## 🔌 Conectar con Backend/API Gateway

Para conectar con tu backend, crea un archivo de configuración:

```typescript
// src/config/api.ts
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
```

Luego en tus componentes:

```typescript
import { API_URL } from './config/api';

const fetchProjects = async () => {
  const response = await fetch(`${API_URL}/projects`);
  const data = await response.json();
  return data;
};
```

### Variables de entorno en Vercel

1. Ve a tu proyecto en Vercel
2. Settings → Environment Variables
3. Agrega: `VITE_API_URL` con la URL de tu API Gateway

## 📁 Estructura del Proyecto

```
Frontend/
├── src/
│   ├── components/
│   │   ├── Hero.tsx          # Sección de bienvenida
│   │   ├── Hero.css
│   │   ├── Skills.tsx        # Habilidades
│   │   ├── Skills.css
│   │   ├── Projects.tsx      # Dashboard de proyectos
│   │   └── Projects.css
│   ├── App.tsx               # Componente principal
│   ├── App.css
│   ├── main.tsx              # Entry point
│   └── index.css             # Estilos globales
├── public/                   # Assets estáticos
├── index.html
├── package.json
└── vite.config.ts
```

## 🎯 Próximos Pasos

- [ ] Conectar con tu API Gateway
- [ ] Agregar React Router para navegación
- [ ] Implementar formulario de contacto
- [ ] Agregar animaciones con Framer Motion
- [ ] Modo oscuro/claro
- [ ] Blog section

## 📝 Notas

- El proyecto usa TypeScript para mejor experiencia de desarrollo
- Los estilos son CSS puro sin frameworks para máximo control
- Diseñado mobile-first con media queries responsive

## 🆘 Troubleshooting

**Problema:** Error al instalar dependencias
```bash
# Limpiar cache e instalar de nuevo
rm -rf node_modules package-lock.json
npm install
```

**Problema:** Puerto 5173 ya en uso
```bash
# El proyecto correrá en otro puerto automáticamente
# O especifica uno manualmente
npm run dev -- --port 3000
```

---

¡Listo para personalizar y desplegar! 🚀

