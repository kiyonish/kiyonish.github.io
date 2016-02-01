$(document).ready(function(){

	"use strict";

	// Path to the article json file
	var data_file = "assets/json/articles.json";


	// Define the model 
	var ArticleStore = {

		// Number of articles to show initial
		visibleArticles : 4,

		totalArticles 	: null,

		setArticles		: function( data ) {

			this.data 			= data;

			this.totalArticles 	= data.length;
		},

		getArticles		: function() {

			var articles = [];

			var i = -1;
			while( i++ < ArticleStore.visibleArticles - 1 ) {

				articles.push( ArticleStore.data[ i ] );

			}

			return articles;
		}
	}


	// Define the components

	var ArticleList = React.createClass({

	  render: function() {

	    var articleNodes = this.props.data.map(function(article) {
	      return (
	        <Article key={article.id} title={article.title} image={ article.image } />
	      );
	    });
	    return (
	      <div className="article-list">
	      	<h1>Articles</h1>
	        {articleNodes}
	        <p>Showing { ArticleStore.visibleArticles } of { ArticleStore.totalArticles } articles</p>
	      </div>
	    );
	  }

	});

	var Article = React.createClass({
		render: function() {
			return 	<div className="article">
						<img src={ this.props.image } />
						<h2>{ this.props.title }</h2>
					</div> ;
		}
	});


	var LoadMoreBtn = React.createClass({

		handleClick : function(){

			EventDispatcher.dispatchEvent( "LOAD_BUTTON_CLICKED" );

		},
		render: function() {

			return <button disabled={ ArticleStore.totalArticles === ArticleStore.visibleArticles  } onClick={ this.handleClick }>Load more articles</button>;

		}
	});


	// Listen for the load more button being clicked
	function registerEventHandlers() {

		EventDispatcher.addEventListener( "LOAD_BUTTON_CLICKED" , function(){

			// Increment number of visible the Articles model unless all are visible
			if( ArticleStore.visibleArticles < ArticleStore.totalArticles ) {

				ArticleStore.visibleArticles++;
				
				render();

			}

		});
	}

	// Render components
	function render() {

		ReactDOM.render(
			<LoadMoreBtn />,
			document.getElementById('load-more-container')
		);

		ReactDOM.render(
			<ArticleList data={ ArticleStore.getArticles() } />,
			document.getElementById('article-container')
		);

	}

	// Load the data and initialize the app.
	// IRL would handle errors, show/hide loader for larger payloads
	$.getJSON( data_file, function( data ) {

		ArticleStore.setArticles( data );

		registerEventHandlers();

		render();

	});
	
});