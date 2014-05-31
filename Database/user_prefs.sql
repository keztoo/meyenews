CREATE TABLE user_prefs (
     id INT NOT NULL AUTO_INCREMENT,
     user INT NOT NULL,
     feed1 INT NOT NULL,
     feed2 INT NOT NULL,
     feed3 INT NOT NULL,
     feed4 INT NOT NULL,
     feed5 INT NOT NULL,
     feed6 INT NOT NULL,
     feed7 INT NOT NULL,
     active CHAR(1) NOT NULL,
     created_by INT NOT NULL,
     created_date DATETIME DEFAULT NULL,
     last_updated_by INT NOT NULL,
     last_updated_date DATETIME DEFAULT NULL,
     PRIMARY KEY (id)
) ENGINE=MyISAM;

INSERT INTO user_prefs (user, feed1, feed2, feed3, feed4, feed5, feed6, feed7, active, created_by, created_date, last_updated_by, last_updated_date) VALUES ('1', '1', '2', '3', '4', '5', '6', '7', 'y', 1, NOW(), 1, NOW());

INSERT INTO user_prefs (user, feed1, feed2, feed3, feed4, feed5, feed6, feed7, active, created_by, created_date, last_updated_by, last_updated_date) VALUES ('2', '1', '2', '3', '4', '5', '6', '7', 'y', 1, NOW(), 1, NOW());

INSERT INTO user_prefs (user, feed1, feed2, feed3, feed4, feed5, feed6, feed7, active, created_by, created_date, last_updated_by, last_updated_date) VALUES ('3', '1', '2', '3', '4', '5', '6', '7', 'y', 1, NOW(), 1, NOW());

