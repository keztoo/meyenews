CREATE TABLE category (
     id INT NOT NULL AUTO_INCREMENT,
     name CHAR(250) NOT NULL,
     image_name CHAR(250) NOT NULL,
     image_path CHAR(250) NOT NULL,
     active CHAR(1) NOT NULL,
     created_by INT NOT NULL,
     created_date DATETIME DEFAULT NULL,
     last_updated_by INT NOT NULL,
     last_updated_date DATETIME DEFAULT NULL,
     PRIMARY KEY (id)
) ENGINE=MyISAM;

INSERT INTO category (name, image_name, image_path, active, created_by, created_date, last_updated_by, last_updated_date) VALUES ('Contributors', 'noimg.jpg', 'images/', 'y', 1, NOW(), 1, NOW());
INSERT INTO category (name, image_name, image_path, active, created_by, created_date, last_updated_by, last_updated_date) VALUES ('Newspapers', 'noimg.jpg', 'images/', 'y', 1, NOW(), 1, NOW());

INSERT INTO category (name, image_name, image_path, active, created_by, created_date, last_updated_by, last_updated_date) VALUES ('Websites', 'noimg.jpg', 'images/', 'y', 1, NOW(), 1, NOW());
INSERT INTO category (name, image_name, image_path, active, created_by, created_date, last_updated_by, last_updated_date) VALUES ('Government', 'noimg.jpg', 'images/', 'y', 1, NOW(), 1, NOW());
INSERT INTO category (name, image_name, image_path, active, created_by, created_date, last_updated_by, last_updated_date) VALUES ('Lifestyle', 'noimg.jpg', 'images/', 'y', 1, NOW(), 1, NOW());
INSERT INTO category (name, image_name, image_path, active, created_by, created_date, last_updated_by, last_updated_date) VALUES ('Sports', 'noimg.jpg', 'images/', 'y', 1, NOW(), 1, NOW());
INSERT INTO category (name, image_name, image_path, active, created_by, created_date, last_updated_by, last_updated_date) VALUES ('Politics', 'noimg.jpg', 'images/', 'y', 1, NOW(), 1, NOW());
INSERT INTO category (name, image_name, image_path, active, created_by, created_date, last_updated_by, last_updated_date) VALUES ('Religion', 'noimg.jpg', 'images/', 'y', 1, NOW(), 1, NOW());
INSERT INTO category (name, image_name, image_path, active, created_by, created_date, last_updated_by, last_updated_date) VALUES ('Entertainment', 'noimg.jpg', 'images/', 'y', 1, NOW(), 1, NOW());
INSERT INTO category (name, image_name, image_path, active, created_by, created_date, last_updated_by, last_updated_date) VALUES ('Education', 'noimg.jpg', 'images/', 'y', 1, NOW(), 1, NOW());
INSERT INTO category (name, image_name, image_path, active, created_by, created_date, last_updated_by, last_updated_date) VALUES ('Environment', 'noimg.jpg', 'images/', 'y', 1, NOW(), 1, NOW());
INSERT INTO category (name, image_name, image_path, active, created_by, created_date, last_updated_by, last_updated_date) VALUES ('Technology', 'noimg.jpg', 'images/', 'y', 1, NOW(), 1, NOW());
INSERT INTO category (name, image_name, image_path, active, created_by, created_date, last_updated_by, last_updated_date) VALUES ('Shopping', 'noimg.jpg', 'images/', 'y', 1, NOW(), 1, NOW());
INSERT INTO category (name, image_name, image_path, active, created_by, created_date, last_updated_by, last_updated_date) VALUES ('Fashion', 'noimg.jpg', 'images/', 'y', 1, NOW(), 1, NOW());
INSERT INTO category (name, image_name, image_path, active, created_by, created_date, last_updated_by, last_updated_date) VALUES ('Other', 'noimg.jpg', 'images/', 'y', 1, NOW(), 1, NOW());


