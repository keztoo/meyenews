from cgi import escape
from urllib import unquote
import MySQLdb
import os, sys
lib_path = os.path.abspath('/home/ken/sites/meyenews/api')
sys.path.append(lib_path)
from MEyeNewsCommon.MEyeNewsCommon import getMyCfg
from MEyeNewsCommon.MEyeNewsCommon import logMsg

## get user preferences for a  given sid

def getOrdinalForFeedId(feedId, orderArray):
  indx = 0
  result = []
  while indx < len(orderArray):
    if str(orderArray[indx]) == feedId:
      result.append(indx)
    indx = indx + 1
  return result

# The Publisher passes the Request 
# object to this function
def index(req):
  sessionId = req.form.getfirst('sid', '')

  #logMsg('get prefs called for sid ' + sessionId);

  # connect to database
  db = MySQLdb.connect(host='localhost', db=getMyCfg('db_name'), user=getMyCfg('db_user'), passwd=getMyCfg('db_pw'))
  cursor = db.cursor()

  # could get everything with a fancy 
  # join but will take a shortcut here
  sql = "SELECT up.feed1, up.feed2, up.feed3, up.feed4, up.feed5, up.feed6, up.feed7 FROM user_prefs up JOIN session s ON (s.user_id = up.user) WHERE s.session = '%s'" % (sessionId)

  cursor.execute(sql)
  result = cursor.fetchone()
  feedList = ""
  orderArray = []
  if not result:
    # if error 
    feedList = "('1', '2', '3', '4', '5', '6', '7')"
    orderArray = ['1', '2', '3', '4', '5', '6', '7']
  else:
    feedList = "('%s', '%s', '%s', '%s', '%s', '%s', '%s')" % (result[0], result[1],result[2],result[3],result[4],result[5],result[6])
    orderArray = [result[0], result[1],result[2],result[3],result[4],result[5],result[6]]

  sql = "SELECT ds.id, ds.name, ds.type, ds.url, c.name, ds.author, ds.image_name, ds.image_path FROM data_source ds JOIN category c ON (ds.category = c.id) WHERE ds.id IN " + feedList

  cursor.execute(sql)
  index = 0
  orderedResults = [1,2,3,4,5,6,7]
  results = cursor.fetchall()
  for result in results:
    feedId = str(result[0])
    offsets = getOrdinalForFeedId(feedId, orderArray)

    for offset in offsets:
      tmpObj = {feedId:{'feedName':result[1], 'feedType':str(result[2]), 'feedUrl':result[3], 'feedCategory':result[4], 'feedAuthor':result[5], 'feedImageName':result[6], 'feedImagePath':result[7]}}
      orderedResults[offset] = tmpObj

  returnString = "userPrefDataSources = " + str(orderedResults) + ";"

  #logMsg('get prefs returns --->' + returnString);

  return returnString

