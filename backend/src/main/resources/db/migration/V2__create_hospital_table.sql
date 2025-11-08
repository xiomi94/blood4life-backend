CREATE TABLE Hospital
(
    id          INT AUTO_INCREMENT PRIMARY KEY,
    cif         VARCHAR(20) UNIQUE NOT NULL,
    name        VARCHAR(100),
    address     VARCHAR(150),
    email       VARCHAR(100) UNIQUE,
    phoneNumber VARCHAR(15),
    password    VARCHAR(100)
);