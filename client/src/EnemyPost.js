export default function EnemyPost({enemyPostName, enemyPostBody, enemyPostNumber}) {

    return (
        <div className="enemyPostHolder">
                <div className="enemyPostHeader">
                    <h6 className="enemyPostNumber">#{enemyPostNumber}</h6><h5 className="enemyPostName">{enemyPostName}</h5>
                </div>
                <p className="enemyPostText">{enemyPostBody}</p>


        </div>
)
}