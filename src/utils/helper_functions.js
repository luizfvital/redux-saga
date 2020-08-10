export const sortUsersByName = users => users.sort((a, b) => {
  if (a.firstName > b.firstName) {
    return 1;
  } else if (a.firstName < b.firstName) {
    return -1;
  } else if (a.lastName > b.lastName) {
    return 1;
  } else if (a.lastName < b.lastName) {
    return -1;
  } else {
    return 0
  }
});