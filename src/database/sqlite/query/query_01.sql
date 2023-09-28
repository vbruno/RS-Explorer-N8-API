INSERT INTO users
  (name, email, password)
  VALUES
    ('pedro','pedro@teste.com.br','123');

SELECT * FROM users;

SELECT id, name, avatar FROM users;

UPDATE users SET
  avatar = 'bruno.png'
WHERE id = 1;

DELETE FROM users WHERE id = 1;
