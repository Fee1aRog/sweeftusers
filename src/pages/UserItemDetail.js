import { useParams} from "react-router-dom";
import './styles/UserItemDetail.css';
import axios from 'axios';
import { useEffect, useState } from "react";
import { ApiUrls } from "../enviroments/enviroments";
import UserList from "./UserList";
export function UserItemDetail() {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(null);
    const [details, setDetails] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
             if(id) {
                setIsLoading(true);
            axios.get(ApiUrls.details.replace(':id', id))
            .then(({data}) => {
                setDetails(data)
            })
            .catch((err) => setError(err))
            .finally(() => setIsLoading(false))
            
        }
    }, [])

    return (
    <div className="maindiv"> 
        {
            isLoading && !details && !error ? <p>Loading...</p> : ''
        }
        {
            details ? 
            <div className="chldiv">
                <div
                className="image"
                style={{ 
                  backgroundImage: `url(${details.imageUrl})`,
                  backgroundSize: '200px',
                  backgroundPosition: 'relative'
                }}
              ></div>
            <fieldset className="info-container">
                <legend>Info</legend>
                <p className="str">{`${details.prefix} ${details.name} ${details.lastName}`}</p>
                <p>{details.title}</p>
                <p><span>Email: </span>{details.email}</p>
                <p><span>Ip address: </span>{details.ip}</p>
                <p><span>Ip address: </span>{details.ip}</p>
                <p><span>Job area: </span>{details.jobArea}</p>
                <p><span>Job type: </span>{details.jobType}</p>
            </fieldset>
        
            <fieldset className="address-container">
                <legend>Address</legend>
                <p className="str">{`${details.company.name} ${details.company.suffix}`}</p>
                <p><span>City: </span>{details.address.city}</p>
                <p><span>Country: </span>{details.address.country}</p>
                <p><span>State: </span>{details.address.state}</p>
                <p><span>Street address: </span>{details.address.streetAddress}</p>
                <p><span>ZIP: </span>{details.address.zipCode}</p>
            </fieldset></div> : ''
        }
        {
            error ? <p>Error occurred</p> : ''
        }
         <hr />
         <UserList id={id}/>
    </div>

    )
}