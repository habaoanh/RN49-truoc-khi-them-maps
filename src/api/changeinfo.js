const changeInfo = (token, name, phone, address) => (
    fetch('https://mylifevungtau.000webhostapp.com/api/change_info.php',// eslint-disable-line
    {   
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({ token, name, phone, address })
    })
    .then(res => res.json())
);

module.exports = changeInfo;
