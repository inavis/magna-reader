import { Fragment } from "react";

export function Button({text,id,setter}){

    function getBookDetails(bookid){
        fetch(`http://18.177.140.79:8080/books/${bookid}/`)
        .then((response) => response.json())
        .then((data) =>{
            console.log(data);
        })
        .catch((err)=>console.log(err));

        fetch(`http://18.177.140.79:8080/chapters/1/`)
        .then((response) => response.json())
        .then((data) =>{
            console.log(data);
        })
        .catch((err)=>console.log(err));

    }

    return(
        <Fragment>
            <button onClick={()=>{
                getBookDetails(id);
                setter(id);
            }}>{text}</button>
        </Fragment>
    )
}