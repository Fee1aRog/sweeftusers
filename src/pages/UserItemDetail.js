import { useParams} from "react-router-dom";
import './styles/UserItemDetail.css';
import axios from 'axios';
import { useEffect, useState } from "react";
import { ApiUrls } from "../enviroments/enviroments";
export function UserItemDetail() {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(null);
    const [details, setDetails] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log(id)
        
        if(id) {
            axios.get(ApiUrls.details.replace(':id', id))
            .then(({data}) => {
                setDetails(data)
            })
            .catch((err) => setError(err))
            .finally(() => setIsLoading(false))
        }
    }, [])

    return (
    <div> 
        {
            isLoading ? <p>Loading...</p> : ''
        }
        {
            details ? 
            <div className="detail-container">
                <p>{details.title}</p>
                
            </div> : ''
        }
        {
            error ? <p>Error occurred</p> : ''
        }
         
    </div>
    )
}