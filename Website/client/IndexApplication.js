
    String.prototype.replaceAll = function(search, replacement) {
      var target = this;
      return target.replace(new RegExp(search, 'g'), replacement);
    };

    function uploadImageCallBack(resp)
    {
      //alert(resp);
    }

    function uploadImage()
    {
      //alert('upload image');
      var fileSelect = document.getElementById('create_new_image');
      var files = fileSelect.files;
      var file = files[0];
      var formData = new FormData();
      formData.append('file', file, file.name);
      var xhr = new XMLHttpRequest();
      xhr.open('POST', 'api/data_source/save_datasource_file.py', true);
      xhr.onload = function () {
        if (xhr.status === 200) {
          // File(s) uploaded.
          //alert('File Upload???');
        } else {
          alert('An error occurred trying to upload file!');
        }
      };
      xhr.send(formData);
    }

    function setPreferencesCallBack(resp)
    {
      // nothing to do except if resp != 'OK' err
      //alert(resp);
    }

    function getPreferencesCallBackInit(resp)
    {
      eval(resp); // this is a really bad habit
      finalInit();
    }

    function getPreferencesCallBack(resp)
    {
      eval(resp); // this is a really bad habit
      // need to update widgets with new data here 
      var thisDataSource = userPrefDataSources[0];
      thisDataSource = thisDataSource[ Object.keys(thisDataSource)[0]  ];
      var thisArticle = globalArticles['article1_container'];
      var feedImage = thisDataSource.feedImagePath + thisDataSource.feedImageName;
      thisArticle.changeDataSource(thisDataSource.feedUrl, feedImage);

      thisDataSource = userPrefDataSources[1];
      thisDataSource = thisDataSource[ Object.keys(thisDataSource)[0]  ];
      thisArticle = globalArticles['article2_container'];
      feedImage = thisDataSource.feedImagePath + thisDataSource.feedImageName;
      thisArticle.changeDataSource(thisDataSource.feedUrl, feedImage);

      thisDataSource = userPrefDataSources[2];
      thisDataSource = thisDataSource[ Object.keys(thisDataSource)[0]  ];
      thisArticle = globalArticles['article3_container'];
      feedImage = thisDataSource.feedImagePath + thisDataSource.feedImageName;
      thisArticle.changeDataSource(thisDataSource.feedUrl, feedImage);
    }

    function getUserPreferences(isInit)
    {
      var tmpSid = mEyeNewsGetCookie('sid');
      var postStr = "sid=" + tmpSid;
      if (isInit){
        kajaxPostServer('api/user/get_user_prefs.py', postStr, getPreferencesCallBackInit);
      }else{
        kajaxPostServer('api/user/get_user_prefs.py', postStr, getPreferencesCallBack);
      }
    }

    function myCreateNewDataSourceCallBack(resp)
    {
      if (resp.substring(0,3) == 'Id:' ){
        var tmpArray = resp.split(":");
        var newId = tmpArray[1];
        // at some point it would be nice if 
        // you now grabbed the data source 
        // based on the returned ID and updated
        // the categories without the need for 
        // a page reload.
        alert('New Data Source Created, ID = ' + newId);
      }else{
        // otherwise we got an error so show it
        alert(resp);
      }
    }

    function createNewDataSource()
    {
      // TODO - verify feed returns valid data here!
      var name = document.getElementById('create_new_name').value;
      var type = document.getElementById('create_new_type').value;
      var url = document.getElementById('create_new_url').value;
      var category = document.getElementById('create_new_category').value;
      var author = document.getElementById('create_new_author').value;
      var image_name = document.getElementById('create_new_image').value;

      if (name.length < 3 || url.length < 7){
        alert('Error - must have a name and URL!');
        return false;
      }

      var tmpSid = mEyeNewsGetCookie('sid');
      if (!tmpSid || tmpSid.length < 5){
        alert('Error - You must be signed in to create a datasource!');
        return false;
      }
      var postStr = 'name=' + name;
      postStr += '&type=' + type;
      postStr += '&url=' + url;
      postStr += '&category=' + category;
      postStr += '&author=' + author;
      postStr += '&sid=' + tmpSid;
      postStr += '&image_name=' + image_name;

      kajaxPostServer('api/data_source/create_data_source.py', postStr, myCreateNewDataSourceCallBack);

      // now we upload the file data
      uploadImage();

      return true;
    }


    function getDataSourcesCallBack(resp)
    {
      eval(resp);
      var modalName = currentModalOwner;
      var catSec = createCategoriesSection();
      var thisArticle = globalArticles[modalName];

      // note we share the category datasource 
      // modal between all article widgets
      var dataSourceTableTemplate = masterFileContents['client/views/data_source_table.html'];
      var dataSourceTable = dataSourceTableTemplate.replaceAll("@MACRO_TABLE_GUTS", catSec);
      document.getElementById('data_source_table').innerHTML = dataSourceTable;

      thisArticle.updateFeedUI(thisArticle.feedindex);

      // set selected to 0 for all categories except for this one
      for (categorySelector in categorySelectors){
        // dont set option 0 for current category
        if (categorySelectors[categorySelector] != thisArticle.currentCategory){
          var tmpName = "select_" + categorySelectors[categorySelector];
          document.getElementById(tmpName).options[0].selected = 'selected';
        }
      }
      // set currently selected category and data source
      var selectDomName = "select_" + thisArticle.currentCategory;
      var selectRef = document.getElementById(selectDomName);
      selectRef.options[thisArticle.currentCategoryOption].selected = 'selected';

      // update text version of current category and data source
      var categoryElement = document.getElementById('current_category');
      var categoryValue = thisArticle.currentCategory + ': ' + selectRef.options[thisArticle.currentCategoryOption].innerHTML;
      categoryElement.innerHTML = categoryValue;

      // open the modal
      window.location.href= '#openModal';
    }

    function getDataSourcesFromServer(modalName)
    {
      currentModalOwner = modalName; // remember who opened the modal
      var tmpSid = mEyeNewsGetCookie('sid');
      var postStr = "sid=" + tmpSid;
      kajaxPostServer('api/data_source/get_all_data_sources.py', postStr, getDataSourcesCallBack);
    }

    function processTemplate(templateData, thisTemplate)
    {
      // simple macro substitution approach
      var outTemplate = '';
      var thisSaveTemplate = thisTemplate;
      for (thing in templateData){
        thisTemplate = thisSaveTemplate;
        for (innerThing in templateData[thing]){
          thisTemplate = thisTemplate.replaceAll(innerThing, templateData[thing][innerThing]);
        }
        outTemplate += thisTemplate;
      }
      return(outTemplate);
    }

    function loginModalSignUpPressed()
    {
      // called from the login panel we must flrst
      // close it then open the account panel
      // open the modal
      setTimeout(function(){window.location.href= '#openAccount';},1000)
      return true; 
    }

    function handleLogoutResponse(resp)
    {
      //alert('logout response --->' + resp);
    }

    function handleLoginResponse(resp)
    {
      var respArray = resp.split("|");
      if (respArray[0] == 'OK'){
        // valid login update cookie with sid and user name
        mEyeNewsSetCookie('user_name', respArray[2], 365);
        mEyeNewsSetCookie('sid', respArray[1], 365);
        // finally update UI
        document.getElementById('user_name').innerHTML = respArray[2];
        document.getElementById('login_or_logout').innerHTML = 'Sign-Out';
        document.getElementById('loginout_anchor').href = '';
        document.getElementById('account_mode').innerHTML = 'Update';
        getUserPreferences(false);
      } else {
        alert(resp);
      }
    }

    function signInSignOutButtonPressed()
    {
      var userName = document.getElementById('user_name').innerHTML;
      if (userName == 'Guest'){
      }else{
        // else  user is logged in so log them out
        var tmpSid = mEyeNewsGetCookie('sid');
        var postStr = "sid=" + tmpSid;
        kajaxPostServer('api/user/logout_user.py', postStr, handleLogoutResponse);
        mEyeNewsSetCookie('user_name', 'Guest', 365);
        mEyeNewsSetCookie('sid', '0', 365);
        document.getElementById('user_name').innerHTML = 'Guest';
        document.getElementById('login_or_logout').innerHTML = 'Sign-In';
        document.getElementById('loginout_anchor').href = '#loginDiv';
        document.getElementById('account_mode').innerHTML = 'Create';
        return false;
      }
      return true;
    }


    function loginModalAcceptPressed()
    {
      var userName = document.getElementById('user_name').innerHTML;
      if (userName == 'Guest'){
        // if user not logged in
        var email = document.getElementById('email').value;
        var pw = document.getElementById('password').value;
        if (email.length < 3 || pw.length < 3){
          alert("Invalid Login!");
          return false;
        }
        var postStr = "email=" + email + "&pw=" + pw;
        kajaxPostServer('api/user/validate_login.py', postStr, handleLoginResponse);
      }else{
        // else  user is logged in so log them out
        // even though we should never get here
        return(signInSignOutButtonPressed());
      }
      return true;
    }

    // our articles object (or dict or 
    // hash) key'ed by DOM name
    var globalArticles = {};

    // our data sources grabbed from the server
    // the first time someone opens the change
    // data source modal, key'd by data source ID
    var globalDataSources = {};
    var userPrefDataSources = [];

    // remember modal selection
    var lastCategory;
    var lastCategoryOption;

    // dom name of the last article to open the modal
    var currentModalOwner = '';

    // global variables for our file fetch stuff
    var masterFileNames = ['client/views/article.html', 'client/views/article_category_select.html', 'client/views/article_category_option.html', 'client/views/modal_div.html', 'client/views/data_source_table.html', 'views/login_modal.html'];
    var masterFileContents = [];

    // this is an enumeration of our category selectors
    var categorySelectors = ['Contributors', 'Newspapers', 'Websites', 'Government', 'Lifestyle', 'Sports', 'Politics', 'Religion', 'Entertainment', 'Education', 'Environment', 'Technology', 'Shopping', 'Fashion', 'Other'];

    function getDataSourcesForCategory(category)
    {
      // translate from data base objects 
      // to display (template) objects
      var dataSourcesForCategory = [];
      for (dataSource in globalDataSources){
        if (globalDataSources[dataSource].feedCategory == category){
          var tmpObj = {'@MACRO_OPTION_ID':dataSource, '@MACRO_OPTION_NAME':globalDataSources[dataSource].feedName};
          dataSourcesForCategory.push(tmpObj);
        }
      }
      return (dataSourcesForCategory);
    }

    function createCategoriesSection()
    {
      // we spin thru categories and get the
      // data sources from the back end for each
      var CATEGORIES_PER_ROW = 3;
      var finalOutput = '<tr style="padding-top: 1px;padding-bottom: 1px;">';
      var ctr = 0;
      for (selector in categorySelectors)
      {
        // first create the options section
        dataSourcesForCategory = getDataSourcesForCategory(categorySelectors[selector]);
        optionsSection = processTemplate(dataSourcesForCategory, masterFileContents['client/views/article_category_option.html']);

        // next create the complete table data section
        dataForCategory = [{'@MACRO_CATEGORY_NAME':categorySelectors[selector], '@MACRO_CATEGORY_DATA_SOURCES':optionsSection}];
        categorySection = processTemplate(dataForCategory, masterFileContents['client/views/article_category_select.html']);

        finalOutput += categorySection;

        // handle 3 cats per row
        ctr++;
        if ( !(ctr % CATEGORIES_PER_ROW) ){
          finalOutput += '</tr>';
        }

      // note we require total categories to be evenly
      // divisible by CATEGORIES_PER_ROW otherwise 
      // you will need to add logic to handle missing 
      // </tr>s and td colspan here
      }
      return(finalOutput);
    }


    // called by the body tag
    function pageInit()
    {
      fileLoadInit(masterFileNames, myCallBack);
    }

    // once everything has been loaded and initialized
    // we call this routine so the user can do his/her
    // thing. BUG TODO right now libfetch assumes the 
    // Main() entry point but it should really be 
    // passed in to the loadFileInit() method. also
    // the masterFileContents variable is also hard-
    // coded and shared between this code and libfetch.
    function Main(MainCurrentStatus)
    {
      if (MainCurrentStatus == 0){
        //alert('Ready for application init');
        getUserPreferences(true);
      }else{
        alert('Error trying to initialize --->' + MainCurrentStatus);
      }
    }

    // here's how masterFileContents get populated
    // libfetch will call back here per file
    function myCallBack(fileUrl, fileContents)
    {
      masterFileContents[fileUrl] = fileContents;
    }

    //
    // arrive here when all files have been loaded
    //
    function finalInit() 
    {
      // populate the shared modal div
      document.getElementById('modal_container').innerHTML = masterFileContents['client/views/modal_div.html'];

      var ordinal = 0;
      var thisFeed = userPrefDataSources[ordinal];
      thisFeed = thisFeed[ Object.keys(thisFeed)[0]  ];

      // instantiate our 1st article widget 
      // make sure you have an element by this name somewhere!
      var domName = 'article1_container';
      var feedUrl = thisFeed.feedUrl;
      var feedCategory = thisFeed.feedCategory;
      var feedImage = thisFeed.feedImagePath + thisFeed.feedImageName;
      var htmlTemplate = masterFileContents['client/views/article.html'];
      var templateObjects = [{'@MACRO_DOM_NAME':domName}];
      globalArticles[domName] = new RssFeedArticle(ordinal, domName, feedUrl, feedCategory, feedImage, htmlTemplate, templateObjects);

      // instantiate our 2nd article widget 
      ordinal++;
      thisFeed = userPrefDataSources[ordinal]; 
      thisFeed = thisFeed[ Object.keys(thisFeed)[0]  ];
      domName = 'article2_container';
      feedUrl = thisFeed.feedUrl;
      feedCategory = thisFeed.feedCategory;
      feedImage = thisFeed.feedImagePath + thisFeed.feedImageName;
      htmlTemplate = masterFileContents['client/views/article.html'];
      templateObjects = [{'@MACRO_DOM_NAME':domName}];
      globalArticles[domName] = new RssFeedArticle(ordinal, domName, feedUrl, feedCategory, feedImage, htmlTemplate, templateObjects);

      // instantiate our 3rd article widget - espn top headlines 
      ordinal++;
      thisFeed = userPrefDataSources[ordinal]; 
      thisFeed = thisFeed[ Object.keys(thisFeed)[0]  ];
      domName = 'article3_container';
      feedUrl = thisFeed.feedUrl;
      feedCategory = thisFeed.feedCategory;
      feedImage = thisFeed.feedImagePath + thisFeed.feedImageName;
      htmlTemplate = masterFileContents['client/views/article.html'];
      templateObjects = [{'@MACRO_DOM_NAME':domName}];
      globalArticles[domName] = new RssFeedArticle(ordinal, domName, feedUrl, feedCategory, feedImage, htmlTemplate, templateObjects);

      // read cookie figure out if user is
      // logged in if so update user name
      var userName = 'Guest';
      var tmpUser = mEyeNewsGetCookie('user_name');
      if (tmpUser){
        userName = tmpUser;
      }
      document.getElementById('user_name').innerHTML = userName;
      if (userName != 'Guest'){
        document.getElementById('login_or_logout').innerHTML = 'Sign-Out';
        document.getElementById('account_mode').innerHTML = 'Update';
        document.getElementById('loginout_anchor').href = '';
      }

      // populate today's date
      var tmpString = (new Date()).toString();
      var dateString = tmpString;
      document.getElementById('current_date').innerHTML = dateString;
      document.getElementById('loginDiv').innerHTML = masterFileContents['views/login_modal.html'];

    }

    // these next set of functions are gnarly as they
    // rightfully belong in the actual objects. this is 
    // a kludge to get us going for now
    function nextArticle(domName)
    {
      globalArticles[domName].nextArticle();
    }

    // note - because my css modal barfs on nested
    // modals I use the window.open for my nested
    // modal (which is not modal at all).
    function showFilterModal(categoryName)
    {
      // open the filter modal window using window.open()
      var strWindowFeatures = "menubar=no,location=no,resizable=no,scrollbars=no,status=no,height=400,width=800";
      var windowUrl = "views/filters.html?category_name=" + categoryName + "&slider1=1&slider2=50&slider3=100";
      windowObjectReference = window.open(windowUrl, "Category Filters", strWindowFeatures);
      return false;
    }

    function filterModalCallBack(slider1,slider2,slider3)
    {
      // called when the filter modal close has been pressed
      windowObjectReference.close();
      alert('filter modal closed ' + slider1 + ',' + slider2 + ',' + slider3);
    }

    function modalAcceptPressed()
    {
      // the user has pressed accept in the 
      // data source select modal
      var thisArticle = globalArticles[currentModalOwner];
      thisArticle.currentCategory = lastCategory;
      thisArticle.currentCategoryOption = lastCategoryOption;

      // given a category and option you need to
      // derive a data source ID here so you can 
      // get the feed url for this data source
      // and have the article update itself
      var selectName = 'select_' + lastCategory;
      var selectElement = document.getElementById(selectName);
      var dataSourceId = selectElement.options[selectElement.selectedIndex].value;
      var imageName = globalDataSources[dataSourceId].feedImagePath + globalDataSources[dataSourceId].feedImageName;
      thisArticle.changeDataSource(globalDataSources[dataSourceId].feedUrl, imageName);
      // if user is logged in we need to update their preferences
      var tmpUser = mEyeNewsGetCookie('user_name');
      if (tmpUser != 'Guest'){
        //alert('update user article position ' + thisArticle.ordinal + ' data source id ' + dataSourceId);
        var tmpSid = mEyeNewsGetCookie('sid');
        var postStr = "sid=" + tmpSid;
        postStr += '&feed_ordinal=' + thisArticle.ordinal;
        postStr += '&feed_id=' + dataSourceId;
        kajaxPostServer('api/user/set_user_prefs.py', postStr, setPreferencesCallBack);
      }
    }

    function modalCancelPressed()
    {
      //alert('cancel ');
    }

    function handleChangedOption(category, value, thisRef)
    {
      // a catgory/data source has changed so we 
      // handle that here
      var categoryElement = document.getElementById('current_category')
      var categoryValue = category + ': ' + thisRef.options[thisRef.selectedIndex].innerHTML;
      categoryElement.innerHTML =  categoryValue;

      // here we set all selects to the 0 or off selection
      // Warning - its extremely dirty but it works 
      var domSelectId = "select_" + category;
      for (categorySelector in categorySelectors){
        var tmpName = "select_" + categorySelectors[categorySelector];
        if (tmpName != domSelectId){
          document.getElementById(tmpName).options[0].selected = 'selected';
        }
      }
      // must update state variables
      lastCategory = category;
      lastCategoryOption = thisRef.selectedIndex;
    }

