CREATE TABLE user (
     id INT NOT NULL AUTO_INCREMENT,
     email CHAR(250) NOT NULL,
     display_name CHAR(250) NOT NULL,
     password CHAR(50) NOT NULL,
     location CHAR(250) NOT NULL,
     location_public CHAR(1) NOT NULL,
     tag_line CHAR(250) NOT NULL,
     tag_line_public CHAR(1) NOT NULL,
     about CHAR(250) NOT NULL,
     about_public CHAR(1) NOT NULL,
     image_name CHAR(250) NOT NULL,
     image_path CHAR(250) NOT NULL,
     image_public CHAR(1) NOT NULL,
     active CHAR(1) NOT NULL,
     created_by INT NOT NULL,
     created_date DATETIME DEFAULT NULL,
     last_updated_by INT NOT NULL,
     last_updated_date DATETIME DEFAULT NULL,
     PRIMARY KEY (id)
) ENGINE=MyISAM;

INSERT INTO user (email, display_name, password, location, location_public, tag_line, tag_line_public, about, about_public, image_name, image_path, image_public, active, created_by, created_date, last_updated_by, last_updated_date) VALUES ('ken@ken.com', 'ken', 'ken', 'Pompano Beach FL', 'y', 'Sunnin it up', 'y', 'About Ken ...', 'y', 'noimg.jpg', 'images/', 'y', 'y', 1, NOW(), 1, NOW());

INSERT INTO user (email, display_name, password, location, location_public, tag_line, tag_line_public, about, about_public, image_name, image_path, image_public, active, created_by, created_date, last_updated_by, last_updated_date) VALUES ('scott@scott.com', 'scott', 'scott', 'DeLand FL', 'y', 'Sunnin it up', 'y', 'About Scott ...', 'y', 'noimg.jpg', 'images/', 'y', 'y', 1, NOW(), 1, NOW());


INSERT INTO user (email, display_name, password, location, location_public, tag_line, tag_line_public, about, about_public, image_name, image_path, image_public, active, created_by, created_date, last_updated_by, last_updated_date) VALUES ('chris@chris.com', 'chris', 'chris', 'Iowa', 'y', 'Sunnin it up', 'y', 'About Chris ...', 'y', 'noimg.jpg', 'images/', 'y', 'y', 1, NOW(), 1, NOW());
