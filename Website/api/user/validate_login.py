import uuid
from cgi import escape
from urllib import unquote
import MySQLdb
import os, sys
lib_path = os.path.abspath('/home/ken/sites/meyenews/api')
sys.path.append(lib_path)
from MEyeNewsCommon.MEyeNewsCommon import getMyCfg
from MEyeNewsCommon.MEyeNewsCommon import logMsg

## validate user login script

def validateInputData(req):
  return ''

def getSidForUserName(cursor, userName):
  sql = "SELECT session FROM session WHERE user_name  = '%s'" % (userName)
  cursor.execute(sql)
  result = cursor.fetchone()
  if result:
    return result[0]

  return ''

def createSessionForUserName(db, cursor, userName, userId):
  session = uuid.uuid1()
  sql = "INSERT INTO session (user_name, user_id, session, active, created_by, created_date, last_updated_by, last_updated_date) VALUES ('%s','%s','%s','y', '1', NOW(), '1', NOW())" % (userName, userId, session)
  cursor.execute(sql)
  db.commit()

  return session

# The Publisher passes the Request 
# object to this function
def index(req):
  email = req.form.getfirst('email', '')
  password = req.form.getfirst('pw', '')
  displayName = 'Guest'

  returnString = validateInputData(req)

  if returnString == '':
    # we know we have valid data at this point.

    # connect to database
    db = MySQLdb.connect(host='localhost', db=getMyCfg('db_name'), user=getMyCfg('db_user'), passwd=getMyCfg('db_pw'))

    sql = "SELECT id, display_name FROM user WHERE email = '%s' AND password = '%s'" % (db.escape_string(email), password)

    cursor = db.cursor()
    cursor.execute(sql)
    result = cursor.fetchone()
    if result:
      userId = result[0]
      displayName = result[1]
      # valid login, we have display name 
      # first see if this user already has 
      # an active session and if so use it
      session = getSidForUserName(cursor, displayName)
      if session == '':
        # if necessary we create a new session for this user
        newSid = createSessionForUserName(db, cursor, displayName, userId)
        returnString = "OK|%s|%s" % (newSid, displayName)
      else:
        returnString = "OK|%s|%s" % (session, displayName)
    else:
      returnString = 'Error - Invalid Login!'

  return returnString

