import { AppBar } from "@material-ui/core";
import { Link } from "react-router-dom";
import CartWidget from "./CartWidget";
import { Wrapper, Logo, MenuItem, Left, Center, Right } from './styledComponents';

const NavBar = () => {
    return (
        <AppBar position="relative" style={{ background: '#2e7d32' }}>
            <Wrapper>
                <Left>
                    <Link to='/' style={{textDecoration: "none", color: "white"}}>
                        <img
                            src="/vegetables-15434.png"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt=""
                        />      
                        <span style={{"color":"white", "fontWeight":"bold", "fontSize":"30px"}}>  vegges.com</span>                              
                    </Link>
                </Left>
                <Center>
                    <Link to='/category/XaFF9WpZGZqH5DcbkX9z' style={{textDecoration: "none", color: "white"}}><MenuItem>Vegetables</MenuItem></Link>
                    <Link to='/category/JHiKuA0nf6GSBfLe8T5y' style={{textDecoration: "none", color: "white"}}><MenuItem>Fruits</MenuItem></Link>
                    <Link to='/category/O5SCG0fePdERKMD2e7dx' style={{textDecoration: "none", color: "white"}}><MenuItem>Juices</MenuItem></Link>                    
                </Center>
                <Right>
                    <MenuItem>REGISTER</MenuItem>
                    <MenuItem>SIGN IN</MenuItem>
                    <MenuItem><Link to='/cart' style={{textDecoration: "none", color: "white"}}><CartWidget /></Link></MenuItem>
                </Right>
            </Wrapper>
        </AppBar>
    );
}

export default NavBar;