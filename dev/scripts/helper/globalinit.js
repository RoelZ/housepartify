//globalinit module
//dependencies: jquery
define(['jQuery', 'utils', 'ElementQueries'], function ($, Utils, ElementQueries) {
    var init = function (element, options) {
        var c = options || {}; //defaults
        var _self = element || '';
        var globals;

        c.floatingLabelClass = 'with-floating-label';

        //Binds the focus and valid classes to an input field / label to make sure focussing works properly
        var inputFocusEvent = function () {
            // text, password, number, textarea input
            $('.' + c.floatingLabelClass).each(function () {
                $(this).focus(function () {
                    $(this).addClass('focus');
                });
                
                $(this).blur(function () {
                    $(this).removeClass('focus');

                    if ($(this).val() !== '') {
                        $(this).addClass('valid');
                    } else {
                        $(this).removeClass('valid');
                    }
                });

                //Do a precheck on field content
                if ($(this).val() !== '') {
                    $(this).addClass('valid');
                }
            });
        };

        var scrollToSearchResult = function () {
            //Scroll the page down to results, if there's a query string active and only on pageload.
            if (Utils.isMobile() === true) {
                // check for URL hash
                if (window.location.hash) {
                    //do nothing
                } else {
                    var querystring = Utils.QueryString();
                    //no hash. check for query string
                    if (querystring.keyword) {
                        if ($('.search-result').length > 0 && querystring.keyword.length > 0) {
                            $(document).ready(function () {
                                //there appear to be search results and a keyword
                                setTimeout(function () {
                                    $("body").animate({
                                        scrollTop: $('.search-result').first().offset().top - 100
                                    }, 400, function () {
                                    });
                                }, 500);
                            });
                        }
                    }
                }
            }
        };

        //or if you want to trigger it yourself.
        // Parse all available CSS and attach ResizeSensor to those elements which have rules attached
        // (make sure this is called after 'load' event, because CSS files are not ready when domReady is fired.
        //////////////////////////////Disable POC:
        ElementQueries.init();

        inputFocusEvent();
        //scrollToSearchResult();

        return globals;
    };

    return init;
});