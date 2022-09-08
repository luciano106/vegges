import Item from "./Item";
import { ProductsContainer } from './styledComponents';

const ItemList = ({ items }) => {
    return (
        <ProductsContainer>
        {
            items.length > 0
            ? items.map(item => <Item key={item.id} id={item.id} title={item.name} price={item.cost} pictureUrl={item.img} stock={item.stock} />)
            : <p>Loading...</p>
        }
        </ProductsContainer>
    );
}

export default ItemList;