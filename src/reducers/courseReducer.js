export default (state = [], action) => {
  switch (action.types) {
    case 'CREATE_COURSE':
      return [...state,
        Object.assign({}, action.course),
      ];
    default:
      return state;
  }
};
