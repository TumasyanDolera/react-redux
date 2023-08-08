const REACT_APP_URL_API = process.env.REACT_APP_URL_API;

function PostTodo  (newObj) {
    return  fetch(`${REACT_APP_URL_API}/tasks`, {
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(newObj)
})
    }

     function GetTodo (){
        return  fetch(`${REACT_APP_URL_API}/tasks`, {
            method: 'GET',
        })
     }

     function PutTodo(taskObj){
        return  fetch(`${REACT_APP_URL_API}/tasks/${taskObj.id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(taskObj)
        })
     }
     
     function DeleteTodo(taskId){
        fetch(`${REACT_APP_URL_API}/tasks/${taskId}`, {
            method: 'DELETE',
        });
    }

export {PostTodo, PutTodo, GetTodo, DeleteTodo}