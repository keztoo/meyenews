
# TODO pass in creds and maybe even the mysql executable with path
mysql -uken -pP1ucKWzZ ken_meyenews < category.sql
mysql -uken -pP1ucKWzZ ken_meyenews < data_source.sql
mysql -uken -pP1ucKWzZ ken_meyenews < data_source_type.sql
mysql -uken -pP1ucKWzZ ken_meyenews < user.sql
mysql -uken -pP1ucKWzZ ken_meyenews < user_prefs.sql
mysql -uken -pP1ucKWzZ ken_meyenews < session.sql
mysql -uken -pP1ucKWzZ ken_meyenews < join_category_and_data_source.sql
