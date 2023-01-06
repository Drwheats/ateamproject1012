import {Link} from "react-router-dom";

export default function Post({postName, postTopic, postBody, postNumber, postVisibility}) {

    // this is how we are going to map the post to the page. Further bulletics events etc
    // const path = location.pathname.split("/")[2];
    // const social = socials.find(p=>p.id.toString() === path)


    return (

        <div className="postHolder">
            <Link to={"/post/" + postNumber}></Link>
        {/*<img src="img_avatar.png" alt="Avatar" style="width:100%">*/}
            <div className="container">
                <h6 className="postNumber">#{postNumber}</h6><h5 className="postName">{postName}</h5>
            </div>
            <a href={"/post/" + postNumber} className="postTopic">{postTopic}</a>

            <p className="postText">{postBody}</p>

        </div>
)
}