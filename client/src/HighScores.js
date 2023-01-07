import {useEffect, useState} from "react";
import PostMap from "./PostMap";

export default function HighScores() {

    const [data, setData] = useState(true);
    const [allPosts, setAllPosts] = useState([]);
    const [nameToSubmit, setNameToSubmit] = useState('anonymous');
    const [topic, setTopic] = useState('No Topic');
    const [postBody, setPostBody] = useState();
    const [searchPoster, setSearchPoster] = useState("");

    useEffect(() => {
            if (data) {
                fetch("http://localhost:3001/api")
                .then(res => res.json())
                .then(
                    (result) => {
                        console.log('successfully fetched data.')
                        setAllPosts(result);
                        setData(false);
                    }

                )}


        // API for our express server, located in the node folder.

    }, [data, allPosts])
    const changeInputNameValue = (event) => {
        setNameToSubmit(event.target.value);
    }
    // const scoreBoardMap = allPosts.map(s => <Post postName={s.postName} postTopic={s.postTopic} postBody={s.postBody} postNumber={s.postNumber} postVisibility={true}/>);
    const changeInputTopicValue = (event) => {
        setTopic(event.target.value);
    }

    const changeInputPostBody = (event) => {
        setPostBody(event.target.value);
    }

    const changeSearchPoster = (event) => {
        setSearchPoster(event.target.value);
    }

    useEffect(() => {
        //|| searchPoster !== "<empty string>")
        if (searchPoster !== "" ){
            for (let i = 0; i < allPosts.length; i++) {
                if (!allPosts[i].postName.toLowerCase().includes(searchPoster.toLowerCase())) {
                    allPosts[i].postVisibility = false;
                    setData(true);
                }
                else {allPosts[i].postVisibility = true}
            }
        }
        else {
            for (let i = 0; i < allPosts.length; i++)
            {allPosts[i].postVisibility = true}
            setData(true);

        }
        setData(false);


    })

    function submitScore() {
        setData(false);
        if (nameToSubmit === '') {
            // I don't know why this is, but it is. Can
            setNameToSubmit("anonymous");
        }
        let json_body = JSON.stringify(
            { postName: nameToSubmit, postTopic: topic, postBody: postBody, postVisibility: true})
        const scoreJSON = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: json_body
        }
        fetch("http://localhost:3001/submit", scoreJSON)
            .then(response => response.json());
        setData(true);

        setData(true);
    }

    function clearFilters() {
        for (let i = 0; i < allPosts.length; i++) {
                allPosts[i].postVisibility = true;
                setData(true)
            }
        setSearchPoster("");
        document.getElementById("searchBarPoster").target.value = "";
        }

    return (
        <div className="mainPostPage">
            <div className="toolContainer">
                <div className="searchBar">
                    <h3>Find Posts</h3>
                    <div>
                        <label>Name:   </label><input type="text" className="searchBarPoster" onChange={changeSearchPoster}/>
                    </div>
                    <div>
                        <label>Topic:   </label><input type="text" className="searchBarTopic"/>
                    </div>
                    <div>
                        <label>Content: </label><input type="text" className="searchBarContent"/>
                    </div>
                        <button className="clearButton" onClick={clearFilters}>CLEAR ALL FILTERS</button>

                </div>
                <div className="submissionForm">
                    <label>Name</label><input onChange={changeInputNameValue} type="text" className="nameTextSubmit"/>
                    <label>Topic</label><input type="text" onChange={changeInputTopicValue} className="topicTextSubmit"/>
                    <br/>
                    <textarea onChange={changeInputPostBody} className="mainTextSubmit"/>
                    <br/>
                    <button onClick={submitScore}>SUBMIT</button>
                </div>

            </div>


    <div className="leaderboard" id="leaderboard">
         <h5>High Scores:</h5>
         <div className='posts' id='posts'>
                 <PostMap posters={allPosts} className="postMap"/>
         </div>
        </div>
        </div>
    )

}