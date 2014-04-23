function feature(label, url, keywords, elementId) {
    this.label = label;
    this.url=url;
    this.keywords = keywords;
    this.elementId = elementId;
}

var featureSearch = (function() {

    var featuresList = [];
    var autoComplete;
    
    function getMatches(request) {
        
        var terms = request.term.toLowerCase().split(' ');
        var matches = [];
        var matchingFeatures = [];

        for(var i=0; i<featuresList.length; i++) {
            var foundMatch = false;

            for(var j=0; j<terms.length; j++) {
                if(foundMatch) {
                    break;
                }
                if(featuresList[i].label.indexOf(terms[j])>-1)
                {
                    matchingFeatures.push(featuresList[i]);
                    foundMatch = true;
                    break;
                }
                else
                {
                    for(var k=0;k<featuresList[i].keywords.length; k++){
                          if(featuresList[i].keywords[k].indexOf(terms[j])> -1) {
                            matchingFeatures.push(featuresList[i]);
                            foundMatch = true;
                            break;
                        } 
                     }
                }
            }
            if(foundMatch) {
                var label = featuresList[i].label + "; keywords :  " + featuresList[i].keywords.join();
                    for (var m = 0; m < terms.length; m++) {
                        if (terms[m].length > 0) {
                        var rx = new RegExp(terms[m], "gi");
                        label = label.replace(rx, highlightText);
                    }
                } 
                matches.push({ value: i, label: label });
            }
        }
        return matches;
    }
    
    function highlightText(match) {
        return highlight($("<span>" + match + "</span>"))[0].outerHTML;
    }

    function highlight(element)
    {
        element.css("background-color","#FFFFA0").css("font-weight","bold");
        return element;
    }
    
     function addQueryString(url, queryString) {   
      if (queryString) {
        var hasQuestionMark = url && url.indexOf('?') !== -1,
          separator = hasQuestionMark ? '&' : '?';
        url += separator + "highlight=" + queryString;

      }
      return url;
     }
    
    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
    
    function onFeatureSelect(item) {
        var selectedFeature = featuresList[item];
        if(selectedFeature)
        {
            window.location.replace(addQueryString(selectedFeature.url, selectedFeature.elementId));
        }
    }
    
    function createAutocomplete(appendTo)
    {
        var element = $('<input id="autoComplete"  type="text" />');
        $(element).autocomplete({
            minLength: 2,
            source: function(request, response) {
                    response(getMatches(request));
                },
            close: function() {
                    onFeatureSelect(this.value);
                }
        }
        ).data("uiAutocomplete")._renderItem = function (ul, item) {
            return $("<li></li>")
                    .data("item.autocomplete", item)
                    .append("<a>" + item.label + "</a>")
                    .appendTo(ul);
        };

        $(appendTo).append(element);
    }
    
    function highlightMatches()
    {
        var elementId = getParameterByName("highlight");
        highlight($("#"+elementId)).focus();
    }
    
    return { 
        
        create: function (appendTo, features) {
            featuresList = features;
            createAutocomplete(appendTo);
            highlightMatches();
        }
    };
    
})();
