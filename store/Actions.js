export const ACTIONS = {
  AUTH: "AUTH",
  AUTH_TOKEN: "AUTH_TOKEN",

  ADD_CATEGORIES: "ADD_CATEGORIES",
  TOGGLE_MODAL_SEARCH: "TOGGLE_MODAL_SEARCH",
  CLOSE_MODAL: "CLOSE_MODAL",
  LOGOUT: "LOGOUT",
};

// export const addToCart = (product, cart) => {
//   if(product.inStock === 0)
//   return ({ type: 'NOTIFY', payload: {error: 'This product is out of stock.'} })

//   const check = cart.every(item => {
//       return item._id !== product._id
//   })

//   if(!check) return ({ type: 'NOTIFY', payload: {error: 'The product has been added to cart.'} })

//   return ({ type: 'ADD_CART', payload: [...cart, {...product, quantity: 1}] })
// }

// export const decrease = (data, id) => {
//   const newData = [...data]
//   newData.forEach(item => {
//       if(item._id === id) item.quantity -= 1
//   })

//   return ({ type: 'ADD_CART', payload: newData })
// }

// export const increase = (data, id) => {
//   const newData = [...data]
//   newData.forEach(item => {
//       if(item._id === id) item.quantity += 1
//   })

//   return ({ type: 'ADD_CART', payload: newData })
// }

// export const deleteItem = (data, id, type) => {
//   const newData = data.filter(item => item._id !== id)
//   return ({ type, payload: newData})
// }

// export const updateItem = (data, id, post, type) => {
//   const newData = data.map(item => (item._id === id ? post : item))
//   return ({ type, payload: newData})
// }
