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

$(document).on("click",".hit", function(){
    var url = $(this).attr("href");
    self.location = url;
})

var isFocus = 0;
var isSearchBox = 0;
var searchStart = 0;

function mainFunction() {
    $('#funSearch').click(function() {
        if(isSearchBox == 0) {
            if(searchStart == 0) {
                //search.start();
                searchStart = 1;
            }
            $('#searchImg').fadeIn();
            isSearchBox = 1;
        }
        else {
            $('#searchImg').fadeOut();
            isSearchBox = 0;
        }        
    });

    $('#searchButton').click(function() {
        if(isSearchBox == 0) {
            if(searchStart == 0) {
                //search.start();
                searchStart = 1;
            }
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
    search.start();
}


$(document).ready(function() {
    init();
    $(window).load(function(){
        mainFunction();
    });
});
