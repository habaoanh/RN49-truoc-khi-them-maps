const getOrderHistory = (token) => (
    fetch('https://mylifevungtau.000webhostapp.com/api/order_history.php',// eslint-disable-line
    {   
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({ token })
    })
    .then(res => res.json())
);

module.exports = getOrderHistory;
