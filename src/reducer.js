export const initialState = {
  basket: [],
  user: null, // initial user state
  pickupTime: null,
  deliveryAddress: null,
  locationModalOpen: false,
};


export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price * item.quantity + amount, 0);

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "ADD_TO_BASKET": {
      // Check if item is already in basket
      const existingIndex = state.basket.findIndex(
        (basketItem) => basketItem.title === action.item.title
      );
    
      // If item is found in basket, update its quantity
      let newBasket = [...state.basket];
      if (existingIndex >= 0) {
        const newQuantity = newBasket[existingIndex].quantity + 1;
        newBasket[existingIndex] = {
          ...newBasket[existingIndex],
          quantity: newQuantity,
        };
      } else {
        // Item is not in basket, add new item with quantity 1
        newBasket.push({
          ...action.item,
          quantity: 1, // Make sure the item object has a quantity property
        });
      }
    
      return {
        ...state,
        basket: newBasket,
      };
    }
    
    case "REMOVE_FROM_BASKET":
      console.log('Remove from basket:', action.id);
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      console.log('Index found:', index);
      let newBasket = [...state.basket];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Can't remove product (id: ${action.id}) as it's not in basket!`
        );
      }

      console.log('New basket:', newBasket);
      return {
        ...state,
        basket: newBasket
      };
    case "SET_USER":
      return {
        ...state,
        user: action.user, // set global user state
      };
    case "EMPTY_BASKET":
      return {
        ...state,
        basket: []
      };

    case "SET_PICKUP_TIME":
      return {
        ...state,
        pickupTime: action.pickupTime
      };

    case "SET_DELIVERY_ADDRESS":
      return {
        ...state,
        deliveryAddress: action.deliveryAddress
      };
    case 'SET_LOCATION_MODAL_OPEN':
      return {
        ...state,
        locationModalOpen: action.locationModalOpen,
      };
      case 'CHANGE_QUANTITY': {
        // This block scope isolates variables from other cases
        const index = state.basket.findIndex(
          (basketItem) => basketItem.id === action.id
        );
      
        let newBasket = [...state.basket];
      
        if (index >= 0) {
          // Update item quantity
          newBasket[index] = { ...newBasket[index], quantity: action.quantity };
        } else {
          console.warn(`Can't change quantity of product (id: ${action.id}) as it's not in basket!`);
        }
      
        return {
          ...state,
          basket: newBasket,
        };
      }
      
    default:
      return state;
  }
};

export default reducer;


