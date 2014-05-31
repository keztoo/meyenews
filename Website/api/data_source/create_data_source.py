from cgi import escape
from urllib import unquote
import MySQLdb
import os, sys
lib_path = os.path.abspath('/home/ken/sites/meyenews/api')
sys.path.append(lib_path)
from MEyeNewsCommon.MEyeNewsCommon import getMyCfg
from MEyeNewsCommon.MEyeNewsCommon import logMsg

## create data source script

def validateInputData(req):
  # TODO type is valid across domain table

  # non-db type validations - input data values

  # verify we have a valid user ID
  sessionId = req.form.getfirst('sid', '')
  if len(sessionId) < 5:
    return 'Error - invalid session'

  name = req.form.getfirst('name', '')
  if len(name) < 2:
    return 'Error - invalid name'

  url = req.form.getfirst('url', '')
  if len(url) < 2:
    return 'Error - invalid url'

  category = req.form.getfirst('category', '')

  # all input data is valid so now we need to do
  # some semantic validation
  thisUserId = 0

  # first make sure category exists
  db = MySQLdb.connect(host='localhost', db=getMyCfg('db_name'), user=getMyCfg('db_user'), passwd=getMyCfg('db_pw'))

  cursor = db.cursor()

  sql = "SELECT id FROM category WHERE id = '%s'" % (category)
  cursor.execute(sql)
  result = cursor.fetchone()
  if not result:
    return 'Error - invalid category'

  # next make sure this is the only feed 
  # by this name for this category
  sql = "SELECT id FROM data_source WHERE name = '%s' AND category = '%s'" % (name, category)
  cursor.execute(sql)
  result = cursor.fetchone()
  if result:
    return 'Error - a data source by name this already exists in this category'

  sql = "SELECT user_id FROM session WHERE session = '%s'" % (sessionId)
  cursor.execute(sql)
  result = cursor.fetchone()
  if not result:
    return 'Error - invalid user'
  else:
    thisUserId = result[0]

  # finally make sure this name + url are unique
  sql = "SELECT category FROM data_source WHERE name = '%s' AND url = '%s'" % (name, url)
  cursor.execute(sql)
  result = cursor.fetchone()
  if result:
    return 'Error - a data source with this name and url already exists in category:' + str(result[0])

  # otherwise request passes validation

  return ''

# The Publisher passes the Request 
# object to this function
def index(req):
  # these are the field names 
  # I expect from the form. 
  formFields = ['name', 'type', 'url', 'category', 'author', 'image_name']

  sessionId = req.form.getfirst('sid', '')
  # get user id based on session id here
  userId = str(1)

  returnString = validateInputData(req)

  #logMsg('CreateDataSource validate response = ' + returnString);

  if returnString == '':
    # we know we have valid data at this point.

    # we use db names for form field names 
    # to remove the need for translation
    # this is just done for speed of prototyping!
    sqlFieldNames = "INSERT INTO data_source ("
    sqlFieldValues = " VALUES ("
    for field in formFields:
      fieldValue = req.form.getfirst(field, '')
      # Escape the user input to avoid script injection attacks
      fieldValue = escape(fieldValue)
      # Add the field to the sql strings
      sqlFieldNames = sqlFieldNames + field + ","
      sqlFieldValues = sqlFieldValues + "'" + fieldValue + "',"

    imagePath = "'user_photos/'"
    sqlFieldNames = sqlFieldNames + 'image_path, created_by, created_date, last_updated_by, last_updated_date)'
    sqlFieldValues = sqlFieldValues + imagePath + ", " + userId + ", NOW(), " + userId + ", NOW())"

    finalSql = sqlFieldNames + sqlFieldValues

    #logMsg(finalSql)

    # connect to database
    db = MySQLdb.connect(host='localhost', db='meyenews', user='root', passwd='w00t')
    cursor = db.cursor()
    cursor.execute(finalSql)
    db.commit()
    data_source_id = cursor.lastrowid
    returnString = "Id:%s" % (data_source_id)

  return returnString

