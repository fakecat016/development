import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {React, useState, useEffect} from "react";
import bakeryData from "./assets/bakery-data.json";
import bakeryItem from "./components/BakeryItem.js"
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

/* ####### DO NOT TOUCH -- this makes the image URLs work ####### */
bakeryData.forEach((item) => {
  item.image = process.env.PUBLIC_URL + "/" + item.image;
});
/* ############################################################## */



function App() {
  // Set states
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [priceSort, setPriceSort] = useState("n");
  const [price, setPrice] = useState("a");
  const [ingredient, setIngredient] = useState("a");

  // Calculate cart total
  useEffect(() => {
    total();
  }, [cart]);

  const total = () => {
    let totalVal = 0;
    for (let i = 0; i < cart.length; i++) {
      totalVal += cart[i].price * cart[i].quantity
    }
    setCartTotal(totalVal.toFixed(2));
  };

  // Add to cart
  const addToCart = (item) => {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].name === item.name) {
        cart[i].quantity += 1;
        return setCart([...cart]);
      }
    }
    return setCart([...cart, { ...item, quantity: 1}]); 
  };

  // Remove from cart
  const removeFromCart = (item) => {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].name === item.name) {
        if (cart[i].quantity === 1) {
          cart.splice(i, 1)
          return setCart([...cart]);
        }
        else {
          cart[i].quantity -= 1;
          return setCart([...cart]);
        }
      }
    }
  }

  // Sort by price helper
  const setPriceSorteventKey = (eventKey) => {
    setPriceSort(eventKey);
  };
  const sortPrice = (item1, item2) => {
    if (priceSort==="l") {
      return item1.price - item2.price;
    } else if (priceSort==="h") {
      return item2.price - item1.price;
    } 
  }

  // Filter by price helper
  const setPriceFilter = (eventKey) => {
    setPrice(eventKey);
  };
  const checkPrice = (item) => {
    if (price==="a") {
      return true;
    } else if (price === "l") {
      if (item.price < 3) {
        return true;
      }
    } else if (price === "m") {
      if (item.price >= 3 && item.price <= 5) {
        return true;
      }
    } else if (price === "h") {
      if (item.price > 5) {
        return true;
      } 
    }
  }

  // Filter by ingredient helper
  const setIngredientFilter = (eventKey) => {
    setIngredient(eventKey);
  };
  const checkIngredient = (item) => {
    if (ingredient==="a") {
      return true;
    } else if (ingredient === "c") {
      if (item.description.includes("chocolate")) {
        return true;
      }
    } else if (ingredient === "s") {
      if (item.description.includes("strawberr")) {
        return true;
      }
    } else if (ingredient === "b") {
      if (item.description.includes("butter")) {
        return true;
      } 
    }
  }

  // Filt and sort
  // const toDisplay = bakeryData.filter(checkPrice).filter(checkIngredient).sort(sortPrice);
  const toDisplay = (data) => {
    if (priceSort === "n") {
      return data.filter(checkPrice).filter(checkIngredient);
    } 
    else {
      return data.filter(checkPrice).filter(checkIngredient).sort(sortPrice);
    }
  } 
  
  return (
    <Container>
      <Row>
        <Container>
            <h1>My Bakery</h1>
          </Container>
      </Row>
      <Row>
        <Col xs={12} md={9}>
          <Container>
            <Row>
              <Navbar>
                <Container>
                  <Navbar.Brand><h2>Menu</h2></Navbar.Brand>
                  <Navbar.Collapse>
                    <Nav className="me-auto">
                      <NavDropdown title="Sort by Price" onSelect={setPriceSorteventKey}>
                        <NavDropdown.Item eventKey="l">low to high</NavDropdown.Item>
                        <NavDropdown.Item eventKey="h">high to low</NavDropdown.Item>
                        <NavDropdown.Item eventKey="n">revert to original</NavDropdown.Item>
                      </NavDropdown>
                      <NavDropdown title="Filter by Price" onSelect={setPriceFilter}>
                        <NavDropdown.Item eventKey="l">below $3</NavDropdown.Item>
                        <NavDropdown.Item eventKey="m">between $3 and $5</NavDropdown.Item>
                        <NavDropdown.Item eventKey="h">above $5</NavDropdown.Item>
                        <NavDropdown.Item eventKey="a">show all</NavDropdown.Item>
                      </NavDropdown>
                      <NavDropdown title="Filter by Ingredient" onSelect={setIngredientFilter}>
                        <NavDropdown.Item eventKey="c">with chocolate</NavDropdown.Item>
                        <NavDropdown.Item eventKey="s">with strawberry</NavDropdown.Item>
                        <NavDropdown.Item eventKey="b">with butter</NavDropdown.Item>
                        <NavDropdown.Item eventKey="a">show all</NavDropdown.Item>
                      </NavDropdown>
                    </Nav>
                  </Navbar.Collapse>
                </Container>
              </Navbar>
            </Row>
            <Row md={3}>
              {toDisplay(bakeryData).map((item, index) => (
                <Col>
                  <div key={index}  className="d-flex flex-column">
                    {bakeryItem(item)} 
                    <Button variant="dark" size="lg" as="input" 
                      type="submit" value="add to cart"
                      onClick={() => addToCart(item)}/>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </Col>

        <Col xs={6} md={3} >
          <Container>
            <Row><h2>Cart</h2> </Row>
            {cart.map((item, index) => (
              <Card style={{ width: '18rem' }} className="d-flex flex-row">
                <Card.Img fluid variant="top" src={item.image} alt={'Photo of ' + item.name} style={{ width: '8rem' }}/>
                <Card.Body>
                  <Row>
                      <Card.Text>
                          <b>{item.name}</b>
                          <br/>
                          <Button variant="dark" size="sm" as="input" type="submit" value="+" onClick={() => addToCart(item)}/>
                          <b> {item.quantity} </b>
                          <Button variant="dark" size="sm" as="input" type="submit" value="-" onClick={() => removeFromCart(item)}/>
                          <br/>
                          <Card.Text><b>${(item.price * item.quantity).toFixed(2)}</b></Card.Text>
                      </Card.Text>
                  </Row>
                </Card.Body>
              </Card>
            ))}
              <div><b>Total: ${cartTotal}</b></div>
          </Container>
        </Col>
        
      </Row>
    </Container>
  );
}

export default App;
