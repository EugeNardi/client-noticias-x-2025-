


import { formatISO9075 } from "date-fns"
import {Link} from "react-router-dom"

const Post = ({_id,title,summary,cover,content,createdAt,author,category}) => {
  return (
    <>
    <main>
    <div className="post">
      <div className="image">
        <Link to={`/post/${_id}`}>
        <img src={"https://back-blog-beta.vercel.app/"+cover} alt=""/>
        </Link>
      </div>
      <div className="texts">
      <div className="class"><a href="#">{category}</a></div>
        <Link to={`/post/${_id}`}>
        <h2>{title}</h2>
        </Link>
        <p className="info">
          <a href="#" className="author">{author}</a>
          <time>{formatISO9075(new Date(createdAt))}</time>
        </p>
       <p className="summary">{summary}</p>
      </div>
    </div>
  


    


      
   
   
    </main>
    
    </>
  )
}

export default Post


/**
 
    <div className="post">
      <div className="image">
      <img src="https://techcrunch.com/wp-content/uploads/2023/08/roblox-mobile.jpg?w=730&crop=1" alt="" />
       
      </div>
      <div className='texts'>
      <h2>Roblox faces a new class action lawsuit alleging it facilitates child gambling</h2>
      <p className="info">
          <a href="#" className="author">Taylor Hatmaker</a>
          <time>5:05 PM GMT-3•August 18, 2023</time>
        </p>
      <p>In a new class action lawsuit filed in the Northern District of California this week, two parents accuse Roblox of illegally facilitating child gambling.
         While gambling is not allowed on the platform, which hosts millions of virtual games that cater to children and teens, the lawsuit points to third-party gambling sites that invite users to play blackjack, slots, roulette and other games of chance using Roblox’s in-game currency.
      </p>
      </div>
     
    </div>

    

    <div className="post">
      <div className="image">
      <img src="https://techcrunch.com/wp-content/uploads/2023/08/x-block-blocked.jpg?w=730&crop=1" alt="" />

      </div>
      <div className="texts">
      <h2>Musk says X’s ‘block’ feature is going away</h2>
      <p className="info">
          <a href="#" className="author">Sarah Perez</a>
          <time>4:29 PM GMT-3•August 18, 2023</time>
        </p>
      <p>Part of the X (née Twitter) roadmap? Off-handed reply? Simple attempt to get a rise out of people? Time will tell. The one thing we can say for sure is that X’s owner responded to a post on the platform today foreshadowing the potential removal of the block feature.</p>
      </div>
     
    </div>
 */