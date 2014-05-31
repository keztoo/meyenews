function userOnClickHandler(id, userCallBack)
{
  return userCallBack(id);
}
 
// TabbedNavBar class
function TabbedNavBar(tabName,parentDiv,optionsList,userCallBack)
{
    this.tabName = tabName;
    this.tabDivName = tabName + "_div";
    this.tabUlName = tabName + "_list";

    this.parentDiv = parentDiv;
    this.optionsList = optionsList;
    this.self = this;
    this.tabLinks = new Array();
    this.contentDivs = new Array();
    this.optionsDivs = new Array();
    this.factoryNumber = '1';

    // create tab container div
    this.div = document.createElement('div');
    this.div.setAttribute('id', this.tabDivName);
    this.div.setAttribute('name', this.tabDivName);
    this.div.setAttribute('class', this.tabDivName);
    parentDiv.appendChild( this.div );

    // create tab unordered list 
    this.ul = document.createElement('ul');
    this.ul.setAttribute('id', this.tabUlName);
    this.ul.setAttribute('name', this.tabUlName);
    this.ul.setAttribute('class', this.tabUlName);
    this.div.appendChild( this.ul );

    var listNum = 0;
    for (tab_title in optionsList){
      // create tab list item 
      //var liName = "li" + listNum;
      var liName = tabName + "li" + listNum;

      var tmpLi = document.createElement('li');

      // create its anchor
      var tmpAnchor = document.createElement('a');
      tmpAnchor.innerHTML = optionsList[tab_title];
      tmpLi.appendChild( tmpAnchor );
      this.tabLinks[liName] = tmpAnchor;
      this.ul.appendChild( tmpLi );

      // create associated tab content div
      this.contentDivs[liName] = document.createElement('div');
      var tmpDivName = liName + "_div";
      this.contentDivs[liName].setAttribute('id', tmpDivName);
      this.contentDivs[liName].setAttribute('name', tmpDivName);
      this.contentDivs[liName].setAttribute('class', 'tabContent');
      this.div.appendChild( this.contentDivs[liName] );

      this.optionsDivs[optionsList[tab_title]] = this.contentDivs[liName];
      listNum++;
    }

    // Assign onclick events to the tab links, and
    // highlight the first tab
    var i = 0;
    for ( var id in this.tabLinks ) {
      var mySelf = this;

      this.tabLinks[id].onclick = (function() {
        var currentId = id;
        return function() { 
          for ( var id in mySelf.contentDivs ) {
            if ( id == currentId ) {
              mySelf.tabLinks[id].className = 'selected';
              mySelf.contentDivs[id].className = 'tabContent';
            } else {
              mySelf.tabLinks[id].className = '';
              mySelf.contentDivs[id].className = 'tabContent hide';
            }
          }
          // Stop the browser following the link by returning 
          // false from the user call back routine
          return userOnClickHandler(currentId, userCallBack);
        }
      })();

      this.tabLinks[id].onfocus = function() { this.blur() };
      if ( i == 0 ) this.tabLinks[id].className = 'selected';
      i++;
    }
    // Hide all content divs except the first
    var i = 0;
    for ( var id in this.contentDivs ) {
      if ( i != 0 ) this.contentDivs[id].className = 'tabContent hide';
      i++;
    }

    TabbedNavBar.prototype.getDivForOption = function (divLabel)
    {
      return this.optionsDivs[divLabel];
    }

    TabbedNavBar.prototype.getAnchorRef = function (anchorNum)
    {
      var liName = anchorNum;
      for (id in this.tabLinks){
        var thisAnchorRef = this.tabLinks[id];
        if (id == liName)return( thisAnchorRef );
      }
      return null;
    }

    TabbedNavBar.prototype.show = function ()
    {
alert('show');
    }

    TabbedNavBar.prototype.hide = function ()
    {
    }
}



