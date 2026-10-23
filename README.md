# Pipeline de Entrega Continua y Estrategias de Optimización (Estrategias OP)

**Universidad de Las Américas (UDLA)**  
**Facultad de Ingeniería y Ciencias Aplicadas (FICA)**  
**Carrera:** Ingeniería de Software  
**Asignatura:** Procesos de Software (ISWZ3205 - NRC 5496 / 5497 / 5498)  
**Estudiante:** Carlos Alberto Angulo Pizarro (`carlos.angulo.pizarro@udla.edu.ec`)  
**Docente:** Ing. Mónica Sánchez Rosero, Msc.  
**Actividad:** Evaluación Sumativa: Configuración de un Pipeline de Entrega Continua / Estrategias OP (10% P1)

---

## 🚀 Descripción del Proyecto

Repositorio funcional con arquitectura de Entrega Continua (CD) basado en **Jenkins Declarativo**, diseñado para demostrar e implementar las 4 estrategias de optimización de alto rendimiento en pipelines:

1. **Ejecución Paralela (*Parallel Execution*):** Ejecución simultánea de Linting (ESLint), Compilación Estricta TypeScript y Pruebas Unitarias Jest.
2. **Almacenamiento en Caché (*Smart Caching*):** Reutilización de capas de dependencias `node_modules` y binarios de Cypress mediante volúmenes Docker y banderas `--prefer-offline`.
3. **Ejecución Selectiva (*Branching & Conditional Execution*):** Filtros condicionales (`when { branch 'develop' }`) para evitar análisis pesados en ramas temporales de características.
4. **Pipelines Modulares y Post-Acciones:** Post-condiciones automatizadas (`always`, `success`, `failure`) con despacho de notificaciones webhook enriquecidas a Telegram y recolección de reportes JUnit.

---

## 📂 Estructura del Repositorio

```
├── Jenkinsfile                  # Definición declarativa optimizada del pipeline
├── package.json                 # Gestión de dependencias y scripts CI
├── tsconfig.json                # Configuración de TypeScript
├── src/                         # Código fuente de API Express
│   ├── index.ts
│   └── math.ts
├── tests/                       # Pruebas unitarias Jest
│   └── math.test.ts
├── cypress/                     # Pruebas E2E automatizadas
│   └── e2e/api.cy.ts
└── README.md
```
