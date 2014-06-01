#
# Usage:
# ./create_database.sh db_user_name db_password database_name
# for example, if I had a mysql user named joe with password
# blow and I had just created a database named joes_meyenews
# I would run ...
# ./create_database.sh joe blow joes_meyenews
#
mysql -u$1 -p$2 $3 < category.sql
mysql -u$1 -p$2 $3 < data_source.sql
mysql -u$1 -p$2 $3 < data_source_type.sql
mysql -u$1 -p$2 $3 < user.sql
mysql -u$1 -p$2 $3 < user_prefs.sql
mysql -u$1 -p$2 $3 < session.sql
mysql -u$1 -p$2 $3 < join_category_and_data_source.sql

