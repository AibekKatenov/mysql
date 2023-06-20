CREATE TABLE IF NOT EXISTS users(
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255),
    full_name VARCHAR(255),
    password VARCHAR(255),
    isAdmin BOOLEAN
);
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Qqwerty1!';

CREATE TABLE films (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title_rus VARCHAR(255),
  title_eng VARCHAR(255),
  year VARCHAR(255),
  time VARCHAR(255),
  video VARCHAR(255),
  country_id VARCHAR(255),
  genre_id VARCHAR(255),
  image VARCHAR(255),
  author_id INT,
  FOREIGN KEY (author_id) REFERENCES users(id)
);