import React, { useEffect } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { connect } from 'react-redux';
import { getItems } from '../actions/itemActions';
import Proptypes from 'prop-types';

function ShoppingList(props) {
  useEffect(() => {
    props.getItems(); //Dispatches action to get items from db
  }, [])
  const { items } = props.item;

  return (
    <Container>
      <Button
        color="dark"
        style={{ marginBottom: '2rem' }}
        onClick={() => {
          const name = prompt('Enter Item')
          if (name) {
            // setItems([...items, { id: uuid(), name }]);
          }
        }}>Add Item</Button>
      <ListGroup>
        <TransitionGroup className="shopping-list">
          {items.map(({ id, name }) => {
            return (<CSSTransition key={id} timeout={500} classNames="fade">
              <ListGroupItem>
                <Button
                  className="remove-btn"
                  color="danger"
                  size="sm"
                // onClick={() => setItems(items.filter(item => item.id !== id))}
                >&times;</Button>
                {name}
              </ListGroupItem>
            </CSSTransition>)
          })}
        </TransitionGroup>
      </ListGroup>
    </Container >
  )
};

ShoppingList.propTypes = {
  getItems: Proptypes.func.isRequired,
  item: Proptypes.object.isRequired
}
/*
The connect() function connects a React component to a Redux store.

It provides its connected component with the pieces of the data it needs from the store, and the functions it can use to dispatch actions to the store.

It does not modify the component class passed to it; instead, it returns a new, connected component class that wraps the component you passed in.
*/
const mapStateToProps = (state) => ({
  item: state.item
});

export default connect(mapStateToProps, { getItems })(ShoppingList)
