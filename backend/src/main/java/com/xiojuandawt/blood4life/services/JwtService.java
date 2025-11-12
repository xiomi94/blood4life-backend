package com.xiojuandawt.blood4life.services;

import io.jsonwebtoken.Claims;

public interface JwtService {

  String generateToken(Integer entityId, String entityType);
  Claims extractPayload(String token);
}
