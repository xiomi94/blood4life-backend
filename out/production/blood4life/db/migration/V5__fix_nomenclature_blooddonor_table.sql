ALTER TABLE BloodDonor
  RENAME TO blood_donor,
  CHANGE firstName first_name VARCHAR(50),
  CHANGE lastName last_name VARCHAR(50),
  CHANGE phoneNumber phone_number VARCHAR(15),
  CHANGE dateOfBirth date_of_birth DATE;
