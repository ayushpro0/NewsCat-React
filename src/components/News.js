import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component'

const News = (props) => {
   const [articles, setArticles] = useState([]);
   const [loading, setLoading] = useState(true);
   const [page, setPage] = useState(1);
   const [totalResults, setTotalResults] = useState(0);

   //capitalising the first letter of the string
   const capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
   }

   //updating the newsitems
   const updateNews = async () => {
      props.setProgress(10);
      //storing the api url 
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=614606cadc5b461c86f40a7b6f27a413&page=${page}&pageSize=${props.pageSize}`;
      
      //setting the loading status of the state true
      setLoading(true);

      //fetching the reponse from the API
      let data = await fetch(url);
      props.setProgress(30);

      //making the response readable
      let parsedData = await data.json();

      //setting the progressBAr to 70% of the progress
      props.setProgress(70);

      //setting the state of component after the getting the response from the API
      setArticles(parsedData.articles); //storing the all the articles in articles array 
      setTotalResults(parsedData.totalResults); //storing the no. of total results in totalResults
      setLoading(false); //setting the loading status false because we got the data from the api now we need to show it

      //setting the progress Bar to 100% of the progress
      props.setProgress(100);
   }

   //will run after the DOM is render for the first time
   useEffect(() => {
      //setting the title tag of DOM
      document.title = `${capitalizeFirstLetter(props.category)} - NewsCat`;
      updateNews();
      // eslint-disable-next-line
   }, []);

   //will run when we reach the bottom of the page
   const fetchMoreData = async () => {
      //setting the state "page" with +1 to load the next date from the next page
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=614606cadc5b461c86f40a7b6f27a413&page=${page + 1}&pageSize=${props.pageSize}`;
      setPage(page + 1);

      let data = await fetch(url);
      let parsedData = await data.json();

      //setting the state for the updating the data
      setArticles(articles.concat( parsedData.articles )); //concating the previos data/articles with new freshly fetched data/articles
      setTotalResults(parsedData.totalResults);
   };
      return (
         <>
            {/* setting the header for the page to show the headline text  */}
            <h1 className="text-center" style={{ color: 'white', marginTop: '80px' }}>NewsCat - Top {capitalizeFirstLetter(props.category)} Headlines</h1>

            {/* //for loading animation  */}
            { loading && <Spinner />}

            {/* //setting the infinte scroll  */}
            <InfiniteScroll
               dataLength={articles.length}
               next={fetchMoreData}
               hasMore={articles.length !== totalResults}
               loader={<Spinner/>} 
               >

               <div className="container">
                  <div className="row">

                     {/* //iterating through the elements/articles and showing them  */}
                     {articles.map((element) => {
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

export default News;

   // setting the default props if no props is passed 
   News.defaultProps = {
      country: 'in',
      pageSize: 8,
      category: 'general'
   }

   //setting the types of props passing
   News.propTypes = {
      country: PropTypes.string,
      category: PropTypes.string,
      page: PropTypes.number,
   }








//to handle the buttons for going to the next or previouse page
// const handlePrevClick = async () => {
// setPage(page - 1); 
//updateNews();
// }
// const handleNextClick = async () => {
// setPage(page + 1); 
// updateNews();
// }
