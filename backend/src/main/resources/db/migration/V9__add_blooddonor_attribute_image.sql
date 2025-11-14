ALTER TABLE blood_donor
  ADD COLUMN image_id INT NULL,
  ADD CONSTRAINT fk_blood_donor_image
    FOREIGN KEY (image_id) REFERENCES image(id)
      ON DELETE SET NULL;
