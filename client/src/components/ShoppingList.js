import React, { useEffect } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import Proptypes from 'prop-types';

function ShoppingList({ getItems, deleteItem, item }) {
  useEffect(() => {
    getItems(); //Dispatches action to get items from db
  }, [getItems]);
  const { items } = item;

  const handleDeleteClick = id => {
    deleteItem(id); //this is the action being passed in as a prop, not the one that has been imported (that one has been connected to the props via the store+ connector)
  };

  return (
    <Container>
      {/* <Button
        color='dark'
        style={{ marginBottom: '2rem' }}
        onClick={() => {
          const name = prompt('Enter Item');
          if (name) {
            // setItems([...items, { id: uuid(), name }]);
          }
        }}
      >
        Add Item
      </Button> */}
      <ListGroup>
        <TransitionGroup className='shopping-list'>
          {items.map(({ id, name }) => {
            return (
              <CSSTransition key={id} timeout={500} classNames='fade'>
                <ListGroupItem>
                  <Button
                    className='remove-btn'
                    color='danger'
                    size='sm'
                    onClick={() => handleDeleteClick(id)}
                  >
                    &times;
                  </Button>
                  {name}
                </ListGroupItem>
              </CSSTransition>
            );
          })}
        </TransitionGroup>
      </ListGroup>
    </Container>
  );
}

ShoppingList.propTypes = {
  getItems: Proptypes.func.isRequired,
  item: Proptypes.object.isRequired
};

/*
If a mapStateToProps function is specified, the new wrapper component will subscribe to Redux store updates. This means that any time the store is updated, mapStateToProps will be called. The results of mapStateToProps must be a plain object, which will be merged into the wrapped component’s props. If you don't want to subscribe to store updates, pass null or undefined in place of mapStateToProps.
*/
const mapStateToProps = state => ({
  item: state.item
});

/*
The connect() function connects a React component to a Redux store.

It provides its connected component with the pieces of the data it needs from the store, and the functions it can use to dispatch actions to the store.

It does not modify the component class passed to it; instead, it returns a new, connected component class that wraps the component you passed in.
*/
export default connect(mapStateToProps, { deleteItem, getItems })(ShoppingList);
