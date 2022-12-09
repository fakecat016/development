import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

export default function bakeryItem(item) {
    return (
      <Card style={{ width: '15.8rem' }}>
        <Card.Img fluid variant="top" src={item.image} alt={'Photo of ' + item.name}/>
        {/* <Card.Body> */}
        <Card.ImgOverlay>
            <Row>
                <Card.Title><b>{item.name}</b></Card.Title>
                <Card.Text>
                    {item.description}
                </Card.Text>
            </Row>
            <Row className="position-absolute bottom-0 end-0">
                <Container><Card.Text><b>${item.price}</b></Card.Text></Container>
            </Row>
        </Card.ImgOverlay>
        {/* <Button as="input" type="submit" value="add to cart" onClick={() => addToCart(item)}/> */}
        {/* <Button variant="light">add to cart</Button> */}
        {/* </Card.Body> */}
      </Card>
    );
  }
  