const getData = () => {
  return fetch(
    `https://gloozontest-default-rtdb.firebaseio.com/goods.json`
  ).then((response) => {
    return response.json();
  });
};

export default getData;
