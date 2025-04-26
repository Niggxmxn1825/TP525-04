# Refactorización en 3 capas

## Descripción de cada capa:

- `app.js`: Es la **capa de presentación**, maneja las rutas y las respuestas al usuario.
- `logica.js`: Es la **capa de lógica de negocio**, valida y procesa los datos.
- `datos.js`: Es la **capa de acceso a datos**, guarda los productos en una lista en memoria.

## Ventajas respecto a la versión monolítica:

- Mejor **organización del código**.
- Más **fácil de mantener y escalar**.
- Permite **testear por separado** cada parte.
- Se puede cambiar la lógica o el almacenamiento sin modificar la presentación.
Caracteristicas que hacen que esta sea una API REST:
1. **Interfaz uniforme**
   - Métodos HTTP semánticos: `GET` (consultar), `POST` (crear)
   - URLs descriptivas: `/api/productos`
   - Formatos estándar (JSON/XML)

2. **Stateless**
   - Cada request contiene toda la información necesaria
   - Sin sesiones guardadas en servidor

3. **Recursos identificables**
   - Todo es un recurso con URI única
   - Ej: `/api/productos/1`

4. **Representaciones múltiples**
   - JSON como formato principal
   - Posibilidad de extenderse a XML, YAML, etc.

5. **HATEOAS (Opcional)**
   - Hipermedia como motor de estado de aplicación
   - Ej: Respuestas con enlaces a recursos relacionados

   # Diferencias entre API REST y Arquitectura de 3 Capas Anterior

## 🔄 Comparativa Estructural

| **Componente**         | **Arquitectura Anterior**             | **API REST Refactorizada**            |
|------------------------|---------------------------------------|---------------------------------------|
| **Capa de Presentación** | Lógica en `app.js` con HTTP nativo    | Controladores en `/controllers`       |
| **Capa de Negocio**     | `logica.js` (validaciones básicas)    | Servicios en `/services`              |
| **Capa de Datos**       | `datos.js` (array en memoria)         | Repositorios en `/repositories`       |

## 🌐 Diferencias en Comunicación

```mermaid
diffDiagram
    Anterior:
      Frontend -> Backend: GET /agregar?nombre=Pan
      Backend -> Frontend: "Producto agregado" (texto)
    
    REST:
      Frontend -> Backend: POST /api/productos {json}
      Backend -> Frontend: 201 Created + {id:1, nombre:"Pan"}


# Diferencias entre REST y Microservicios

## 🔍 Comparación Conceptual

| **Aspecto**          | **API REST Monolítica**               | **Arquitectura de Microservicios**     |
|----------------------|--------------------------------------|----------------------------------------|
| **Estructura**       | Un solo código base                  | Servicios independientes               |
| **Base de Datos**    | BD compartida                        | BD por servicio (o schema separado)    |
| **Despliegue**       | Todo o nada                          | Por servicio individual                |
| **Escalabilidad**    | Vertical                             | Horizontal (por servicio)              |
| **Tecnología**       | Stack único                          | Polyglot (diferentes lenguajes/BDs)    |

## 🧩 Desafíos al Migrar a Microservicios

1. **Gestión de transacciones distribuidas**
   - Ejemplo: Confirmar pedido (stock + facturación + envío)
   ```mermaid
   graph TD
     A[Pedido] --> B[Stock]
     A --> C[Facturación]
     A --> D[Envío]
     B -->|Error| E[Rollback?]

# Análisis: Migración de REST Monolítico a Microservicios

## 🧗 Desafíos en la División a Microservicios

### 1. **Descomposición del Monolito**
   - **Ejemplo Práctico**:
     ```mermaid
     graph LR
       A[Servicio Actual] --> B[Catálogo]
       A --> C[Inventario]
       A --> D[Usuarios]
       B -->|Dependencia| C
     ```
   - **Problema**: Identificar límites de negocio claros entre servicios

### 2. **Gestión de Transacciones**
   - **Caso**: Creación de producto con stock inicial
     ```javascript
     // En monolitico
     db.transaction(() => {
       productoRepo.save();
       inventarioRepo.actualizar();
     });

     // En microservicios:
     await axios.post('/catalogo', producto);
     await axios.post('/inventario', stock); // ¿Y si falla?
     ```
   - **Solución**: Implementar Saga Pattern

### 3. **Consistencia de Datos**
   - **Escenario**: Precio en Promociones vs Catálogo
     ```diff
     - Monolítico: UPDATE productos SET precio=...
     + Microservicios: 
       CatalogService.updatePrice()
       MarketingService.updateCampaigns()
     ```

### 4. **Operacionalización**
   - **Nuevos Requerimientos**:
     - Service Discovery (Consul/Eureka)
     - API Gateway (Kong, Apigee)
     - Logs Centralizados (ELK)

## 🏆 Ventajas Teóricas de Microservicios

### 1. **Escalabilidad Selectiva**
   | Servicio       | Réplicas | Justificación               |
   |----------------|----------|-----------------------------|
   | Catálogo       | 10       | Alto tráfico de lecturas     |
   | Procesar Pagos | 3        | Requiere estabilidad         |

### 2. **Independencia Tecnológica**
   ```mermaid
   pie
     title Stack por Servicio
     "Node.js" : 45
     "Python" : 30
     "Go" : 25