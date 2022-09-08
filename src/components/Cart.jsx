import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { CartContext } from './CartContext';
import { WrapperCart, TitleCart, ContentCart, Product, ProductDetail, ImageCart, Details, PriceDetail, ProductAmountContainer, ProductAmount, ProductPrice, Hr } from './styledComponents';
import {serverTimestamp} from 'firebase/firestore'
import FormatNumber from "../utils/FormatNumber";
import styled from "styled-components";
import { createOrderInFirestore, decrementStockInFirestore } from '../utils/firestoreFetch';
import { Dialog, DialogContent, DialogContentText, DialogActions } from "@material-ui/core";
import DoneOutline from '@material-ui/icons/DoneOutline';

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopText = styled.span`
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Info = styled.div`
  flex: 3;
`;


const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Cart = () => {
    const [open, setOpen] = useState(false);
    const test = useContext(CartContext);
    const [newOrderRef, setNewOrderRef] = useState({});
    
    const handleClose = () => {
      setOpen(false);
    };
      
    const handleOpen = () => {
      setOpen(true);
    };

    const createOrder = () => {
      let order = {
        buyer: {
          name: 'John Doe',
          phone: '123456789',
          email: 'johnd@jdgroup.com'
        },
        items: test.cartList.map(item => ({
          id: item.idItem,
          price: item.costItem,
          title: item.nameItem,
          qty: item.qtyItem
        })),
        date: serverTimestamp(),
        total: test.calcTotal()
      }

      createOrderInFirestore(order)
        .then(result => {
          test.cartList.forEach(async (item) => {
            decrementStockInFirestore(item.idItem, item.qtyItem)      
          });
          handleOpen();
          setNewOrderRef(result)
        })
        .catch(error => console.log(error))

      test.removeList();
    }

    return (
        <WrapperCart>
            <TitleCart>YOUR CART</TitleCart>
            <Top>
                <Link to='/'><TopButton>CONTINUE SHOPPING</TopButton></Link>
                {
                    (test.cartList.length > 0)
                    ? <TopButton type="filled" onClick={test.removeList}>DELETE ALL PRODUCTS</TopButton>
                    : <TopText>Your cart is empty</TopText>
                }
            </Top>
            <ContentCart>
            <Bottom>
                <Info>
                    {
                        test.cartList.length > 0 &&
                            test.cartList.map(item => 
                            <Product key={item.idItem}>
                            <ProductDetail>
                                <ImageCart src={item.imgItem} />
                                <Details>
                                <span>
                                    <b>Product:</b> {item.nameItem}
                                </span>
                                <TopButton type="filled" onClick={() => test.deleteItem(item.idItem)}>DELETE</TopButton>
                                </Details>
                            </ProductDetail>
                            <PriceDetail>
                                <ProductAmountContainer>
                                <ProductAmount>{item.qtyItem} item(s)</ProductAmount>
                                /
                                <ProductAmount>$ {item.costItem} each</ProductAmount>
                                </ProductAmountContainer>
                                <ProductPrice>$ {test.calcTotalPerItem(item.idItem)} </ProductPrice>
                            </PriceDetail>
                            </Product>
                            )
                    }
                </Info>
                {
                    test.cartList.length > 0 &&
                        <Summary>
                            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                            <SummaryItem>
                                <SummaryItemText>Subtotal</SummaryItemText>
                                <SummaryItemPrice><FormatNumber number={test.calcSubTotal()} /></SummaryItemPrice>
                            </SummaryItem>
                            <SummaryItem>
                                <SummaryItemText>Taxes</SummaryItemText>
                                <SummaryItemPrice><FormatNumber number={test.calcTaxes()} /></SummaryItemPrice>
                            </SummaryItem>
                            <SummaryItem>
                                <SummaryItemText>Taxes Discount</SummaryItemText>
                                <SummaryItemPrice><FormatNumber number={-test.calcTaxes()} /></SummaryItemPrice>
                            </SummaryItem>
                            <SummaryItem type="total">
                                <SummaryItemText>Total</SummaryItemText>
                                <SummaryItemPrice><FormatNumber number={test.calcTotal()} /></SummaryItemPrice>
                            </SummaryItem>
                            <Button onClick={createOrder}>CHECKOUT NOW</Button>
                        </Summary>
                }
            </Bottom>
            </ContentCart>
            <Dialog
              fullWidth='true'
              maxWidth='sm'
              open={open}
              onClose={handleClose}
            >
               <DialogContent>
                  <DialogContentText>
                          <Summary>
                            <SummaryTitle>
                                <DoneOutline color='success' fontSize='large'/>
                               ORDER GENERATED
                            </SummaryTitle>
                            <SummaryItem>
                                <SummaryItemText>From:</SummaryItemText>
                                <SummaryItemText>Vegges.com SA</SummaryItemText>
                            </SummaryItem> 
                            <SummaryItem>
                                <SummaryItemText>Order Id:</SummaryItemText>
                                <SummaryItemPrice>{newOrderRef.id}</SummaryItemPrice>
                            </SummaryItem>                         
                        </Summary>
                  </DialogContentText> 
              </DialogContent>
              <DialogActions>
                  <Button onClick={handleClose}>Close</Button>
              </DialogActions>             
            </Dialog>
            
        </WrapperCart>
    );
}

export default Cart;