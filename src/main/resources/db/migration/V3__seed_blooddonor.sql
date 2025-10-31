-- Seeder de donantes de sangre sin el atributo bloodTypeId
INSERT INTO BloodDonor (
  dni,
  firstName,
  lastName,
  gender,
  email,
  phoneNumber,
  dateOfBirth,
  password
)
VALUES
  ('12345678A', 'Carlos', 'Ramírez', 'Masculino', 'carlos.ramirez@example.com', '612345678', '1990-05-10', '$2a$10$exampleHash1'),
  ('87654321B', 'Lucía', 'Fernández', 'Femenino', 'lucia.fernandez@example.com', '678901234', '1995-09-23', '$2a$10$exampleHash2'),
  ('11223344C', 'Diego', 'Pérez', 'Masculino', 'diego.perez@example.com', '698765432', '1988-01-15', '$2a$10$exampleHash3'),
  ('55667788D', 'Marta', 'López', 'Femenino', 'marta.lopez@example.com', '689123456', '1992-12-01', '$2a$10$exampleHash4');
