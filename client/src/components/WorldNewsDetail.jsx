import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NewsList.css'; // Import a CSS file for styling (if needed)
import { Link, useParams } from 'react-router-dom';


function WorldNewsDetail (){
    let { id } = useParams();

    const [article, setArticle] = useState({});
    const [loading, setLoading] = useState(false)


    useEffect(() => {
      const fetchData = async () => {
        try {
            setLoading(true)
          const response = await axios.get('https://api.nytimes.com/svc/search/v2/articlesearch.json?q=world-news&api-key=n0L4wORyKDAUUGU0ypXFt47mNTMLptYV');
          const responseDocs = response.data.response.docs
          
          const responseDocsById = responseDocs.find((el)=>{
                if(el._id === `nyt://article/${id}`){
                    return (true)
                }
          })
          setArticle(responseDocsById);
             //console.log(response.data.response.docs);
             console.log(responseDocsById, "docs by ID")
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false)
        }
    };
    
    fetchData();
}, []);
console.log(article?.multimedia, "<<<")
// console.log(article?.multimedia[0]?.url,"<<<<<")
  
console.log(article, "????")
  
    return (
      <div className="article-container">
    
        <h1>World News In Details</h1>
        <div className="card-container">
         

            <div className="card">
                {loading ? "loading...": <>
              <h2>{article?.headline?.main}</h2>
              <img src={
                
                article?.multimedia && (article?.multimedia[0] ? 
              
                "https://static01.nyt.com/" + article?.multimedia[0]?.url : 
  
                "https://www.telegraph.co.uk/content/dam/world-news/2024/02/12/TELEMMGLPICT000366236201_17077625115270_trans_NvBQzQNjv4BqF4WwDpbO-CkdHTTCi9TWzkikPYR0xYwuEBLwP9UFqPg.jpeg?imwidth=480"
  
    )} alt="Ini Gambar GG" style={{width:'100%'}} />
              <p>{article.snippet}</p>
                <Link to={`${article.web_url}`}target="_blank">Read Article on The New York Times</Link>


              </>}
            </div>
      
        </div>
      </div>
    );








}

export default WorldNewsDetail