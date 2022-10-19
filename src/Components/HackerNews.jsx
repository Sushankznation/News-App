import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Heading from "../Assets/heading.jpg";
import "./styles.css";
function HackerNews() {
  const [show, setShow] = useState([]);
  const [query, setQuery] = useState("React");
  const [Loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const searchInputRef = useRef();
  // using useRef so that if user click on clear
  //then his cursor should automatically focus on input Area
  const response = axios.get(
    `https://hn.algolia.com/api/v1/search?query=${query}`
  );

  useEffect(() => {
    results();
  }, []);
  // [query]);
  //passing query in above array because we are calling our function
  //Show results
  const results = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://hn.algolia.com/api/v1/search?query=${query}`
      );
      setShow(response.data.hits);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };
  //Clear Input Field
  const ClearHnadler = () => {
    setQuery("");
    //if I click on clear button then it will
    //Focus on input field immediately
    searchInputRef.current.focus();
  };
  //On Enter Handler
  const submitHandler = (event) => {
    event.preventDefault();
    results();
  };
  // Delete Items
  const deleteHandler = (index) => {
    const newArr = [...show];
    newArr.splice(index, 1);
    setShow(newArr);
  };
  return (
    <div className="container">
      <h1>
        <img src={Heading} alt="Loading..." />
      </h1>
      <form onSubmit={submitHandler}>
        <input
          required
          type="text"
          ref={searchInputRef}
          value={query}
          placeholder="search"
          onChange={(event) => setQuery(event.target.value)}
        />
        <button type="submit">Search</button>
        <button type="button" onClick={ClearHnadler}>
          clear
        </button>
        <h4>
          <i> Results: </i> {query}{" "}
        </h4>
      </form>
      {Loading ? (
        <img
          src="https://thumbs.gfycat.com/OffensiveUnitedChanticleer-max-1mb.gif"
          alt="Loading..."
        />
      ) : (
        <ul>
          {show.map((val, index) => (
            <li key={val.objectID}>
              <a>{val.title} </a>
              <br />
              <button className="link_btn">
                <a href={val.url} target="_blank">
                  Read More
                </a>
              </button>
              <button
                className="del_btn"
                onClick={() => {
                  deleteHandler(index);
                }}
              >
                <i className="fa fa-trash-o"></i>
              </button>
            </li>
          ))}
        </ul>
      )}
      {/* if it fail to fetch the data  */}
      {error && <div>{error.message}</div>}
    </div>
  );
}
export default HackerNews;