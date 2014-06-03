from cgi import escape
from urllib import unquote
import MySQLdb
import os, sys
lib_path = os.path.abspath('/home/ken/sites/meyenews/api')
sys.path.append(lib_path)
from MEyeNewsCommon.MEyeNewsCommon import getMyCfg
from MEyeNewsCommon.MEyeNewsCommon import logMsg

##  save a user submitted file

# The Publisher passes the Request 
# object to this function
def index(req):
  sid = req.form.getfirst('sid', '')
  returnString = 'Invalid SID'
  file = req.form.getfirst('file', '')

  # connect to database
  db = MySQLdb.connect(host='localhost', db=getMyCfg('db_name'), user=getMyCfg('db_user'), passwd=getMyCfg('db_pw'))

  sql = "SELECT user_id FROM session WHERE session = '%s'" % (db.escape_string(sid))

  cursor = db.cursor()
  cursor.execute(sql)
  result = cursor.fetchone()

  #if result:
  if True:
    # valid sid
    #userId = result[0]
    #returnString = 'UserID=' + str(userId)
    filepath = "/home/ken/sites/meyenews/user_photos/"

    # A nested Field object holds the file
    fileitem = req.form['file']

    # BUG - checks missing
    # 1) strip leading path from file name to avoid 
    # directory traversal attacks 
    # 2) missing validation of sid!!!
    # 3) max file size check missing
    # 4) a file by that name al,ready exists

    filename = fileitem.filename
    fname = "%s%s" % (filepath,filename)
    logMsg('\nUploadFile: filename --->' + fname)

    # save the image data to the filesystem
    open(fname, 'wb').write(file.file.read())

  return 'OK'

