// used by the class
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};


// RSS Feed Article class
// note: domName must be unique among widgets and the DOM
function RssFeedArticle(ordinal, domName, feedUrl, feedCategory, feedImage, htmlTemplate, templateObjects)
{
    this.ordinal = ordinal;
    this.domName = domName;
    this.parentDiv = document.getElementById(domName);
    this.rawHtmlTemplate = htmlTemplate;
    this.templateObjects = templateObjects;
    this.processedHtmlTemplate = htmlTemplate.replaceAll("@MACRO_DOM_NAME", domName);
    this.parentDiv.innerHTML = this.processedHtmlTemplate;
    this.currentCategory = feedCategory;
    this.currentCategoryOption = 0;
    this.feedImage = feedImage;

    // this is the reference to the window.open() window
    // object used within the css modal window
    this.windowObjectReference = null;

    this.feedUrl = feedUrl;
    this.feedindex = 0;
    this.thefeeds = [];

    // convert to method (see below)
    var closureSelf = this; // sneaky shit

    var feed = new google.feeds.Feed(feedUrl);
    feed.load(function (result) {
      if (!result.error){
        closureSelf.thefeeds = result.feed.entries;
        closureSelf.feedindex = 0;
        closureSelf.feedUrl = feedUrl;
        closureSelf.updateFeedUI(0);
        closureSelf.changeImage(closureSelf.feedImage);
        //console.log(result.feed.entries);
      }
      else
        alert("Error fetching feeds from " + feedUrl)
    });

    // end constructor, methods follow ...
    RssFeedArticle.prototype.changeDataSource = function(feedUrl, feedImage)
    {
      // convert this to a method since its the same code
      // as what is executed in the constructor
      this.feedImage = feedImage;

      var closureSelf = this; // sneaky shit
  
      var feed = new google.feeds.Feed(feedUrl);
      feed.load(function (result) {
        if (!result.error){
          closureSelf.thefeeds = result.feed.entries;
          closureSelf.feedindex = 0;
          closureSelf.feedUrl = feedUrl;
          closureSelf.updateFeedUI(0);
          closureSelf.changeImage(closureSelf.feedImage);
          //console.log(result.feed.entries);
        }
        else
          alert("Error fetching feeds from " + feedUrl)
      });
    }

    RssFeedArticle.prototype.changeImage = function(newImage)
    {
      var domElement = 'summary_article_image_' + this.domName;
      document.getElementById(domElement).src = newImage;
    }

    RssFeedArticle.prototype.updateFeedUI = function(feedIndex)
    {
      MAX_SNIPPET_SIZE = 70;
      var thisContent = this.thefeeds[feedIndex].content;
      if (thisContent.length > MAX_SNIPPET_SIZE){
        thisContent = thisContent.substring(0,MAX_SNIPPET_SIZE);
      }
      document.getElementById(this.domName + '_summary_article_title').innerHTML = this.thefeeds[feedIndex].title;
      document.getElementById(this.domName + '_summary_article_content').innerHTML = thisContent;
      document.getElementById(this.domName + '_detail_article_title').innerHTML = this.thefeeds[feedIndex].title;
      document.getElementById(this.domName + '_detail_article_content').innerHTML = this.thefeeds[feedIndex].content;
      document.getElementById(this.domName + '_source_link').href = this.thefeeds[feedIndex].link;
    }

    RssFeedArticle.prototype.nextArticle = function()
    {
      if (this.feedindex == (this.thefeeds.length - 1)){
        this.feedindex = 0;
      }else{
        this.feedindex++;
      }
      this.updateFeedUI(this.feedindex);
    }
}

