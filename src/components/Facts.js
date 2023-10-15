import { useState } from 'react';
// import supabase from '../utils/superbase';

const converterUndefined = (value) => {
    return value ? value : 0;
}

const Facts = ({facts, colors, setFacts}) => {
    const [isUploading, setIsUploading] = useState(false);
    const fl = facts.length;

    const factsCount = (text1, text2) => {
        return fl > 1 ? text1 : text2;
    }
    const HandleVote = async(columnName, id) => {
       setIsUploading(true);
       const filterFact = JSON.parse(localStorage.getItem('facts'));
       const objIndex  = filterFact.findIndex(f => f.id === id);
       const getHits = filterFact[objIndex][columnName];
       filterFact[objIndex][columnName] = getHits + 1;
       
       localStorage.setItem('facts', JSON.stringify(filterFact));

       setFacts(filterFact);
       
       setIsUploading(false);
    }

    if(fl === 0) {
        return (
            <p className="message">No facts for this category! Create one now! ✌️</p>
        )
    }
    return (
        <section>
          <ul className="facts-list">
            {facts && facts.map(item => {
                return (
                    <li className="fact" key={item.id}>
                    <p>{item.text} <a className="source" href={item.source} target="_blank" rel="noreferrer">(Source)</a>
                    </p>
                    <span className="tag" style={{backgroundColor: colors.find(cat => cat.name === item.category).color}}>{item.category}</span>
                    <div className="vote-buttons">
                        <button onClick={()=>HandleVote("voteIntresting", item.id)} disabled={isUploading}>👍 {converterUndefined(item.voteIntresting)}</button>
                        <button onClick={()=>HandleVote("voteMindsBlowing", item.id)} disabled={isUploading}>🤯 {converterUndefined(item.voteMindsBlowing)}</button>
                        <button onClick={()=>HandleVote("voteFalse", item.id)} disabled={isUploading}>⛔️ {converterUndefined(item.voteFalse)}</button>
                    </div>
                    </li>
                )
            })}
          </ul>
          <p>{fl} {factsCount('facts','fact')} available!</p>
        </section>
    )
}
export default Facts;