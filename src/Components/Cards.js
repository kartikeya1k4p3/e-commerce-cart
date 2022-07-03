import { Button, Card } from "react-bootstrap";
import React, { useState } from "react";
import Cardsdata from "./CardsData";
import './Style.css';
import { useDispatch } from "react-redux";
import { ADD } from "../Redux/Actions/action";

const Cards = () => {
  const [data, setdata] = useState(Cardsdata);
  // console.log(data);


  const dispatch = useDispatch();

  const send = (e) => {
  //  console.log(e)
   dispatch(ADD(e));

  }

  return (
    <div className="container mt-3">
      <h1 className="text-center">Add to Cart Project</h1>

      <div className="row d-flex justify-content-center align-items-center">
        {data.map((element, id) => {
          return (
            <>
              <Card style={{ width: "22rem", border:"none" }} className= "mx-2 mt-4 card_style" >
                <Card.Img variant="top" src={element.imgdata} style={{height: "16rem"}} className='mt-3' />
                <Card.Body>
                  <Card.Title style={{textAlign:"initial"}} > {element.rname} </Card.Title>
                  <Card.Text style={{textAlign:"initial"}} >
                   Price : ₹ {element.price}
                  </Card.Text>

                  <div className="button_div d-flex justify-content-center" >
                  <Button variant="primary" onClick={()=> send(element)} 
                  className="col-12">Add to Cart</Button>
                  </div>

                </Card.Body>
              </Card>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Cards;
