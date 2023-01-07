import {Link} from "react-router-dom";

export default function Post({postName, postTopic, postBody, postNumber, postVisibility, postNumberReplies}) {

    // this is how we are going to map the post to the page. Further bulletics events etc
    // const path = location.pathname.split("/")[2];
    // const social = socials.find(p=>p.id.toString() === path)


    return (

        <a className="postHolder" href={"/post/" + postNumber}>
        {/*<img src="img_avatar.png" alt="Avatar" style="width:100%">*/}
            <h5 className="postHeader">#{postNumber} {postName} <h2 className="postTopic">{postTopic} </h2> <h4 className="replies">Replies: {postNumberReplies}</h4>
            </h5>

            <p className="postText">{postBody}</p>

        </a>
)
}