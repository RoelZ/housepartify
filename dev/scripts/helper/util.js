//define({
define(['jQuery'], function ($) {    
    //Temporarily jquery plugin extension
    //case insensitive :contains selector
    $.extend($.expr[":"], {
        "icontains": function (elem, i, match, array) {
            return (elem.textContent || elem.innerText || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
        }
    });

    return {
        isMobile: function () {

            var width = document.documentElement.clientWidth;

            // todo: check for user agent etcetera
            if (width < 623) {
                return true;
            } else {
                return false;
            }

        },

        isTablet: function () {

            var width = document.documentElement.clientWidth;

            // todo: check for user agent etcetera
            if (width < 1007) {
                return true;
            } else {
                return false;
            }

        },

        QueryString: function () {

            var query_string = {};

            if (window.location.search) {

                var query = window.location.search.substring(1);
                var vars = query.split("&");
                for (var i = 0; i < vars.length; i++) {
                    var pair = vars[i].split("=");
                    // If first entry with this name
                    if (typeof query_string[pair[0]] === "undefined") {
                        query_string[pair[0]] = decodeURIComponent(pair[1]);
                        // If second entry with this name
                    } else if (typeof query_string[pair[0]] === "string") {
                        var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
                        query_string[pair[0]] = arr;
                        // If third or later entry with this name
                    } else {
                        query_string[pair[0]].push(decodeURIComponent(pair[1]));
                    }
                }
                return query_string;
            } else {
                return false;
            }
        },



        highlightWord: function (keyword) {
            $(document).ready(function () {
                var first = true;
                $('*:icontains(' + keyword + ')').each(function () {
                    if ($(this).children().not('area, base, br, col, command, embed, hr, img, input, keygen, link, meta, param, source, track, wbr').length < 1 &&
                         $(this).closest('.off-canvas, header, footer, head').length < 1) {
                        //Note: self-closing tags should be ignored as they never contain the supplied keyword
                        var content = $(this).text();
                        var regex = new RegExp('(' + keyword + ')', "gi");
                        content = content.replace(regex, '<span class="highlight">$1</span>');
                        $(this).html(content);
                        if (first === true) {
                            $("body").animate({
                                scrollTop: $(this).offset().top - ($(window).height() / 2)
                            }, 400, function () {

                            });
                            first = false;
                        }
                    }
                });
            });
        },

        truncateByChars: function (string, length) {
            var isTooLong = string.length > length;
            if (isTooLong === true) {
                var s_ = string.substr(0, length - 1);
                return s_.substr(0, s_.lastIndexOf(' ')) + '...';
            } else if (isTooLong === false) {
                return string;
            }
        }
    };

    
});