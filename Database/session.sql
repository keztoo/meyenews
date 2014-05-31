CREATE TABLE session (
     id INT NOT NULL AUTO_INCREMENT,
     session CHAR(250) NOT NULL,
     user_id INT NOT NULL,
     user_name CHAR(250) NOT NULL,
     active CHAR(1) NOT NULL,
     created_by INT NOT NULL,
     created_date DATETIME DEFAULT NULL,
     last_updated_by INT NOT NULL,
     last_updated_date DATETIME DEFAULT NULL,
     PRIMARY KEY (id)
) ENGINE=MyISAM;


