INSERT INTO applications
  (name, email, phone, job, text)
VALUES
  ('Jón Jónsson', 'jon@example.org', 1231231, 'forritari', 'Lorem ipsum dolor sit amet, 
  consectetur adipiscing elit. Ut bibendum eleifend odio, eu laoreet sapien sollicitudin quis.');

INSERT INTO applications
  (name, email, phone, job, processed, text)
VALUES
  ('Guðmundur Guðmundsson', 'gummi@example.org', 	1233211, 'forritari', true, 'Nam a sapien tellus. 
  Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. 
  Phasellus tincidunt ante nisl, eu placerat arcu porttitor mollis. Duis porttitor dolor vitae aliquet sollicitudin. 
  Etiam scelerisque, lorem eu varius eleifend, elit diam facilisis leo, sit amet volutpat est enim eu tortor. 
  Mauris non tortor eget nibh fermentum maximus vel sit amet ante. Vestibulum condimentum facilisis nisl eget interdum. 
  Donec vel cursus purus.');

INSERT INTO applications
  (name, email, phone, job, text)
VALUES
  ('Anna Önnudóttir', 'anna@example.org', 3333333, 'forritari', 'Sed in sem sagittis, fringilla justo 
  eget, vulputate nunc. Cras pharetra faucibus blandit. Sed non porta ligula, non efficitur dolor.');

INSERT INTO applications
  (name, email, phone, job, text)
VALUES
  ('Guðmunda Guðmundsdóttir', 'gudmunda@example.org', 1111111, 'hönnuður', 'Aenean a nibh a enim cursus bibendum. 
  Donec dictum velit in odio feugiat imperdiet. Sed blandit, justo vitae lacinia efficitur, tortor ante ultrices orci, 
  nec placerat dui purus ac augue. Nullam aliquet purus sit amet erat laoreet, nec consequat augue suscipit. 
  Curabitur rutrum pretium erat sed pellentesque. Proin ligula massa, varius id tristique in, varius id elit. 
  Sed congue volutpat fringilla..');

INSERT INTO applications
  (name, email, phone, job, text)
VALUES
  ('John Johnson', 'john@example.org', 1000000, 'verkefnastjóri', 'Etiam accumsan neque nec mauris fringilla, 
  id dignissim tortor maximus. Proin sit amet sodales felis. Vivamus ut est magna. Quisque porta quam ac orci 
  dignissim convallis. Nunc efficitur sagittis felis at gravida. Praesent quis quam molestie, rutrum mi sed, 
  malesuada nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse felis tortor, 
  imperdiet in metus eget, bibendum aliquet nisl..');

INSERT INTO users
  (name, email, username, password, admin)
VALUES
  ('Admin', 'admin@example.org', 'admin', '$2b$11$nxGVeFRF2sIpRYiKek/FbunTVgSPP69Yq9yZclR4RoAfp43uli1/i', true);

INSERT INTO users
  (name, email, username, password)
VALUES
  ('Nafnlaus', 'nn@example.org', 'nn', '$2b$11$Nn8JGmJni7jqGETLdlATiOiIUH7HmYHJQW//hay5RYnVPfwp65jCG');
