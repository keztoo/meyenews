import time

# script to test all the headline grabbers
# the ProcessIndex script will use

grabbers = ['espn', 'cnn', 'bbc', 'nbc5dallas', 'yahoo']

# i would like to include the import statements 
# in the loop but i cant figure out how so for
# now you have to manually add the key to the 
# list above and the import below
from HeadlineGrabbers.HeadlinesESPN import HeadlinesESPN
from HeadlineGrabbers.HeadlinesCNN import HeadlinesCNN
from HeadlineGrabbers.HeadlinesBBC import HeadlinesBBC
from HeadlineGrabbers.HeadlinesNBC5DALLAS import HeadlinesNBC5DALLAS
from HeadlineGrabbers.HeadlinesYAHOO import HeadlinesYAHOO

for grabber in grabbers:
  evalStr = "Headlines%s()" % (grabber.upper())
  gObj = eval(evalStr)
  gObj_headline = gObj.getTopHeadline()

  exitFlag = 0
  while not exitFlag:
    if gObj_headline.get('imageUrl','') == '':
      print "Error fetching", grabber
      time.sleep(5) # sleep 5 seconds
    else:
      print grabber.upper()
      print gObj_headline['articleTitle']
      print gObj_headline['imageUrl']
      print gObj_headline['articleByLine']
      print " "
      exitFlag = 1

