import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component'

export class News extends Component {
   // setting the default props if no props is passed 
   static defaultProps = {
      country: 'in',
      pageSize: 8,
      category: 'general'
   }

   //setting the types of props passing
   static propTypes = {
      country: PropTypes.string,
      category: PropTypes.string,
      page: PropTypes.number,
   }

   //capitalising the first letter of the string
   capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
   }

   //constructor of the class based component
   constructor(props) {
      super(props);
      this.state = {
         articles: [],
         loading: true,
         page: 1,
         totalResults: 0
      }
      //setting the title tag of DOM
      document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsCat`;
   }

   //updating the newsitems
   async updateNews() {
      this.props.setProgress(10);
      //storing the api url 
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=614606cadc5b461c86f40a7b6f27a413&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      
      //setting the loading status of the state true
      this.setState({ loading: true });

      //fetching the reponse from the API
      let data = await fetch(url);
      this.props.setProgress(30);

      //making the response readable
      let parsedData = await data.json();
      this.props.setProgress(70);

      //setting the state of component after the getting the response from the API
      this.setState({
         articles: parsedData.articles, //storing the all the articles in articles array 
         totalResults: parsedData.totalResults, //storing the no. of total results in totalResults
         loading: false //setting the loading status false because we got the data from the api now we need to show it
      })
      this.props.setProgress(100);
   }

   //will run after the DOM is render for the first time
   async componentDidMount() {
      this.updateNews();
   }
   
   //will run when we reach the bottom of the page
   fetchMoreData = async () => {
      //setting the state "page" with +1 to load the next date from the next page
      this.setState({ page: this.state.page + 1 });

      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=614606cadc5b461c86f40a7b6f27a413&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      let data = await fetch(url);
      let parsedData = await data.json();

      //setting the state for the updating the data
      this.setState({
         articles: this.state.articles.concat(parsedData.articles), //concating the previos data/articles with new freshly fetched data/articles
         totalResults: parsedData.totalResults,
         
      })
   };
   
   render() {
      return (
         <>
            {/* setting the header for the page to show the headline text  */}
            <h1 className="text-center my-3" style={{ color: 'white', }}>NewsCat - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>

            {/* //for loading animation  */}
            { this.state.loading && <Spinner />}

            {/* //setting the infinte scroll  */}
            <InfiniteScroll
               dataLength={this.state.articles.length}
               next={this.fetchMoreData}
               hasMore={this.state.articles.length !== this.state.totalResults}
               loader={<Spinner/>} 
               >

               <div className="container">
                  <div className="row">

                     {/* //iterating through the elements/articles and showing them  */}
                     {this.state.articles.map((element) => {
                        return <div className="col-md-3 my-3" key={element.url}>
                              <NewsItem
                                 //iterating each articles and passing the props from the articles array to the newsItem
                                 title={element.title ? element.title.slice(0, 45) : " "}  // passing the title and shortening it for newsItems
                                 description={element.description ? element.description.slice(0, 88) : " "}  // passing the description and shortening it for newsitems
                                 imageUrl={element.urlToImage ? element.urlToImage : "https://designshack.net/wp-content/uploads/placeholder-image.png"} //setting the image for the newsItem box if not available shows the :else block image
                                 newsUrl={element.url} //passing the url of the article to the newsItem
                                 author={element.author} //passing the author name of the article to the newsItem
                                 date={element.publishedAt} //passing the date of the article to the newsItem
                                 source={element.source.name} //passing the source of the article to the newsItem
                              />
                        </div>
                     })}
                  </div>
               </div>
            </InfiniteScroll>
         </>
      )
   }
}

export default News;

//to handle the buttons for going to the next or previouse page
// handlePrevClick = async () => {
//    this.setState({ page: this.state.page - 1 });
//    this.updateNews();
// }
// handleNextClick = async () => {
//    this.setState({ page: this.state.page + 1 });
//    this.updateNews();
// }
