import { useState } from 'react';
import supabase from '../utils/superbase';

const Facts = ({facts, colors, setFacts}) => {
    const [isUploading, setIsUploading] = useState(false);
    const fl = facts.length;

    const factsCount = (text1, text2) => {
        return fl > 1 ? text1 : text2;
    }
    const HandleVote = async(columnName, id) => {
        setIsUploading(true);

        const {data: updatedFacts, error} = await supabase
            .from("facts")
            .update([{[columnName]: facts.find(item => item.id === id).voteIntresting + 1 }])
            .eq("id", id)
            .select();

        console.log("updatedFacts", updatedFacts, id); 

        if (!error) {
            setFacts((fact) => fact.map(f => f.id === id ? updatedFacts[0] : f));
        }
        setIsUploading(false);
    }

    if(fl === 0) {
        return (
            <p className="message">No facts for this category! Create one now! ✌️</p>
        )
    }

    //console.log("colors", colors);
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
                        <button onClick={()=>HandleVote("voteIntresting", item.id)} disabled={isUploading}>👍 {item.voteIntresting}</button>
                        <button onClick={()=>HandleVote("voteMindsBlowing", item.id)} disabled={isUploading}>🤯 {item.voteMindsBlowing}</button>
                        <button onClick={()=>HandleVote("voteFalse", item.id)} disabled={isUploading}>⛔️ {item.voteFalse}</button>
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