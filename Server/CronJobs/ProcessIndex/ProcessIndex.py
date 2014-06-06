import time, sys
# script to create a new index page 
#
# python ProcessIndex.py index_page_template crousel_section_template output_file
#
# most probable invocation ...
#
#   python ProcessIndex.py /home/ken/code_line/meyenews/Server/CronJobs/ProcessIndex/views/index.tmpl /home/ken/code_line/meyenews/Server/CronJobs/ProcessIndex/views/carousel_section.tmpl /tmp/new_index.html
#

indexTemplateFileName = sys.argv[1]
carouselSectionTemplateFileName = sys.argv[2]
outputFileName = sys.argv[3]

f = open(indexTemplateFileName)
page = f.read()
f.close()

f = open(carouselSectionTemplateFileName)
section = f.read()
f.close()

# list of 5 headline grabbers
grabbers = ['espn', 'cnn', 'bbc', 'nbc5dallas', 'yahoo']

from HeadlineGrabbers.HeadlinesESPN import HeadlinesESPN
from HeadlineGrabbers.HeadlinesCNN import HeadlinesCNN
from HeadlineGrabbers.HeadlinesBBC import HeadlinesBBC
from HeadlineGrabbers.HeadlinesNBC5DALLAS import HeadlinesNBC5DALLAS
from HeadlineGrabbers.HeadlinesYAHOO import HeadlinesYAHOO

headlines = ""
for grabber in grabbers:
  maxRetrys = 10
  print "Processing", grabber.upper()
  evalStr = "Headlines%s()" % (grabber.upper())
  gObj = eval(evalStr)
  gObj_headline = gObj.getTopHeadline()

  exitFlag = 0
  while not exitFlag:
    if gObj_headline.get('imageUrl','') == '':
      print "Error fetching", grabber
      time.sleep(5) # sleep 5 seconds
      maxRetrys = maxRetrys - 1
      if maxRetrys == 0:
        print "Aborting"
        exit(0)
    else:
      new_section = section
      new_section = new_section.replace("@MACRO_TITLE", gObj_headline['articleTitle'])
      new_section = new_section.replace("@MACRO_IMAGE", gObj_headline['imageUrl'])
      new_section = new_section.replace("@MACRO_BYLINE", gObj_headline['articleByLine'])
      headlines = headlines + new_section
      exitFlag = 1

page = page.replace("@MACRO_CAROUSEL", headlines)

f = open(outputFileName, 'w')
f.write(page)
f.close()

print "New Index Page Created: new_index.html"


