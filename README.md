# Zaldicash

Proyecto de gestión de finanzas personales | React, Express &amp; SQL | Proyecto de Zaldicode

Actualmente en desarrollo.

Aplicación de seguimiento de finanzas personales en una sola app.
Es común en las inversiones tener activos en distintas plataformas. Con Zaldicash, se unificarán todas en una misma aplicación y se podrá seguir de manera REAL la evolución de nuestras inversiones.

---

## 📓 Diario de Desarrollador (DevLog) Redactado automáticamente.

### 📅 2026-04-07 | Ciclo Bancario Completo e Inversiones 🔄💰

- ✅ **Transferencias entre Cuentas:** Implementada la lógica de `type: "transfer"` para mover dinero entre cuentas del mismo usuario sin alterar el Patrimonio Neto.
- ✅ **Cierre de Inversiones (Ventas):** Creado el sistema de liquidación de activos donde el capital (más beneficios/pérdidas) vuelve automáticamente al balance de la cuenta origen.
- ✅ **Estados de Inversión:** Las inversiones ahora transicionan de `active` a `closed`, permitiendo un historial de operaciones pasadas y optimizando el refresco de precios.
- ✅ **Filtros Inteligentes:** Añadida capacidad de filtrado por `status` en la consulta de inversiones (`?status=active|closed`) para separar la cartera actual del historial.
- ✅ **Atomicidad SQL:** Reforzada la seguridad de los datos mediante transacciones de Sequelize para garantizar que no se pierda dinero en operaciones complejas.
- 🚀 **Estado del Proyecto:** Backend de Grado Producción; motor financiero blindado y listo para la integración con el Frontend.

### 📅 2024-05-22 | Control Total de Flujo de Caja 🏦

- ✅ **Movimientos Manuales:** Creado el sistema de transacciones para ingresos y gastos fuera de inversiones.
- ✅ **Integración de Saldos:** El saldo de las cuentas se sincroniza automáticamente al registrar una transacción gracias a `increment`/`decrement` de Sequelize.
- ✅ **Arquitectura de Base de Datos:** Confirmado que `investmentId` queda como `null` en transacciones manuales, manteniendo la integridad de los datos.
- 🚀 **Estado del Proyecto:** Backend 100% funcional para la gestión básica de finanzas e inversiones.

### 📅 2024-05-22 | Refactorización de Precisión 🎯

- ✅ **Implementación de Quantity:** Añadida columna `quantity` a la base de datos y modelos.
- ✅ **Cálculo de Mercado:** El sistema ahora multiplica `cantidad * precio_mercado` en lugar de sobreescribir el total.
- ✅ **Migraciones Críticas:** Añadida columna `currency` a las cuentas para mayor realismo.
- 🚀 **Resultado:** Una inversión de 0.015 BTC (1000€ iniciales) ahora refleja un valor real de 1021.74€.

### 📅 2024-05-22 | "El Gran Salto al Mercado Real" 🚀

Hoy el proyecto ha dejado de ser una base de datos estática para conectarse al mundo real.

**Hitos logrados:**

- ✅ **Conexión con Yahoo Finance:** Implementado `priceServices.js` para obtener precios en tiempo real de Stocks y Cripto.
- ✅ **Sincronización Masiva:** Creado el endpoint `GET /api/investments/refresh` que actualiza todos los `current_amount` de las inversiones activas del usuario de una sola vez.
- ✅ **Dashboard Dinámico:** El resumen de patrimonio ahora refleja las fluctuaciones del mercado.

**Batallas ganadas (Bugs):**

- 🐛 _El Error de la Instancia:_ Superado el problema de `YahooFinance is not a constructor` derivado de las versiones v2 vs v3 de la librería `yahoo-finance2`. Solucionado con un import robusto y detección de clase.

**Pendiente para la próxima sesión:**

- [ ] Implementar el cálculo de Profit/Loss (Ganancias vs Inversión inicial).
- [ ] Estudiar el guardado de historial de precios para gráficas.
- [ ] Empezar a pulir el Frontend en React para mostrar estos datos de lujo.

---

_Estado actual: Backend funcional y conectado a mercados financieros._
