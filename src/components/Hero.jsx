
import logo from "../assets/logo.svg";

const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
       
       <nav className="w-full flex justify-between items-center mb-10 pt-5">
           
           <img src={logo} alt="sumz_logo" className="w-30 object-contain" />

           <button 
              type="button"
              onClick={() =>
                window.open("https://github.com/Sid-hac/SumZ.git", "_blank")} 
              className="black_btn"
          >
             Github
           </button>
           
          

       </nav>
       <h1 className="head_text">
       Summarize Articles with <br className="max-md:hidden"/>
              <span className="orange_gradient"> OpenAI GPT-4</span>
       </h1>
         
         <h2 className="desc">
            simplify your reading experience with summize,An open source article summarizer that transform lengthy articles into clear and concise summaries
         </h2>
       
    </header>
  )
}

export default Hero;