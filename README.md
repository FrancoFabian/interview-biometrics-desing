# Prueba Práctica — Desarrollo Frontend

Este documento describe la implementación técnica del módulo de evaluación biométrica desarrollado como parte de la prueba práctica. El proyecto se construyó con **React** y **TypeScript**, siguiendo principios de mantenibilidad, modularidad y experiencia de usuario.

## Descripción General

El objetivo fue crear una **Single Page Application (SPA)** responsiva que simula un entorno de gestión biométrica y documental. La aplicación permite visualizar información del cliente, gestionar formularios dinámicos, cargar evidencias fotográficas y ejecutar validaciones mediante listas de verificación.

## Stack Tecnológico

- **React 19** y **TypeScript 5**
- **Vite**
- **CSS Modules** con variables CSS como design tokens
- **React Hooks:** `useState`, `useReducer`, `useContext`
- **Estado global opcional:** Zustand
- **Iconografía:** Lucide React
- **Calidad:** ESLint y Prettier

---

# Arquitectura y Módulos

La aplicación se organiza en tres módulos principales, de acuerdo con los requerimientos entregados.

## 1. Navbar
Componente persistente ubicado en la parte superior del sistema.  
Responsable de mostrar:
- Identidad visual (logo)
- Información del usuario (Incluye menú desplegable en el avatar para alternar **Modo Oscuro/Claro**)
- Notificaciones y estado de sesión  

Incluye diseño responsive con despliegue en menú móvil.

## 2. Sidebar
Barra lateral colapsable utilizada como navegación principal.  
- Diseño minimalista  
- Integración directa con el layout global  

## 3. Contenido Principal
Área central que contiene los componentes esenciales del flujo de verificación:

### 3.1 Encabezado del Cliente
Visualización estructurada de la información relevante del expediente: nombre, folio, fechas y otros datos informativos.

### 3.2 Navegación por Pestañas
Control para cambiar entre distintos contextos de evidencia: Identificación, Comprobante, Propiedad, Otros.  
Cada pestaña modifica dinámicamente el contenido de la "Tabla de Identificación".

### 3.3 Tabla de Identificación (Gestión de Imágenes)
- Grid de tres espacios para evidencias  
- Carga mediante drag-and-drop o selección manual  
- Validación estricta de tipo (`image/webp`)  
- Mocks dinámicos según pestaña seleccionada  

### 3.4 Cuestionarios de Verificación (Tri-State)
Componente personalizado con estados: Sí · No · No aplica  
Incluye:
- Limpieza independiente por grupo  
- Indicadores visuales claros  
- Compatibilidad con teclado  
- Estilos adaptados a modo claro/oscuro  

### 3.5 Links Externos
Botones con acceso rápido a validaciones externas (CURP, INE, etc.).

### 3.6 Formulario de Respuesta
Incluye:
- Selectores de decisión final (Aprobado / Rechazado)
- Motivos de rechazo
- Observaciones
- Validación previa al envío

---

# Mapeo de Requerimientos y Cumplimiento

| Requerimiento | Estado | Implementación |
|--------------|:------:|----------------|
| Módulos 1, 2 y 3 | ✔️ | Layout completo con Navbar, Sidebar y Contenido |
| Cambio dinámico de imágenes | ✔️ | Pestañas actualizan el grid mediante mocks |
| Botón “Finalizar” + Modal | ✔️ | Modal de resumen con validación previa |
| Generación de JSON | ✔️ | Consolidación de datos y archivos en un objeto final |
| Interfaz intuitiva | ✔️ | Layout limpio, navegación clara y retroalimentación visual |
| Buenas prácticas | ✔️ | Componentes modulares, TypeScript estricto, accesibilidad |
| Sin librerías UI pesadas | ✔️ | Implementación nativa con CSS Modules |

---

# Características Destacadas

## Sistema de Diseño y Modo Oscuro
Design tokens globales permiten alternar entre modo claro y oscuro sin afectar contraste ni legibilidad.  
Los componentes reaccionan automáticamente al tema.

## Accesibilidad (a11y)
- Roles ARIA correctos
- Gestión de foco en modales
- Navegación completa mediante teclado
- Uso de etiquetas semánticas HTML5

## Manejo de Archivos
- Validación de tipo MIME antes de procesar la imagen  
- Previsualización local con `URL.createObjectURL`  
- Preparación de `FormData` para un flujo realista de carga  

## Rendimiento
- Uso de `React.memo` y `useCallback`  
- Separación de responsabilidades  
- Carga diferida de imágenes según contexto  

---

# Instrucciones de Ejecución

Requiere Node.js 18 o superior.

1. Instalar dependencias:
   ```bash
   pnpm install
