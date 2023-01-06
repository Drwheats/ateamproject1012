import {useEffect} from "react";
import {useState} from "react";
import EnemyPost from "./EnemyPost";

export default function PostPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState({postName: "", postTopic: "", postBody: "", postNumber: 0, postVisibility: true, postReplies: []});
    const [receivedReply, setReceivedReply] = useState();

    const [clientReplyBody, setClientReplyBody] = useState();
    const [clientReplyName, setClientReplyName] = useState("");

    let pageLoc = window.location.pathname.split('/')[2];
    let json_body = JSON.stringify(
        { pageLoc })
    const scoreJSON = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: json_body
    }

    // ALl things REPLIES go here:
    const changeInputNameValue = (event) => {
        setClientReplyName(event.target.value);
        console.log(clientReplyName)
    }
    const changeInputPostBody = (event) => {
        setClientReplyBody(event.target.value);
        console.log(clientReplyBody)
    }
    function submitReply() {
        if (clientReplyName === "") {
            setClientReplyName("anonymous");
        }
        let json_body = JSON.stringify(
            {pageLoc: pageLoc, replyName: clientReplyName, replyBody: clientReplyBody})
        const scoreJSON = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: json_body
        }
        fetch("http://localhost:3001/submitReply", scoreJSON)
            .then(response => response.json()
                .then(setReceivedReply(response)));
    }

    console.log(clientReplyBody);

    // END of all REPLIES THINGS HERE.

    useEffect(() => {
        if (isLoading) {
            fetch("http://localhost:3001/pageInfo", scoreJSON)
                .then(response => response.json())
                .then((
                    result) => {
                    setData(result);
                    setIsLoading(false);

                })
        }
        if (!isLoading) {
            JSON.stringify(data);
            console.log(data.postReplies[0])
        }
        }

    )

    return (

        <div className="postPage">
            <div className="originalPoster">
                <h2 className="postTopic">{data.postTopic}</h2>
                <div className="originalPosterHeader"><h3 className="OriginalPosterNumber">#{data.postNumber}</h3><h3 className="originalPosterName">{data.postName}</h3>

                </div>
            <p className="postText">{data.postBody}</p>
            </div>
        <div className="enemyPosters">
            {data.postReplies.map(s => {
                    return <EnemyPost enemyPostName={s.replyName} enemyPostBody={s.replyBody} enemyPostNumber={s.postNumber}/>
                })}
        </div>
            <div className="submissionForm">
                <label>Name</label><input onChange={changeInputNameValue} type="text" className="nameTextSubmit"/>

                <br/>
                <textarea onChange={changeInputPostBody} className="mainTextSubmit"/>
                <br/>
                <button onClick={submitReply}>REPLY</button>
            </div>

        </div> )}