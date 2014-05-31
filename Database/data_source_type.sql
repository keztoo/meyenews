CREATE TABLE data_source_type (
     id INT NOT NULL AUTO_INCREMENT,
     name CHAR(250) NOT NULL,
     active CHAR(1) NOT NULL,
     created_by INT NOT NULL,
     created_date DATETIME DEFAULT NULL,
     last_updated_by INT NOT NULL,
     last_updated_date DATETIME DEFAULT NULL,
     PRIMARY KEY (id)
) ENGINE=MyISAM;

INSERT INTO data_source_type (name, active, created_by, created_date, last_updated_by, last_updated_date) VALUES ('RSS', 'y', 1, NOW(), 1, NOW());

