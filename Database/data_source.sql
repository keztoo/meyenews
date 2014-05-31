CREATE TABLE data_source (
     id INT NOT NULL AUTO_INCREMENT,
     name CHAR(250) NOT NULL,
     type INT NOT NULL,
     url CHAR(250) NOT NULL,
     category INT NOT NULL,
     author CHAR(250) NOT NULL,
     image_name CHAR(250) NOT NULL,
     image_path CHAR(250) NOT NULL,
     active CHAR(1) NOT NULL,
     created_by INT NOT NULL,
     created_date DATETIME DEFAULT NULL,
     last_updated_by INT NOT NULL,
     last_updated_date DATETIME DEFAULT NULL,
     PRIMARY KEY (id)
) ENGINE=MyISAM;

INSERT INTO data_source (name, type, url, category, author, image_name, image_path, active, created_by, created_date, last_updated_by, last_updated_date) VALUES ('SlashDot', '1', 'http://rss.slashdot.org/Slashdot/slashdot', '1', 'Arthur', 'logo_slashdot.png', 'images/', 'y', 1, NOW(), 1, NOW());

INSERT INTO data_source (name, type, url, category, author, image_name, image_path, active, created_by, created_date, last_updated_by, last_updated_date) VALUES ('GoogleTrends', '1', 'http://www.google.com/trends/hottrends/atom/feed?pn=p1', '1', 'Arthur', 'logo_google.png', 'images/', 'y', 1, NOW(), 1, NOW());


INSERT INTO data_source (name, type, url, category, author, image_name, image_path, active, created_by, created_date, last_updated_by, last_updated_date) VALUES ('ESPN', '1', 'http://sports.espn.go.com/espn/rss/news', '1', 'Arthur', 'logo_espn.jpg', 'images/', 'y', 1, NOW(), 1, NOW());

INSERT INTO data_source (name, type, url, category, author, image_name, image_path, active, created_by, created_date, last_updated_by, last_updated_date) VALUES ('CNN-SI', '1', 'http://rss.cnn.com/rss/si_topstories.rss', '1', 'Arthur', 'logo_si.png', 'images/', 'y', 1, NOW(), 1, NOW());

INSERT INTO data_source (name, type, url, category, author, image_name, image_path, active, created_by, created_date, last_updated_by, last_updated_date) VALUES ('CNN', '1', 'http://rss.cnn.com/rss/cnn_topstories.rss', '1', 'Arthur', 'logo_cnn.gif', 'images/', 'y', 1, NOW(), 1, NOW());

INSERT INTO data_source (name, type, url, category, author, image_name, image_path, active, created_by, created_date, last_updated_by, last_updated_date) VALUES ('BBC', '1', 'http://feeds.bbci.co.uk/news/rss.xml', '1', 'Arthur', 'logo_bbc.gif', 'images/', 'y', 1, NOW(), 1, NOW());

INSERT INTO data_source (name, type, url, category, author, image_name, image_path, active, created_by, created_date, last_updated_by, last_updated_date) VALUES ('NY Times', '1', 'http://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml', '1', 'Arthur', 'logo_nyt.png', 'images/', 'y', 1, NOW(), 1, NOW());



