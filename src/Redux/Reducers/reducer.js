const INIT_STATE = {
  carts: [],
}

export const cartReducer = (state = INIT_STATE, action) => {

    switch (action.type) {

    case "ADD_CART":
      const ItemsIndex = state.carts.findIndex((items) => items.id === action.payload.id);

      if (ItemsIndex >= 0) {
        console.log( state.carts[ItemsIndex])
        state.carts[ItemsIndex].qnty += 1;
     
      } else {
        const temp = { ...action.payload, qnty: 1 };
        return {
          ...state,
          carts: [...state.carts, temp],
        }
      }

    case "RMV_CART":

    const data = state.carts.filter((el) => el.id !== action.payload);
      return {
        ...state,
        carts: data,
      }

    case "RMV_ONE":
      const ItemsIndex_dec = state.carts.findIndex((items) => items.id === action.payload.id );

      if (state.carts[ItemsIndex_dec].qnty >= 1) {
        const dltItems = (state.carts[ItemsIndex_dec].qnty -= 1);
        console.log(...state.carts, dltItems);
        return {
          ...state,
          carts: [...state.carts],
        }
      } else if(state.carts[ItemsIndex_dec].qnty === 1){
        const data = state.carts.filter((el) => el.id !== action.payload);
        return {
          ...state,
          carts: data,
        }
      }

    default: return state;
  }
}