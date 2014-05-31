from cgi import escape
from urllib import unquote
import MySQLdb
import os, sys
lib_path = os.path.abspath('/home/ken/sites/meyenews/api')
sys.path.append(lib_path)
from MEyeNewsCommon.MEyeNewsCommon import getMyCfg
from MEyeNewsCommon.MEyeNewsCommon import logMsg

## script to update a users feed 
## for a given article widget

# The Publisher passes the Request 
# object to this function
def index(req):
  sid = req.form.getfirst('sid', '')
  feedOrdinal = req.form.getfirst('feed_ordinal', '')
  feedId = req.form.getfirst('feed_id', '')

  feedOrdinal = int(feedOrdinal)
  if feedOrdinal < 0 or feedOrdinal > 6:
    return 'Invalid Article Number'

  feedOrdinal = feedOrdinal + 1
  fieldName = 'feed' + str(feedOrdinal)

  # connect to database
  db = MySQLdb.connect(host='localhost', db=getMyCfg('db_name'), user=getMyCfg('db_user'), passwd=getMyCfg('db_pw'))

  sql = "SELECT user_id FROM session WHERE session = '%s'" % (db.escape_string(sid))

  cursor = db.cursor()
  cursor.execute(sql)
  result = cursor.fetchone()
  if result:
    # valid sid
    userId = result[0]
    sql = "UPDATE user_prefs SET %s = %s WHERE user = %s" % (fieldName, feedId, userId)
    logMsg(sql)
    cursor.execute(sql)
    db.commit()
  else:
    logMsg('Logout, SID NOT FOUND --->' + sid)
    return 'Invalid Request'

  return 'OK'

