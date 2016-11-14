require.config({
    waitSeconds: 45, //Allows requirejs to take up to 45 seconds to load modules (default is 7)
    paths: { 
        'scrollindicator': 'modules/scrollindicator',

        //Helpers
        'utils': 'helper/util',
        'foundation.init': 'helper/foundation.init',
        'globalinit': 'helper/globalinit', //this is a special fella, and contains stuff that should always be fired, regardless of data-module attribute.
        'ElementQueries': 'helper/ElementQueries',
        'ResizeSensor': 'helper/ResizeSensor',
        
        //Vendor scripts
        'jQuery': 'jquery/dist/jquery.min',

    },
    shim: {
        
        'jQuery': {
            exports: '$'
        }

        /*

        'ElementQueries': {
            deps: ['jQuery'],
            exports: 'ElementQueries'
        },
        'ResizeSensor': {
            deps: ['jQuery'],
            exports: 'ResizeSensor'
        }
        */
    }
});

/*
    We need a little bit of vanilla javascript to retrieve all modules currently present on the page with the 'data-module' attribute.
*/
function getAllElementsWithAttribute(attribute) {
    //This function retrieves all elements with a certain attribute: in our case, data-module
    var matchingElements = [];
    var allElements = document.getElementsByTagName('*');
    for (var i = 0, n = allElements.length; i < n; i++) {
        if (allElements[i].getAttribute(attribute) !== null) {
            // Element exists with attribute. Add to array.
            matchingElements.push(allElements[i]);
        }
    }
    return matchingElements;
}


var instances = {};
//Retrieves all the required (badumtsss) modules from the DOM
//Note: this is currently flat and expects the module to be present in the require.config{paths}
getAllElementsWithAttribute('data-module').forEach(function (entry, index) {
    var moduleName = entry.getAttribute("data-module");
    var moduleOptions = entry.getAttribute("data-module-options");

        
    if (JSON.parse(moduleOptions)) {
        //options are succesfully parseable to json
        moduleOptions = JSON.parse(moduleOptions);
    } else if (typeof moduleOptions != 'undefined' && moduleOptions != null) {
        //seems something was send but looks god darn invalid to me
        //console.log(moduleOptions);
        console.warn('Not a valid options object was supplied with ' + moduleName + ' module.');
    } else {
        //no options provided.
        moduleOptions = {}; // fallback
        // console.log('No options object supplied with ' + moduleName + ' module.');
    }

        
    require([moduleName], function (mod) {
        instances[index] = new mod(entry, moduleOptions);
    }, function (err) {
        console.warn('Failed to load module ' + moduleName + '.');
    });
});

    var expanded = false;
    function showCheckboxes() {
        var checkboxes = document.getElementById("checkboxes");
        if (!expanded) {
            checkboxes.style.display = "block";
            expanded = true;
        } else {
            checkboxes.style.display = "none";
            expanded = false;
        }
    }