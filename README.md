feature-search
==============

How many times you got frustrated to find where a particular feature is located in a website? How long it took for you to find a way to navigate to a feature in a website? Some websites provide knowledge base/documentation/site map for this purpose, but who is ready to read those? Some advanced user search in google with 'site' filter, but still that's time consuming. 

This tiny script helps you to easily add a facility to quickly search the list of features supported by your website, and redirects the user to a feature page upon selection and highlight the feature in that page.


How to use
----------

1. Add feature-search.js to your layout page
2. Add the following code in onready of your layout page:

		var features = [];
		features.push(new feature("Change your password","/settings.html",["password","change"],"changepassword"));
		features.push(new feature("Find your orders","/orders.html",["orders","order list"],"orders"));
		//...other features you want to make it searchable
		featureSearch.create($("#searchFeature"),features);

   Here searchFeature is the id of the element to which you want the search box to be appended.

The feature takes four arguments

 1. Label/Title of the feature
 2. Url - This can be either url of the page where the link to feature is located or the actual url of the feature. For example, for change password feature, you can either give the url of the page where the link to "Change Password" is located or you can directly give the url of the page where the change password form is located.
 3. Keywords to match when the user search
 4. Id of the element in the page rendered by the Url. This is used for highlighting it.
 
That's it, now you should see an autocomplete search box which lets the user to search the list of features. The matching features are displayed in a drop down with matching parts highlighted, and when the user select one of the options, the user will be redirect to the page where the feature is located and highlights the text in that page.    

note: The script searches for the search-term in both the label as well as keywords

Dependencies
------------
1. jquery
2. jquery-ui

Check out the following if you need more info
http://www.codeproject.com/Tips/763580/Website-Features-Search
