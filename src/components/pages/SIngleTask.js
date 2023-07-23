import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import Tasks from '../Tasks/Tasks';

const REACT_APP_URL_API = process.env.REACT_APP_URL_API;


export default function SingleTask() {
    const [taskData, setTaskData] = useState(null);
    const { id } = useParams();

    console.log(useState())


    useEffect(() => {

        fetch(`${REACT_APP_URL_API}/tasks/${id}`, {
            method: 'GET',
        })
            .then(response => {
                if (!response.ok) {
                    throw response.error
                }
                return response.json()
            })
            .then(task => {
                console.log('DDDDDD====>>>>', task);

                setTaskData({
                    ...taskData,
                    ...task
                })

            })
            .catch(error => console.log(error))

    })



    return (


        <>
        {
            taskData &&
            <>
                <h6>{taskData.title}</h6>
                <p>{taskData.description}</p>
                <h5>{taskData.developer}</h5>
                </>
        }


        </>

    )
}