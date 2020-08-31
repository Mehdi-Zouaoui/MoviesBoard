import React, {useEffect, useState} from "react";

function List(props) {

    const [card, setCard] = useState([]);
    useEffect(() => {
        props.array.forEach(film => {
            setCard(film.data)
        });
        console.log(card)
    }, []);

    return (<div className="row " >

        {!props.array.length ? <div>Loading</div> : card.map((item, index) => {
            console.log(item);
            return (

                    <div className="card" key={index} style={{width: "20rem"}}>
                        <img className="card-img-top " src={item.poster} alt="Card image cap"/>
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the
                                bulk of the card's content.</p>
                            <a href="#" className="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>

                    )


        })}

    </div>)
}

export default List
