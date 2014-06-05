import urllib2
class HeadlinesCNN:
  def __init__(self):
    pass

  def extractSection(self, page, startPosition, startToken, endToken):
    startOffset = page.find(startToken)
    if startOffset == -1:
      return ""

    endOffset = page.find(endToken)
    startOffset = startOffset + len(startToken)
    return startOffset, page[startOffset:endOffset]


  def getTopHeadline(self):
    # parse cnn top stories feed and return the first article
    returnObject = {}

    url = "http://rss.cnn.com/rss/cnn_topstories.rss"
    #url = "http://rss.cnn.com/rss/cnn_latest.rss"
    response = urllib2.urlopen(url)
    page = response.read()

    # get the article url
    startToken = '<guid isPermaLink="false">'
    endToken = '</guid>'
    startPosition = 1
    startPosition, url = self.extractSection(page, startPosition, startToken, endToken)

    # now fetch the actual article
    response = urllib2.urlopen(url)
    page = response.read()

    # get the article title
    startToken = "<title>"
    endToken = "</title>"
    startPosition = 1
    startPosition, articleTitle = self.extractSection(page, startPosition, startToken, endToken)

    # get article image url
    startToken = 'http://i2.cdn.turner.com/cnn/dam/assets/'

    startOffset = page.find(startToken)
    if startOffset == -1:
      return returnObject

    endOffset = page.find('"', startOffset+1)
    imageUrl = page[startOffset:endOffset]

    # to find first line of article we take the line
    # that contains (CNN) in it
    startToken = "(CNN)"
    startOffset = page.find(startToken)
    if startOffset == -1:
      return returnObject

    # find first <p> before this ...
    startPara = page.rfind("<p>",0,startOffset)

    # find first </p> after this ...
    endPara = page.find("</p>", startOffset)

    articleByLine = page[startPara+len("<p>"):endPara]
    # remove everything up to </strong>
    endTag = "</strong>"
    endTagOffset = articleByLine.find(endTag)
    if endTagOffset == -1:
      return returnObject

    endTagOffset = endTagOffset + len(endTag) + 4
    articleByLine = articleByLine[endTagOffset:]

    # set up multi-value return object
    returnObject['imageUrl'] = imageUrl
    returnObject['articleTitle'] = articleTitle
    returnObject['articleByLine'] = articleByLine

    return returnObject

