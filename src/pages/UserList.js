import ListItem from "../components/ListItem";
import "./styles/UserList.css";
import { ApiUrls } from "../enviroments/enviroments";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function UserList(props) {
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [fullyLoaded, setFullyLoaded] = useState(false);
  const [error, setError] = useState(null);
  const conteinerRef = useRef(null);
  const size = 20;
  const id = props.id;

  const handleClick = (id) => {
    navigate(`/list/${id}`);
    window.location.reload();
  };

  function handleScroll() {
    const { scrollTop, clientHeight, scrollHeight } = conteinerRef.current;
    if (scrollTop + clientHeight >= scrollHeight && !isLoading && !error) {
      conteinerRef.current.removeEventListener("scroll", handleScroll);
      fetchData();
    }
  };

  useEffect(() => {
    fetchData()
  }, []);

  useEffect(() => {
    if(userList && userList.length) {
      conteinerRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      conteinerRef.current?.removeEventListener("scroll", handleScroll);
    };
    
  }, [userList])

  function fetchData() {
    if(isLoading)
      return;
    setIsLoading(true);

    const url = id ? 
    `${ApiUrls.friends.replace(':userId', id)}/${page}/${size}`
  :  `${ApiUrls.list}/${page}/${size}`
    axios
      .get(url)
      .then(({ data }) => {
        setUserList((prevUserList) => [...prevUserList, ...data.list]);
        const nextPage = data.pagination.nextPage;
        if(nextPage) {
          setPage(nextPage)
        } else {
          setFullyLoaded(true);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }

  return (
      <div className="list-container-content" ref={conteinerRef}>
    <ul className="list-container">
      {!userList?.length ? (
        <p>Sorry, there is nothing to display</p>
      ) : (
        userList.map((listItem) => {
          return (
              <div 
              onClick={() => handleClick(listItem.id)}
              key={listItem.id}
              >
                <ListItem
                  user={listItem}
                />
              </div>
          );
        })
      )}
      {isLoading && <p>Loading more data...</p>}
      {error && <p>{error}</p>}
      {
        isLoading ? <div>Loading</div> : ''
      }
      {
        fullyLoaded ? <div>All data is fetched</div> : ''
      }
    </ul>
      </div>
    
  );
}