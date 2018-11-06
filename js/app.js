var search = instantsearch({
    // Replace with your own values
    appId: 'PKH2B42HCE',
    apiKey: 'bb62c5db50ca8b2c581aac06ed127758', // search only API key, no ADMIN key
    indexName: 'MITSUYAMA_SITE',
    urlSync: true,
    searchParameters: {
        hitsPerPage: 5
      }
});

var isFocus = 0;
var isSearchBox = 0;

function mainFunction() {
    search.start();
    $('#searchButton').click(function() {
        if(isSearchBox == 0) {
            $('#searchImg').fadeIn();
            isSearchBox = 1;
        }
        else {
            $('#searchImg').fadeOut();
            isSearchBox = 0;
        }
    });
    $('#searchIcon').click(function() {
        $('#searchImg').fadeOut();
        isSearchBox = 0;
    });
}

function init() {
    // Add this after the previous JavaScript code
    search.addWidget(
        instantsearch.widgets.searchBox({
        container: '#my-search-input',
        })
    );

    // Add this after the previous JavaScript code
    search.addWidget(
        instantsearch.widgets.hits({
            container: '#hits',
            hitsPerPage: 5,
            templates: {
            item: document.getElementById('hit-template').innerHTML,
            empty: "We didn't find any results for the search <em>\"{{query}}\"</em>"
            }
        })
    );

    search.addWidget(
        instantsearch.widgets.pagination({
            container: '#pagination'
        })
    );
}


$(document).ready(function() {
    init();
    $(window).load(function(){
       mainFunction();
    });
});
