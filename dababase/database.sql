CREATE DATABASE  links;
USE links;
CREATE table users(
    id INT(11) NOT NULL AUTO_INCREMENT,
    username VARCHAR (16) NOT NULL,
    password VARCHAR(60) NOT NULL,
    fullname VARCHAR(100) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `links` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(150) NOT NULL,
  `url` varchar(255) NOT NULL,
  `description` varchar(150) NOT NULL,
  `user_id` int(11),
  `created_at` timestamp not NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_users FOREIGN KEY (user_id) REFERENCES users(id),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8