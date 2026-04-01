# Zaldicash

Proyecto de gestión de finanzas personales | React, Express &amp; SQL | Proyecto de Zaldicode

Actualmente en desarrollo.

Aplicación de seguimiento de finanzas personales en una sola app.
Es común en las inversiones tener activos en distintas plataformas. Con Zaldicash, se unificarán todas en una misma aplicación y se podrá seguir de manera REAL la evolución de nuestras inversiones.

---

## 📓 Diario de Desarrollador (DevLog)

### 📅 2024-05-22 | "El Gran Salto al Mercado Real" 🚀

Hoy el proyecto ha dejado de ser una base de datos estática para conectarse al mundo real.

**Hitos logrados:**

- ✅ **Conexión con Yahoo Finance:** Implementado `priceServices.js` para obtener precios en tiempo real de Stocks y Cripto.
- ✅ **Sincronización Masiva:** Creado el endpoint `GET /api/investments/refresh` que actualiza todos los `current_amount` de las inversiones activas del usuario de una sola vez.
- ✅ **Dashboard Dinámico:** El resumen de patrimonio ahora refleja las fluctuaciones del mercado (¡Martín ya es rico!).

**Batallas ganadas (Bugs):**

- 🐛 _El Error de la Instancia:_ Superado el problema de `YahooFinance is not a constructor` derivado de las versiones v2 vs v3 de la librería `yahoo-finance2`. Solucionado con un import robusto y detección de clase.

**Pendiente para la próxima sesión:**

- [ ] Implementar el cálculo de Profit/Loss (Ganancias vs Inversión inicial).
- [ ] Estudiar el guardado de historial de precios para gráficas.
- [ ] Empezar a pulir el Frontend en React para mostrar estos datos de lujo.

---

_Estado actual: Backend funcional y conectado a mercados financieros._
