import reducer from '../reducers/itemReducer';
import * as types from '../actions/types';

describe('item reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      items: [],
      loading: false,
    });
  });

  it('should handle GET_ITEMS', () => {
    const getItemAction = {
      type: types.GET_ITEMS,
      payload: [
        {
          _id: '1',
          name: 'banana',
          productCode: '10',
          price: '10',
          description: 'test',
          availableCount: '100',
        },
        {
          _id: '2',
          name: 'orange',
          productCode: '20',
          price: '12',
          description: 'test2',
          availableCount: '150',
        },
      ],
    };
    expect(reducer([], getItemAction)).toEqual({
      items: [
        {
          _id: '1',
          name: 'banana',
          productCode: '10',
          price: '10',
          description: 'test',
          availableCount: '100',
        },
        {
          _id: '2',
          name: 'orange',
          productCode: '20',
          price: '12',
          description: 'test2',
          availableCount: '150',
        },
      ],
      loading: false,
    });

    const getItemAction2 = {
      type: types.GET_ITEMS,
      payload: [
        {
          _id: '1',
          name: 'banana',
          productCode: '10',
          price: '10',
          description: 'test',
          availableCount: '100',
        },
        {
          _id: '2',
          name: 'orange',
          productCode: '20',
          price: '12',
          description: 'test2',
          availableCount: '150',
        },
        {
          _id: '3',
          name: 'lemons',
          productCode: '30',
          price: '9',
          description: 'test3',
          availableCount: '110',
        },
      ],
    };

    expect(
      reducer(
        {
          items: [
            {
              _id: '1',
              name: 'banana',
              productCode: '10',
              price: '10',
              description: 'test',
              availableCount: '100',
            },
            {
              _id: '2',
              name: 'orange',
              productCode: '20',
              price: '12',
              description: 'test2',
              availableCount: '150',
            },
          ],
          loading: false,
        },
        getItemAction2,
      ),
    ).toEqual(
      {
        items: [
          {
            _id: '1',
            name: 'banana',
            productCode: '10',
            price: '10',
            description: 'test',
            availableCount: '100',
          },
          {
            _id: '2',
            name: 'orange',
            productCode: '20',
            price: '12',
            description: 'test2',
            availableCount: '150',
          },
          {
            _id: '3',
            name: 'lemons',
            productCode: '30',
            price: '9',
            description: 'test3',
            availableCount: '110',
          },
        ],
        loading: false,
      },
      {
        items: [
          {
            _id: '1',
            name: 'banana',
            productCode: '10',
            price: '10',
            description: 'test',
            availableCount: '100',
          },
          {
            _id: '2',
            name: 'orange',
            productCode: '20',
            price: '12',
            description: 'test2',
            availableCount: '150',
          },
        ],
        loading: false,
      },
    );
  });

  it('should handle DELETE_ITEM', () => {
    const deleteItemAction = {
      type: types.DELETE_ITEM,
      payload: '1',
    };

    expect(
      reducer(
        {
          items: [
            {
              _id: '1',
              name: 'banana',
              productCode: '10',
              price: '10',
              description: 'test',
              availableCount: '100',
            },
            {
              _id: '2',
              name: 'orange',
              productCode: '20',
              price: '12',
              description: 'test2',
              availableCount: '150',
            },
          ],
        },
        deleteItemAction,
      ),
    ).toEqual(
      {
        items: [
          {
            _id: '2',
            name: 'orange',
            productCode: '20',
            price: '12',
            description: 'test2',
            availableCount: '150',
          },
        ],
      },
      {
        items: [
          {
            _id: '1',
            name: 'banana',
            productCode: '10',
            price: '10',
            description: 'test',
            availableCount: '100',
          },
          {
            _id: '2',
            name: 'orange',
            productCode: '20',
            price: '12',
            description: 'test2',
            availableCount: '150',
          },
        ],
      },
    );
  });

  it('should handle ADD_ITEM', () => {
    const addItemAction = {
      type: types.ADD_ITEM,
      payload: {
        _id: '3',
        name: 'lemons',
        productCode: '30',
        price: '9',
        description: 'test3',
        availableCount: '110',
      },
    };

    expect(
      reducer(
        {
          items: [
            {
              _id: '1',
              name: 'banana',
              productCode: '10',
              price: '10',
              description: 'test',
              availableCount: '100',
            },
            {
              _id: '2',
              name: 'orange',
              productCode: '20',
              price: '12',
              description: 'test2',
              availableCount: '150',
            },
          ],
        },
        addItemAction,
      ),
    ).toEqual(
      {
        items: [
          {
            _id: '3',
            name: 'lemons',
            productCode: '30',
            price: '9',
            description: 'test3',
            availableCount: '110',
          },
          {
            _id: '1',
            name: 'banana',
            productCode: '10',
            price: '10',
            description: 'test',
            availableCount: '100',
          },
          {
            _id: '2',
            name: 'orange',
            productCode: '20',
            price: '12',
            description: 'test2',
            availableCount: '150',
          },
        ],
      },
      {
        items: [
          {
            _id: '1',
            name: 'banana',
            productCode: '10',
            price: '10',
            description: 'test',
            availableCount: '100',
          },
          {
            _id: '2',
            name: 'orange',
            productCode: '20',
            price: '12',
            description: 'test2',
            availableCount: '150',
          },
        ],
      },
    );
  });

  it('should handle ITEMS_LOADING', () => {
    expect(
      reducer(
        {
          items: [
            {
              _id: '1',
              name: 'banana',
              productCode: '10',
              price: '10',
              description: 'test',
              availableCount: '100',
            },
            {
              _id: '2',
              name: 'orange',
              productCode: '20',
              price: '12',
              description: 'test2',
              availableCount: '150',
            },
          ],
          loading: false,
        },
        {
          type: types.ITEMS_LOADING,
        },
      ),
    ).toEqual(
      {
        items: [
          {
            _id: '1',
            name: 'banana',
            productCode: '10',
            price: '10',
            description: 'test',
            availableCount: '100',
          },
          {
            _id: '2',
            name: 'orange',
            productCode: '20',
            price: '12',
            description: 'test2',
            availableCount: '150',
          },
        ],
        loading: true,
      },
      {
        items: [
          {
            _id: '1',
            name: 'banana',
            productCode: '10',
            price: '10',
            description: 'test',
            availableCount: '100',
          },
          {
            _id: '2',
            name: 'orange',
            productCode: '20',
            price: '12',
            description: 'test2',
            availableCount: '150',
          },
        ],
        loading: false,
      },
    );
  });
});
