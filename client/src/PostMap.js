import Post from "./Post";


export default function PostMap({posters}) {
    return (
        <div className="cards">

        {posters.map(s => {
                if (s.postVisibility) {
                    return <Post postName={s.postName} postTopic={s.postTopic} postBody={s.postBody} postNumber={s.postNumber} postVisibility={s.postVisibility}/>
                }})}
        </div>

    )
}