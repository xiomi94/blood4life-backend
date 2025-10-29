-- V1__crear_tablas.sql
CREATE TABLE BloodType
(
    id   INT AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(10) NOT NULL
);

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

CREATE TABLE BloodDonor
(
    id          INT AUTO_INCREMENT PRIMARY KEY,
    dni         VARCHAR(20) UNIQUE NOT NULL,
    bloodTypeId INT                NOT NULL,
    firstName   VARCHAR(50),
    lastName    VARCHAR(50),
    gender      VARCHAR(10),
    email       VARCHAR(100) UNIQUE,
    phoneNumber VARCHAR(15),
    dateOfBirth DATE,
    password    VARCHAR(100),
    FOREIGN KEY (bloodTypeId) REFERENCES BloodType (id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

CREATE TABLE AppointmentStatus
(
    id         INT AUTO_INCREMENT PRIMARY KEY,
    statusName VARCHAR(50) NOT NULL
);

CREATE TABLE Campaign
(
    id                    INT AUTO_INCREMENT PRIMARY KEY,
    hospitalId            INT         NOT NULL,
    name                  VARCHAR(100),
    description           VARCHAR(255),
    startDate             DATE,
    endDate               DATE,
    location              VARCHAR(100),
    requiredDonorQuantity INT         NOT NULL,
    requiredBloodType     VARCHAR(10) NOT NULL,
    FOREIGN KEY (hospitalId) REFERENCES Hospital (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

CREATE TABLE Appointment
(
    id                  INT AUTO_INCREMENT PRIMARY KEY,
    appointmentStatusId INT NOT NULL,
    campaignId          INT NOT NULL,
    bloodDonorId        INT NOT NULL,
    hospitalComment     VARCHAR(255),
    dateAppointment     DATE,
    FOREIGN KEY (appointmentStatusId) REFERENCES AppointmentStatus (id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
    FOREIGN KEY (campaignId) REFERENCES Campaign (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    FOREIGN KEY (bloodDonorId) REFERENCES BloodDonor (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

CREATE TABLE Notification
(
    id               INT AUTO_INCREMENT PRIMARY KEY,
    receivedId       INT NOT NULL,
    message          VARCHAR(255),
    dateNotification DATE,
    FOREIGN KEY (receivedId) REFERENCES BloodDonor (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

CREATE TABLE BloodTypeCampaign
(
    bloodType INT NOT NULL,
    campaign  INT NOT NULL,
    PRIMARY KEY (bloodType, campaign),
    FOREIGN KEY (bloodType) REFERENCES BloodType (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    FOREIGN KEY (campaign) REFERENCES Campaign (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);
