var search = instantsearch({
    // Replace with your own values
    appId: 'PKH2B42HCE',
    apiKey: 'bb62c5db50ca8b2c581aac06ed127758', // search only API key, no ADMIN key
    indexName: 'MITSUYAMA_SITE',
    urlSync: true,
    searchParameters: {
        hitsPerPage: 10
    }
});

// Add this after the previous JavaScript code
search.addWidget(
    instantsearch.widgets.searchBox({
      container: '#search-input'
    })
);

// Add this after the previous JavaScript code
search.addWidget(
    instantsearch.widgets.hits({
        container: '#hits',
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