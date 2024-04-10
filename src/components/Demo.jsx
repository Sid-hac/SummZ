
import { useState , useEffect } from "react";

import { copy , linkIcon , loader , tick } from "../assets";
import arrow from "../assets/arrow.png";

import {useLazyGetSummaryQuery} from "../services/article"

const Demo = () => {
      
      const [article , setArticle] = useState({
        url:"",
        summary:""
      });

      const [getSummary , {error , isFetching}] = useLazyGetSummaryQuery();
      const [allArticles , setAllArticles] = useState([]);
      const [copied , setCopied] = useState("");

      useEffect(() => {
           
        const articlesFromLocalStorage = JSON.parse(localStorage.getItem('articles'));

        if(articlesFromLocalStorage){
          setAllArticles(articlesFromLocalStorage);
        }
      }, [])

      const handleSubmit = async (e) =>{

        e.preventDefault();
        const {data} = await getSummary({articleUrl : article.url});

        if(data?.summary){
          const newArticle = {
         ...article,
            summary:data.summary
          }
          const updatedAllArticles = [newArticle , ...allArticles];

          setArticle(newArticle);
          setAllArticles(updatedAllArticles);
  
          localStorage.setItem('articles', JSON.stringify(updatedAllArticles));
          
        }
        
      }

      const handleCopy = (copyUrl) => {
                
        setCopied(copyUrl);
        navigator.clipboard.writeText(copyUrl);

        setTimeout(() => {
            setCopied(false)
        }, 3000);
      }


  return (
    
      <section className="mt-16 w-full max-w-xl">
         
         <div className="flex flex-col w-full gap-2">
              
              <form  className="relative flex justify-center items-center" onSubmit={handleSubmit}>

                <img src={linkIcon} alt="link_icon" className="absolute left-0 my-2 ml-2 w-5" />

                 <input type="url" value={article.url} placeholder="Paste a URL" onChange={(e) => setArticle({ ...article, url: e.target.value })} required className="url_input peer" />

                 <button type="submit" className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700">
                   <img src={arrow} alt="submit_img" className="w-6 object-contain" />
                 </button>
              </form>

              {/* browse history */}
              <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
                {allArticles.map((item , index) => (
                  <div key={`link-${index}`} onClick={() => setArticle(item)} className="link_card">
                      
                      <div className="copy_btn" onClick={() => {handleCopy(item.url)}}>
                        <img src={copied === item.url ? tick : copy} alt="copy_icon" className="w-3 h-3 object-contain" />
                      </div>
                      <p className="text-sm font-satoshi text-blue-700 truncate">{item.url}</p>

                  </div>
                ))}
              </div>
         </div>
             
             {/* show results */}
             
               <div className="my-10 max-w-full flex justify-center items-center">
                    { isFetching ? (
                          <img src={loader} alt="loader" className="w-10 h-10 object-contain" />
                    ) : error ? (
                        <p className="font-inter font-bold text-black text-center">Well , that wasn&apos;t supposed to happen....
                        <br />
                        <span className="font-satoshi font-normal text-gray-700">{error?.data?.error}</span>
                        </p>
                    ) : (article.summary && (
                        <div className="flex flex-col gap-4">
                          <h2 className="font-bold font-satoshi text-xl text-gray-700">
                                Article <span className="blue_gradient">Summary</span>
                          </h2>
                          <div className="summary_box">
                              <p className="font-inter font-medium text-sm text-gray-700">{article.summary}</p>
                          </div>
                      </div>
                    ))}
               </div>
               
      </section>
                
  
) }
export default Demo;