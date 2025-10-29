package com.xiojuandawt.blood4life.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/test")
public class TestController {

  @GetMapping
  public Map<String, Object> test() {
    Map<String, Object> response = new HashMap<>();

    response.put("Hola", "Caracola");

    return response;
  }

}
