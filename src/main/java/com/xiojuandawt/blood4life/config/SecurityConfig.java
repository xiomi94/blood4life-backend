package com.xiojuandawt.blood4life.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class SecurityConfig {

  @Bean
  public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();

    // 🔹 Dominios permitidos (Firebase)
    configuration.setAllowedOrigins(List.of(
      "https://blood4life-e3cc2.web.app/"
    ));

    // 🔹 Métodos HTTP permitidos
    configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));

    // 🔹 Cabeceras permitidas
    configuration.setAllowedHeaders(List.of("*"));

    // 🔹 Si usas cookies o Authorization headers (JWT)
    configuration.setAllowCredentials(true);

    // Aplica esta config a todas las rutas
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
  }
}
