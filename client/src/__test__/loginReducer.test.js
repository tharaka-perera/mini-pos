import reducer from "../reducers/loginReducer";
import * as types from "../actions/types";

describe("cart reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      message: ""
    });
  });

  it("should handle LOGIN", () => {
    const loginAction = {
      type: types.LOGIN,
      payload: {
        success: true
      }
    };
    expect(reducer([], loginAction)).toEqual({
      message: true
    });

    const loginAction2 = {
      type: types.LOGIN,
      payload: {
        success: false
      }
    };

    expect(
      reducer(
        {
          message: true
        },
        loginAction2
      )
    ).toEqual(
      {
        message: false
      },
      {
        message: true
      }
    );
  });

  it("should handle CHECK", () => {
    const checkAction = {
      type: types.CHECK,
      payload: {
        message: true
      }
    };
    expect(reducer([], checkAction)).toEqual({
      message: true
    });

    const checkAction2 = {
      type: types.CHECK,
      payload: {
        message: false
      }
    };

    expect(
      reducer(
        {
          message: true
        },
        checkAction2
      )
    ).toEqual(
      {
        message: false
      },
      {
        message: true
      }
    );
  });

  //   it("should handle DELETE_CART_ITEM", () => {
  //     const deleteCartItemAction = {
  //       type: types.DELETE_CART_ITEM,
  //       payload: {
  //         data: "",
  //         params: {
  //           _id: "12",
  //           delete: "",
  //           itm: "1"
  //         }
  //       }
  //     };

  //     expect(
  //       reducer(
  //         {
  //           total: 160,
  //           cartItems: [
  //             { itm: { _id: "1", price: 50 }, count: 2 },
  //             { itm: { _id: "2", price: 20 }, count: 3 }
  //           ],
  //           cartLoading: false,
  //           _id: "12"
  //         },
  //         deleteCartItemAction
  //       )
  //     ).toEqual(
  //       {
  //         total: 60,
  //         cartItems: [{ itm: { _id: "2", price: 20 }, count: 3 }],
  //         cartLoading: false,
  //         _id: "12"
  //       },
  //       {
  //         total: 160,
  //         cartItems: [
  //           { itm: { _id: "1", price: 50 }, count: 2 },
  //           { itm: { _id: "2", price: 20 }, count: 3 }
  //         ],
  //         cartLoading: false,
  //         _id: "12"
  //       }
  //     );
  //   });

  //   it("should handle ADD_CART_ITEM", () => {
  //     const addCartItemAction = {
  //       type: types.ADD_CART_ITEM,
  //       payload: {
  //         response: "",
  //         itemData: {
  //           itm: "4",
  //           name: "coke",
  //           productCode: "30",
  //           price: "10",
  //           description: "test",
  //           availableCount: 100,
  //           count: 5
  //         }
  //       }
  //     };

  //     expect(
  //       reducer(
  //         {
  //           total: 160,
  //           cartItems: [
  //             { itm: { _id: "1", price: 50 }, count: 2 },
  //             { itm: { _id: "2", price: 20 }, count: 3 }
  //           ],
  //           cartLoading: false,
  //           _id: "12"
  //         },
  //         addCartItemAction
  //       )
  //     ).toEqual(
  //       {
  //         total: 210,
  //         cartItems: [
  //           {
  //             itm: {
  //               _id: "4",
  //               price: "10",
  //               availableCount: 100,
  //               description: "test",
  //               name: "coke",
  //               productCode: "30"
  //             },
  //             count: 5
  //           },
  //           { itm: { _id: "1", price: 50 }, count: 2 },
  //           { itm: { _id: "2", price: 20 }, count: 3 }
  //         ],
  //         cartLoading: false,
  //         _id: "12"
  //       },
  //       {
  //         total: 160,
  //         cartItems: [
  //           { itm: { _id: "1", price: 50 }, count: 2 },
  //           { itm: { _id: "2", price: 20 }, count: 3 }
  //         ],
  //         cartLoading: false,
  //         _id: "12"
  //       }
  //     );
  //   });

  //   it("should handle UPDATE_CART_ITEM", () => {
  //     const updateCartItemAction = {
  //       type: types.UPDATE_CART_ITEM,
  //       payload: {
  //         data: "",
  //         params: {
  //           itm: "2",
  //           name: "coke",
  //           productCode: "30",
  //           price: "10",
  //           description: "test",
  //           availableCount: 100,
  //           count: 5
  //         }
  //       }
  //     };

  //     expect(
  //       reducer(
  //         {
  //           total: 160,
  //           cartItems: [
  //             { itm: { _id: "1", price: 50 }, count: 2 },
  //             { itm: { _id: "2", price: 20 }, count: 3 }
  //           ],
  //           cartLoading: false,
  //           _id: "12"
  //         },
  //         updateCartItemAction
  //       )
  //     ).toEqual(
  //       {
  //         total: 200,
  //         cartItems: [
  //           { itm: { _id: "1", price: 50 }, count: 2 },
  //           { itm: { _id: "2", price: 20 }, count: 5 }
  //         ],
  //         cartLoading: false,
  //         _id: "12"
  //       },
  //       {
  //         total: 160,
  //         cartItems: [
  //           { itm: { _id: "1", price: 50 }, count: 2 },
  //           { itm: { _id: "2", price: 20 }, count: 3 }
  //         ],
  //         cartLoading: false,
  //         _id: "12"
  //       }
  //     );
  //   });

  //   it("should handle CART_ITEMS_LOADING", () => {
  //     expect(
  //       reducer(
  //         {
  //           total: 160,
  //           cartItems: [
  //             { itm: { _id: "1", price: 50 }, count: 2 },
  //             { itm: { _id: "2", price: 20 }, count: 3 }
  //           ],
  //           cartLoading: false,
  //           _id: "12"
  //         },
  //         {
  //           type: types.CART_ITEMS_LOADING
  //         }
  //       )
  //     ).toEqual(
  //       {
  //         total: 160,
  //         cartItems: [
  //           { itm: { _id: "1", price: 50 }, count: 2 },
  //           { itm: { _id: "2", price: 20 }, count: 3 }
  //         ],
  //         cartLoading: true,
  //         _id: "12"
  //       },
  //       {
  //         total: 160,
  //         cartItems: [
  //           { itm: { _id: "1", price: 50 }, count: 2 },
  //           { itm: { _id: "2", price: 20 }, count: 3 }
  //         ],
  //         cartLoading: false,
  //         _id: "12"
  //       }
  //     );
  //   });
});
