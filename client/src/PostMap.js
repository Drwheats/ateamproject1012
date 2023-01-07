import Post from "./Post";


export default function PostMap({posters}) {
    if (posters.postName === '') {
        posters.postName = "anonymous";
    }
    return (
        <div className="cards">

        {posters.map(s => {
                if (s.postVisibility) {
                    return <Post postName={s.postName} postTopic={s.postTopic} postBody={s.postBody} postNumber={s.postNumber} postVisibility={s.postVisibility} postNumberReplies={s.postReplies.length}/>
                }})}
        </div>

    )
}