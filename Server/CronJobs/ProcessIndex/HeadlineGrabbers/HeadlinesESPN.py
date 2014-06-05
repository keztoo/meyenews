import urllib2
class HeadlinesESPN:
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

    url = "http://sports.espn.go.com/espn/rss/news"
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
    startToken = '<meta property="og:image" content="'

    startOffset = page.find(startToken)
    if startOffset == -1:
      return returnObject

    startOffset = startOffset + len(startToken)
    endOffset = page.find('"', startOffset+1)
    imageUrl = page[startOffset:endOffset]

    # to find first line of article we take the line
    # <meta name="twitter:description" content=

    startToken = '<meta name="twitter:description" content="'
    startOffset = page.find(startToken)
    if startOffset == -1:
      return returnObject

    startOffset = startOffset + len(startToken)
    endOffset = page.find('"', startOffset+1)
    articleByLine = page[startOffset:endOffset]

    # set up multi-value return object
    returnObject['imageUrl'] = imageUrl
    returnObject['articleTitle'] = articleTitle
    returnObject['articleByLine'] = articleByLine

    return returnObject

