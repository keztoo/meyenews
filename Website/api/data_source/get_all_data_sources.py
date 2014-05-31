from cgi import escape
from urllib import unquote
import MySQLdb
import os, sys
lib_path = os.path.abspath('/home/ken/sites/meyenews/api')
sys.path.append(lib_path)
from MEyeNewsCommon.MEyeNewsCommon import getMyCfg
from MEyeNewsCommon.MEyeNewsCommon import logMsg

## get all data sources for user given sid

# The Publisher passes the Request 
# object to this function
def index(req):
  sessionId = req.form.getfirst('sid', '')

  # connect to database
  db = MySQLdb.connect(host='localhost', db=getMyCfg('db_name'), user=getMyCfg('db_user'), passwd=getMyCfg('db_pw'))

  cursor = db.cursor()
  sql = "SELECT ds.id, ds.name, ds.type, ds.url, c.name, ds.author, ds.image_name, ds.image_path FROM data_source ds JOIN category c ON (ds.category = c.id)"
  cursor.execute(sql)

  returnString = "globalDataSources = { "

  results = cursor.fetchall()
  for result in results:
    tmpString = "'%s':{'feedName':'%s', 'feedType':'%s', 'feedUrl':'%s', 'feedCategory':'%s', 'feedAuthor':'%s', 'feedImageName':'%s', 'feedImagePath':'%s'}," % (result[0], result[1], result[2], result[3], result[4], result[5], result[6], result[7])

    returnString = returnString + tmpString

  returnString = returnString[:-1]
  returnString = returnString + " };"

  #logMsg(returnString);

  return returnString

