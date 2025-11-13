package com.xiojuandawt.blood4life.config;

import com.xiojuandawt.blood4life.entities.BloodDonor;
import com.xiojuandawt.blood4life.services.BloodDonorService;
import com.xiojuandawt.blood4life.services.JwtService;
import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

  @Autowired
  private JwtService jwtService;
  @Autowired
  private BloodDonorService bloodDonorService;

  // This method will be executed before reaching the controller to
  // tell Spring Boot if the user is logged in
  @Override
  protected void doFilterInternal(
    HttpServletRequest request,
    HttpServletResponse response,
    FilterChain chain) throws ServletException, IOException {

    // We obtain the Authorization header
    final String authHeader = request.getHeader("Authorization");

    // We checked the format
    if (authHeader == null || !authHeader.startsWith("Bearer ")) {
      chain.doFilter(request, response);
      return;
    }

    // Sacamos de la cabecera el token a partir de la letra 7 para quitar el prefijo 'Bearer'
    final String token = authHeader.substring(7);

    // Con nuestro servicio obtenemos los datos guardados en el token
    Claims userTokenPayload = jwtService.extractPayload(token);
    final Integer userId = userTokenPayload.get("id", Integer.class);
    final String userType = userTokenPayload.get("type", String.class);

    // Comprobamos si los datos son correctos
    if (userId != null && SecurityContextHolder.getContext().getAuthentication() == null) {

      switch (userType) {
        case "bloodDonor":
          this.authenticatedByBloodDonor(userId, token);
          break;
      }

    }

    chain.doFilter(request, response);
  }

  private void authenticatedByBloodDonor(Integer id, String token) {
    // Buscamos si existe ese usuario en la base de datos
    // HAY MUCHAS ALTERNATIVAS TIENEN DESVENTAJAS Y VENTAJAS
    Optional<BloodDonor> bloodDonorOptional = bloodDonorService.findByIdWithRole(id);
    List<GrantedAuthority> roles = new ArrayList<>();
    roles.add(new SimpleGrantedAuthority("ROLE_BLOODDONOR"));

    // Comprobamos si el token esta expirado
    if (!this.jwtService.isTokenExpired(token) && bloodDonorOptional.isPresent()) {
      BloodDonor bloodDonor = bloodDonorOptional.orElseThrow();

      // Creamos la autenticación a partir de una clase de Spring Boot
      UsernamePasswordAuthenticationToken autheticationObject = new UsernamePasswordAuthenticationToken(
        bloodDonor, null, roles
      );

      // Añadimos al contexto de la petición que el usuario esta logueado
      // IMPORTANTE: ESTE PASO ES EL QUE LE DICE A SPRING BOOT QUE EL USUARIO ESTA LOGUEADO
      // Este contexto se puede obtener desde el controlador.
      SecurityContextHolder.getContext().setAuthentication(autheticationObject);
    }
  }

}
