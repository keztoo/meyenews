
def logMsg(msg):
  f = open('/tmp/meyenews.log', 'a')
  f.write(msg)
  f.flush()
  f.close()


def getMyCfg(cfgOption):
  cfgBundle = {'db_name':'ken_meyenews', 'db_user':'ken', 'db_pw':'######'}
  return cfgBundle[cfgOption]

