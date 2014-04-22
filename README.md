feature-search
==============

Let your users search for the features supported by your website, take the user to a feature page and highlight the feature.

How many times you got frustrated to find a way to navigate to a feature in a website? This tiny plugin helps you to add feature search facility to your website.


How to use
----------

1. Add feature-search.js to your layout page
2. Add the following code onready of your layout page:

		var features = [];
		features.push(new feature("Change your password","/settings.html",["password","change"],"changepassword"));
		features.push(new feature("Find your orders","/orders.html",["orders","order list"],"orders"));
		featureSearch.create($("#searchFeature"),features);
		featureSearch.highlight();

   Here searchFeature is the id of the element to which you want the search box to be appended.

   The feature takes four params
   	1. Label  
   	2. Url
   	3. Keywords to match
   	4. Id of the element in the page rendered by the Url

note: Search comparison happens both in label as well as keywords

Dependencies
------------
1. jquery
2. jquery-ui
