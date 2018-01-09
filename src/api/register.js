const register = (email, name, password) => (
    fetch('https://mylifevungtau.000webhostapp.com/api/register.php',// eslint-disable-line
    {   
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({ email, name, password })
    })
    .then(res => res.text())
);

module.exports = register;
