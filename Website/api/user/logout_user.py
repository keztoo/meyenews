from cgi import escape
from urllib import unquote
import MySQLdb
import os, sys
lib_path = os.path.abspath('/home/ken/sites/meyenews/api')
sys.path.append(lib_path)
from MEyeNewsCommon.MEyeNewsCommon import getMyCfg
from MEyeNewsCommon.MEyeNewsCommon import logMsg

## log out user login script

# The Publisher passes the Request 
# object to this function
def index(req):
  sid = req.form.getfirst('sid', '')

  # connect to database
  #db = MySQLdb.connect(host='localhost', db='meyenews', user='root', passwd='w00t')
  db = MySQLdb.connect(host='localhost', db=getMyCfg('db_name'), user=getMyCfg('db_user'), passwd=getMyCfg('db_pw'))

  sql = "SELECT id FROM session WHERE session = '%s'" % (db.escape_string(sid))

  cursor = db.cursor()
  cursor.execute(sql)
  result = cursor.fetchone()
  if result:
    # valid sid
    sql = "DELETE FROM session WHERE id = %s" % (result[0])
    cursor.execute(sql)
    db.commit()
    logMsg('Logout, SID Removed --->' + sid)
  else:
    logMsg('Logout, SID NOT FOUND --->' + sid)

  return 'OK'

