package com.TILab.TILAB.model;

import jakarta.persistence.*;

@Entity
@Table(name = "componentes")
public class Componente {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String nombre;
    
    @Column(nullable = false)
    private boolean requiereNumeroSerie;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public boolean isRequiereNumeroSerie() {
        return requiereNumeroSerie;
    }

    public void setRequiereNumeroSerie(boolean requiereNumeroSerie) {
        this.requiereNumeroSerie = requiereNumeroSerie;
    }
}