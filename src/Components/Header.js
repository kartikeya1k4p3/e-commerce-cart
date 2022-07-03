import React,{useEffect, useState} from 'react';
import  Navbar  from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Badge from '@mui/material/Badge';
import Nav from 'react-bootstrap/Nav';
import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem'
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';
import { DLT } from '../Redux/Actions/action';



const Header = () => {


  const getData = useSelector((state)=> state.cartReducer.carts);
  // console.log(getData);


  const [price , setPrice] = useState(0);
  console.log(price);

  const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    }


    const dlt = (id) => {
      dispatch(DLT(id))
    }


    const total = () =>{
      let price = 0;
      getData.map((ele,k) => {
        price = ele.price * ele.qnty + price;
      });
      setPrice(price);
    }

    useEffect(() => {
      total();
    },[total])


  return (
    <>

  <Navbar bg="dark" variant="dark" style={{height: "60px"}}>
    <Container>
    <NavLink to="/" className='text-decoration-none text-light mx-3'><h2>Add to Cart</h2></NavLink>
    <Nav className="me-auto">
      <NavLink to='/home' className='text-decoration-none text-light' >Home</NavLink>
    </Nav>

    <Badge badgeContent={getData.length} color="primary"
       id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
    >
    <i class="fa-solid fa-cart-shopping text-light" style={{fontSize:25, cursor: "pointer"}}></i>

    </Badge>

    </Container>
    <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >

      {
        getData.length ?
        <div className='card_details' style={{width:"24rem", padding:10}}>
        <Table>
          <thead>
            <tr>
              <th>Photo</th>
              <th>Restaurant Name</th>
            </tr>
          </thead>
          <tbody>
            {
              getData.map((e)=>{
                return(
                  <>
                  <tr>
                    <td>
                   <NavLink to={`/cart/${e.id}`} onClick={handleClose} > <img src={e.imgdata} style={{width:"5rem", height:"5rem", position:"relative"}} alt='' /> </NavLink>
                    </td>
                    <td>
                      <p>{e.rname}</p>
                      <p>Price : ₹ {e.price}</p>
                      <p>Quantity : {e.qnty}</p>
                      <p style={{color:"red", fontSize:20, cursor:"pointer"}} onClick={()=>dlt(e.id)}>
                        <i className='fas fa-trash smalltrash'></i>
                      </p>
                    </td>
                    <td className='mt-5' style={{color:"red", fontSize:20, cursor:"pointer"}} onClick={()=>dlt(e.id)}>
                    <i className='fas fa-trash largetrash'></i>
                    </td>
                  </tr>

                </>
                )
              })
            }
              <p className='text-center'>Total : ₹ { price  }</p>

          </tbody>
        </Table>

        </div>:

        
      <div className='card_details d-flex justify-content-center align-items-center' 
      style={{width:"18rem", height:"5rem", padding:"8px", position:"relative"}}>
      <i className='fas fa-close smallclose' 
      onClick={handleClose}
       style={{position:"absolute", top:"-2px", right:"10px", fontSize:"19px", cursor:"pointer"}}></i>
      <p style={{fontSize:22}}>Your Cart is Empty</p>
      <img src='./cart.gif' alt='' className='emptycart_img' style={{width:"5rem",padding:10}} />

      </div>
      }
      </Menu>

  </Navbar>

    </>
  )
}

export default Header;
