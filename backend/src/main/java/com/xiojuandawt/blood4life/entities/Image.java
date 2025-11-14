package com.xiojuandawt.blood4life.entities;

import jakarta.persistence.*;

@Entity
public class Image {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  private String name;
  private String route;      // Route relativa del archivo
  private String url;      // URL para acceder

  // Constructor vacío (obligatorio para JPA)
  public Image() {}

  // Constructor con parámetros
  public Image(String name, String route, String url) {
    this.name = name;
    this.route = route;
    this.url = url;
  }

  // Getters y Setters
  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getRoute() {
    return route;
  }

  public void setRoute(String route) {
    this.route = route;
  }

  public String getUrl() {
    return url;
  }

  public void setUrl(String url) {
    this.url = url;
  }
}