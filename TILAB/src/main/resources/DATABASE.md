# CONFIGURACIÓN DE BASES DE DATOS TILAB

## H2 (Por defecto para desarrollo)
- Base de datos en memoria
- Consola H2 disponible en: http://localhost:8080/h2-console
- JDBC URL: jdbc:h2:mem:tilab
- Usuario: sa
- Contraseña: (vacía)

## PostgreSQL (Producción/Opcional)
Para usar PostgreSQL en lugar de H2, ejecutar:
mvn spring-boot:run -Dspring-boot.run.profiles=postgres

Requiere:
- PostgreSQL corriendo en localhost:5432
- Base de datos: tilab_db
- Usuario: postgres
- Contraseña: postgres