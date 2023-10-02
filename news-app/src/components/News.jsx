import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Spinner from "./Spinner";
import Newspage from "./Newspage"
import InfiniteScroll from 'react-infinite-scroll-component';


export default function News(props) {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const upDateNews = async () =>{
        props.setProgress(15);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pagesize=${props.pagesize}`;
        setLoading({ loading: true });
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json();
        props.setProgress(75);
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100);

    }
    useEffect(() => {
      upDateNews();
      document.title = `News - ${capitalizeFLetter(props.category)}`;
    },)
    const fetchMoreData = async () =>{
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=4cfe1b01def148e2a3a315e0dad3bdbf&page=${page+1}&pagesize=${props.pagesize}`;
        setPage(page+1)
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
        setLoading(false)
    }
    let capitalizeFLetter = (string) =>{
        return string[0].toUpperCase() + string.slice(1);
      }

    

    
    
  return (
    <>
    <div className="container my-3">
        <h1 className="text-center fs-2 mt-[90px]">
          News - Top {capitalizeFLetter(props.category)} Headlines
        </h1>
        {loading && <Spinner/>}
        
        <div className="container infiniteScroll my-3">
        <InfiniteScroll dataLength={articles.length} next={fetchMoreData} hasMore={articles.length !== totalResults} loader={<Spinner/>}>
        <div className="container">
          <div className="row">
              {articles.map((e) => {
                return (
                  <div className="col-lg-3 col-md-6 col-sm-12" key={e.url}>
                    <Newspage
                      title={e.title ? e.title : ""}
                      description={e.description ? e.description : " "}
                      imageUrl={e.urlToImage}
                      newsUrl={e.url}
                      author={!e.author ? "unknown" : e.author}
                      publishedAt={e.publishedAt}
                      source={e.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          </InfiniteScroll>
          </div>
        </div>
    </>
  )
}
News.defaultProps = {
    country: "in",
    pagesize: "12",
    category: "general",
  };
News.propTypes = {
    country: PropTypes.string,
    pagesize: PropTypes.number,
    category: PropTypes.string,
  };
