CREATE TABLE join_category_and_data_source (
     id INT NOT NULL AUTO_INCREMENT,
     category INT NOT NULL,
     data_source INT NOT NULL,
     active CHAR(1) NOT NULL,
     created_by INT NOT NULL,
     created_date DATETIME DEFAULT NULL,
     last_updated_by INT NOT NULL,
     last_updated_date DATETIME DEFAULT NULL,
     PRIMARY KEY (id)
) ENGINE=MyISAM;

