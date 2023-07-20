import Form from "./components/Form";
import Header from "./components/Header";
import "./style.css"
import Category from './components/Categories';
import Facts from "./components/Facts";
import { useEffect, useState, memo } from "react";
import supabase from './utils/superbase';

const CATEGORIES = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
];


function App() {
  const [showForm, setShowForm] = useState(false);
  const [factsData, setFactsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [currentCategory, setCurrentcatory] = useState("all");

  
  useEffect(() => {
    console.log(currentCategory);
    setIsLoading(true);
    async function getFacts() {

      let query = supabase.from('facts').select('*');

      if (currentCategory !== 'all') {
        query = query.eq('category', currentCategory)
      } 

      const { data: facts, error } = await query
        .order("voteIntresting", {ascending: false})
        .limit(1000);
      //console.log(facts);
      if (error) {
        setApiError(error.message);
      } else {
        setFactsData(facts);
      }
      //console.log(facts, error);
      setIsLoading(false);
    }
    getFacts();
  }, [currentCategory]);

  const formHandler = () => {
    setShowForm((show) => !show);
  };
  const currentCtegoryData = (data) => {
    //setCurrentcatory("=-=-=-=", data);
    setCurrentcatory(data);
  };

  return (
    <>
      <Header isFormVisible={showForm} showFormHandler={formHandler} />
      {showForm && <Form cats={CATEGORIES} facts={factsData} setFactsData={setFactsData} setShowForm={setShowForm} />} 
      <main className="main">
          <Category category={CATEGORIES} currentCtegoryHandler={currentCtegoryData} />
          {isLoading && <p className="message">Loading...</p> }
          {apiError && <p style={{textAlign: 'center'}}>{apiError}</p> }
          {!isLoading && !apiError && <Facts facts={factsData} setFacts={setFactsData} colors={CATEGORIES} />}
      </main>
    </>
  );
}

export default memo(App);
