CREATE TABLE BloodDonor
(
  id          INT AUTO_INCREMENT PRIMARY KEY,
  dni         VARCHAR(20) UNIQUE NOT NULL,
#   bloodTypeId INT NOT NULL,
  firstName   VARCHAR(50),
  lastName    VARCHAR(50),
  gender      VARCHAR(10),
  email       VARCHAR(100) UNIQUE,
  phoneNumber VARCHAR(15),
  dateOfBirth DATE,
  password    VARCHAR(100)
#   FOREIGN KEY (bloodTypeId) REFERENCES BloodType (id) ON UPDATE CASCADE ON DELETE RESTRICT
);