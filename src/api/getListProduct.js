const getListProduct = (idType, page) => {
    let url;
    if (idType !== 'COLLECTION') {
        url = `https://mylifevungtau.000webhostapp.com/api/product_by_type.php?id_type=${idType}&page=${page}`;
    } else {
        url = `https://mylifevungtau.000webhostapp.com/api/get_collection.php?page=${page}`;
    }
    return fetch(url)// eslint-disable-line
    .then(res => res.json());
};

export default getListProduct;
