const searchProduct = (key) => {
    const url = `https://mylifevungtau.000webhostapp.com/api/search.php?key=${key}`;
    return fetch(url)// eslint-disable-line
    .then(res => res.json());
};

export default searchProduct;
