
import { useState } from 'react';
import supabase from '../utils/superbase';

const Form = ({cats, setFactsData, setShowForm}) => {
  //console.log(category);
  const [formValue, setFormValue] = useState({
    fact: "",
    source: "",
    category: ""
  });
  const textLength = formValue.fact.length;
  const {fact, source, category} = formValue;
  const [formError, setFormError] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const formHandler = (e) => {
    //console.log(e.target.value, e.target.name);
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fact && !source && !category) {
      return setFormError("Please enter data");
    }
    if (!fact) {
      return setFormError("Please enter fact text");
    }
    if (textLength > 200) { 
      return setFormError("Please enter fact within 200 words only");
    }
    if (!source) {
      return setFormError("Please enter Source");
    } 
    if (!/^(http|https):\/\/[^ "]+$/.test(source)) {
      return setFormError("Please enter valid source url");
    }
    if (!category) {
      return setFormError("Please select a category");
    } 
    setFormError("");

    setIsUploading(true);
    const {data: newFacts, error} = await supabase
      .from("facts")
      .insert([{text: fact, source, category}])
      .select();

    if (error) {
      setFormError(error.message);
    } else {
      setFactsData((facts) => [newFacts[0], ...facts]);
    } 


    setFormValue({
      fact: "",
      source: "",
      category: ""
    });
    setIsUploading(false);
    setShowForm(false);
    //console.log(enteredData);

  };

  return (
      <form className="fact-form" onSubmit={handleSubmit}>
          <input type="text" name="fact" value={fact} onChange={formHandler} placeholder="Share a fact with the world..." disabled={isUploading} />
          <span className='counter'>{200 - textLength}</span>
          <input type="text" name="source" value={source} onChange={formHandler} placeholder="Trustworthy source..." disabled={isUploading} />
          <select name="category" value={category} onChange={formHandler} disabled={isUploading}>
            <option value="">Choose category:</option>
            {cats.map(cat => <option key={cat.name} value={cat.name}>{cat.name.toUpperCase()}</option>)}
          </select>
          {formError && <span className='errors'>{formError}</span>}
          <button className="btn btn-large" disabled={isUploading}>{isUploading ? 'Uploaind...' : 'Post'}</button>
    </form>
  )
}
export default Form;