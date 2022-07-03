import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DLT, ADD, REMOVE } from '../Redux/Actions/action';


const CardsDetails = () => {

  const [data,setData] = useState([]);
  // console.log(data);


  const dispatch = useDispatch();
  const history = useNavigate();


  const {id} = useParams();
  
  const getData = useSelector((state)=> state.cartReducer.carts);
  // console.log(getData);

  const compare = () => {
    var comparedata = getData.filter((e) =>{
      return (e.id == id)
      })
  setData(comparedata);

  }


  useEffect(() => {
    compare();
  },[id])


  // Add data


  const send = (e) => {
    //  console.log(e)
     dispatch(ADD(e));
  }

  const dlt = (id) => {
    dispatch(DLT(id));
    history('/');
  }

  // Remove data

  const remove = (items) => {
    dispatch(REMOVE(items))
  }

  return (
    <>
      <div className='container mt-2'>
      <h2 className='text-center'>Items Details Page</h2>

      <section className='container mt-3'>
      <div className='itemsdetails'>
      {
        data.map((ele)=>{
          console.log(ele)
          return (
            <>

            <div className='items_img'>
        <img src={ele.imgdata} alt='' />
        </div>

        <div className='details'>
          <Table>
            <tr>
              <td>
                <p> <strong>Restaurant : </strong> {ele.rname} </p>
                <p> <strong>Price : </strong> ₹ {ele.price} </p>
                <p> <strong>Dishes : </strong> {ele.address} </p>
                <p> <strong>Total : </strong>  ₹ {ele.price * ele.qnty} </p>
                <div className='mt-5 d-flex justify-content-between align-items-center' style={{width:100, cursor:"pointer", background:"#ddd", color: "#111", border:"none", borderRadius:"8px"}}>
                <span style={{fontSize:24}} onClick={ele.qnty <= 1 ? ()=> dlt(ele.id) : () =>remove(ele)}>-</span>
                <span style={{fontSize:22}}> {ele.qnty} </span>
                <span style={{fontSize:24}} onClick={()=>send(ele)}>+</span>

                </div>
              </td>
              <td>
              <p> <strong>Rating :</strong> <span style={{background:"green", color:"white", padding:"2px 5px", borderRadius:"5px"}}>{ele.rating} ★	</span> </p>
              <p> <strong>Order Review :</strong> <span> {ele.somedata} </span> </p>
              <p> <strong>Remove :</strong> <span> <i className='fas fa-trash' style={{color:"red", fontSize:20, cursor:"pointer"}} onClick={()=>dlt(ele.id)} ></i> </span> </p>

              </td>
            </tr>
          </Table>
        </div>
      
            </>
          )
        })
      }
</div>
      </section>

      </div>
    </>
  )
}

export default CardsDetails;
