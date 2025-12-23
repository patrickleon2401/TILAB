from fastapi import APIRouter, HTTPException, status
from typing import List
from app.schemas.kit import Kit, KitCreate, KitUpdate

router = APIRouter()

# Datos de prueba
kits_data = [
    {
        "id": 1,
        "nombre": "Kit de Electrónica Básico",
        "descripcion": "Kit con componentes básicos para proyectos electrónicos",
        "componentes": [
            {
                "id": 1,
                "componente_id": 1,
                "cantidad": 5,
                "componente": {
                    "id": 1,
                    "nombre": "Resistencia 1kΩ",
                    "requiere_numero_serie": False
                }
            },
            {
                "id": 2,
                "componente_id": 2,
                "cantidad": 3,
                "componente": {
                    "id": 2,
                    "nombre": "LED Rojo 5mm",
                    "requiere_numero_serie": False
                }
            }
        ]
    },
    {
        "id": 2,
        "nombre": "Kit de Redes",
        "descripcion": "Kit para prácticas de redes",
        "componentes": [
            {
                "id": 3,
                "componente_id": 3,
                "cantidad": 2,
                "componente": {
                    "id": 3,
                    "nombre": "Cable Ethernet",
                    "requiere_numero_serie": False
                }
            },
            {
                "id": 4,
                "componente_id": 4,
                "cantidad": 1,
                "componente": {
                    "id": 4,
                    "nombre": "Switch 8 Puertos",
                    "requiere_numero_serie": True
                }
            }
        ]
    },
    {
        "id": 3,
        "nombre": "Kit de Programación",
        "descripcion": "Kit para actividades de programación",
        "componentes": [
            {
                "id": 5,
                "componente_id": 5,
                "cantidad": 1,
                "componente": {
                    "id": 5,
                    "nombre": "Raspberry Pi 4",
                    "requiere_numero_serie": True
                }
            },
            {
                "id": 6,
                "componente_id": 6,
                "cantidad": 1,
                "componente": {
                    "id": 6,
                    "nombre": "Teclado USB",
                    "requiere_numero_serie": False
                }
            }
        ]
    }
]


@router.get("/", response_model=List[Kit])
def get_kits():
    print("Obteniendo todos los kits...")
    return kits_data


@router.get("/{kit_id}", response_model=Kit)
def get_kit(kit_id: int):
    print(f"Buscando kit con ID: {kit_id}")
    
    for kit in kits_data:
        if kit["id"] == kit_id:
            print(f"Kit encontrado: {kit['nombre']}")
            return kit
    
    print(f"Kit con ID {kit_id} no encontrado")
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Kit con ID {kit_id} no encontrado"
    )


@router.post("/", response_model=Kit, status_code=status.HTTP_201_CREATED)
def create_kit(kit_data: KitCreate):
    print(f"Creando nuevo kit: {kit_data.nombre}")
    
    new_id = max(kit["id"] for kit in kits_data) + 1
    new_kit = {
        "id": new_id,
        "nombre": kit_data.nombre,
        "descripcion": kit_data.descripcion,
        "componentes": []
    }
    
    kits_data.append(new_kit)
    print(f"Kit creado con ID: {new_id}")
    return new_kit


@router.put("/{kit_id}", response_model=Kit)
def update_kit(kit_id: int, kit_data: KitUpdate):
    print(f"Actualizando kit con ID: {kit_id}")
    
    for kit in kits_data:
        if kit["id"] == kit_id:
            if kit_data.nombre is not None:
                kit["nombre"] = kit_data.nombre
            if kit_data.descripcion is not None:
                kit["descripcion"] = kit_data.descripcion
            
            print(f"Kit actualizado: {kit['nombre']}")
            return kit
    
    print(f"Kit con ID {kit_id} no encontrado para actualizar")
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Kit con ID {kit_id} no encontrado"
    )


@router.delete("/{kit_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_kit(kit_id: int):
    print(f"Eliminando kit con ID: {kit_id}")
    
    for i, kit in enumerate(kits_data):
        if kit["id"] == kit_id:
            del kits_data[i]
            print(f"Kit con ID {kit_id} eliminado exitosamente")
            return
    
    print(f"Kit con ID {kit_id} no encontrado para eliminar")
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Kit con ID {kit_id} no encontrado"
    )