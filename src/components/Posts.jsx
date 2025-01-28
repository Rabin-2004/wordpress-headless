import { useState,useEffect } from "react"

const Posts = () => {
    const [postData, setPostData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('https://public-api.wordpress.com/wp/v2/sites/rabin99.wordpress.com/posts')
        .then ((response) => response.json())
        .then ((data) => {
            setPostData(data);
            setLoading(false);
        })
        .catch((err)=>{
            setError(err);
            setLoading(false);
        })
    },[])

    if (loading) {
        return <div> Loading...</div>
    }

    if (error){
        return <p> Error loading page data: {error.message}</p>
    }

  return (
    <>
    <h1>Blog Posts </h1>
    {postData.map((post)=>(
        <div key={post.id}>
            <h2>{post.title.rendered}</h2>
            <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
        </div>
    ))}
    </>
  )
}

export default Posts