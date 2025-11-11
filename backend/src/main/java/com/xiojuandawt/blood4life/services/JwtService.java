package com.xiojuandawt.blood4life.services;

import io.jsonwebtoken.Claims;

public interface JwtService {

  String generateToken(Integer EntityId, String entityType);
  Claims extractPayload(String token);
}
