ALTER TABLE hospital
  ADD COLUMN image_id INT NULL,
  ADD CONSTRAINT fk_hospital_image
    FOREIGN KEY (image_id) REFERENCES image (id)
      ON DELETE SET NULL;