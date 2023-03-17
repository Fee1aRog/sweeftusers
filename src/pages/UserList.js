import ListItem from "../components/ListItem"
import "./styles/UserList.css"
export default function UserList() {
    const list = [
        {
            "id": 21,
            "name": "Cecelia",
            "lastName": "Gorczany",
            "prefix": "Mr.",
            "title": "Future Optimization Executive",
            "imageUrl": "http://placeimg.com/640/480/animals"
          },
          {
            "id": 22,
            "name": "Zola",
            "lastName": "Auer",
            "prefix": "Miss",
            "title": "Corporate Data Analyst",
            "imageUrl": "http://placeimg.com/640/480/animals"
          },
          {
            "id": 23,
            "name": "Herminia",
            "lastName": "Bergstrom",
            "prefix": "Dr.",
            "title": "Central Configuration Manager",
            "imageUrl": "http://placeimg.com/640/480/animals"
          },
          {
            "id": 24,
            "name": "Roxane",
            "lastName": "Reinger",
            "prefix": "Mrs.",
            "title": "Dynamic Interactions Technician",
            "imageUrl": "http://placeimg.com/640/480/animals"
          },
          {
            "id": 25,
            "name": "Moriah",
            "lastName": "Bernier",
            "prefix": "Mr.",
            "title": "National Brand Agent",
            "imageUrl": "http://placeimg.com/640/480/animals"
          }
    ]
    return(
        <ul className="list-container">
        {!list?.length ? (
          <p>Sorry, there is no barber to display</p>
        ) : (
          list.map((listItem) => (<ListItem user={listItem} key={listItem.id}/>))
        )}
      </ul>
    )
}