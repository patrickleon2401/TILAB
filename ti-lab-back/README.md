# TI-LAB Backend

Backend profesional para gestión de componentes y préstamos de laboratorio con FastAPI y SQLAlchemy.

## 🚀 Características

- Arquitectura por capas limpia y escalable
- FastAPI con documentación automática
- SQLAlchemy ORM con SQLite
- Pydantic para validación de datos
- Separación clara de responsabilidades

## 📁 Estructura

```
ti-lab-back/
├── app/
│   ├── main.py              # Punto de entrada
│   ├── core/
│   │   ├── config.py        # Configuración
│   │   └── database.py      # Base de datos
│   ├── api/v1/
│   │   └── routers/         # Endpoints API
│   ├── services/            # Lógica de negocio
│   ├── repositories/        # Acceso a datos
│   ├── models/              # Modelos ORM
│   └── schemas/             # DTOs Pydantic
├── requirements.txt
└── README.md
```

## ⚙️ Instalación

1. Activar entorno virtual:
```bash
source venv/bin/activate
```

2. Instalar dependencias:
```bash
pip install -r requirements.txt
```

3. Ejecutar aplicación:
```bash
uvicorn app.main:app --reload
```

## 📖 Endpoints

### Health Check
- `GET /health` - Estado del servicio

### Componentes
- `GET /api/v1/components/` - Listar componentes
- `GET /api/v1/components/{id}` - Obtener componente
- `POST /api/v1/components/` - Crear componente
- `PUT /api/v1/components/{id}` - Actualizar componente
- `DELETE /api/v1/components/{id}` - Eliminar componente

### Kits
- `GET /api/v1/kits/` - Listar kits
- `GET /api/v1/kits/{id}` - Obtener kit
- `POST /api/v1/kits/` - Crear kit
- `PUT /api/v1/kits/{id}` - Actualizar kit
- `DELETE /api/v1/kits/{id}` - Eliminar kit

### Préstamos
- `GET /api/v1/loans/` - Listar préstamos
- `GET /api/v1/loans/active` - Préstamos activos
- `GET /api/v1/loans/{id}` - Obtener préstamo
- `POST /api/v1/loans/` - Crear préstamo
- `PUT /api/v1/loans/{id}` - Actualizar préstamo
- `PUT /api/v1/loans/{id}/return` - Devolver préstamo

## 🎯 Arquitectura

- **Models**: Entidades de base de datos (SQLAlchemy)
- **Schemas**: DTOs para validación (Pydantic)
- **Repositories**: Capa de acceso a datos
- **Services**: Lógica de negocio
- **Routers**: Controladores de API

## 🐳 Variables de Entorno

```bash
DATABASE_URL=sqlite:///./ti_lab.db
DEBUG=False
```

## 📄 Documentación

Inicia la aplicación y visita:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`