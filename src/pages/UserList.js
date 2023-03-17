import ListItem from "../components/ListItem"
import "./styles/UserList.css"
import {ApiUrls} from "../enviroments/enviroments";
import { useEffect, useState, useRef, useCallback } from "react";
import  axios  from "axios";
export default function UserList() {
    const [userList, setUserList] = useState([]);
    const [userParams, setUserParams] = useState({
        page: 1,
        size: 20
      });
    // const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if(!userList.length)
            loadMoreData();
    }, []);
  
    function fetchData() {
      axios.get(`${ApiUrls.list}/${userParams.page}/${userParams.size}`)
        .then(({ data }) => {
          setUserList(prevUserList => [...prevUserList, ...data.list]);
          setUserParams(prevParams => ({
            ...prevParams,
            page: data.pagination.nextPage
          }));
            
          setIsLoading(false);
        })
        .catch(error => {
          setError(error.message);
          setIsLoading(false);
        });
    }
  
    function loadMoreData() {
      if (isLoading || error) {
        return;
      }
  
      setIsLoading(true);
      fetchData();
    }
  
    return (
      <ul
        className="list-container"
      >
        {!userList?.length ? (
          <p>Sorry, there is no barber to display</p>
        ) : (
            userList.map((listItem, index) => {

                return (<ListItem user={listItem} key={listItem.id}/>)
            })
        )}
        {isLoading && <p>Loading more data...</p>}
        {error && <p>{error}</p>}
      </ul>
    );













    // const [userList, setUserList] = useState(null);
    // const [userParams, setUserParams] = useState({
    //     page: 1,
    //     size: 50
    //   });
    // function fetchData(url) {
    //     return axios.get(url)
    //   }
    // useEffect(() => {
    //     fetchData(`${ApiUrls.list}/${userParams.page}/${userParams.size}`)
    //     .then(({ data }) => {
    //         setUserList(data.list)
    //     })

    // }, []);
    // const list = [
    //     {
    //         "id": 21,
    //         "name": "Cecelia",
    //         "lastName": "Gorczany",
    //         "prefix": "Mr.",
    //         "title": "Future Optimization Executive",
    //         "imageUrl": "http://placeimg.com/640/480/animals"
    //       },
    //       {
    //         "id": 22,
    //         "name": "Zola",
    //         "lastName": "Auer",
    //         "prefix": "Miss",
    //         "title": "Corporate Data Analyst",
    //         "imageUrl": "http://placeimg.com/640/480/animals"
    //       },
    //       {
    //         "id": 23,
    //         "name": "Herminia",
    //         "lastName": "Bergstrom",
    //         "prefix": "Dr.",
    //         "title": "Central Configuration Manager",
    //         "imageUrl": "http://placeimg.com/640/480/animals"
    //       },
    //       {
    //         "id": 24,
    //         "name": "Roxane",
    //         "lastName": "Reinger",
    //         "prefix": "Mrs.",
    //         "title": "Dynamic Interactions Technician",
    //         "imageUrl": "http://placeimg.com/640/480/animals"
    //       },
    //       {
    //         "id": 25,
    //         "name": "Moriah",
    //         "lastName": "Bernier",
    //         "prefix": "Mr.",
    //         "title": "National Brand Agent",
    //         "imageUrl": "http://placeimg.com/640/480/animals"
    //       }
    // ]
    // return(
    //     <ul className="list-container">
    //     {!userList?.length ? (
    //       <p>Sorry, there is no barber to display</p>
    //     ) : (
    //       userList.map((listItem) => (<ListItem user={listItem} key={listItem.id}/>))
    //     )}
    //   </ul>
    // )
}