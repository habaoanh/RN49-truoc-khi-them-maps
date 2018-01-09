const signIn = (email, password) => (
    fetch('https://mylifevungtau.000webhostapp.com/api/login.php',// eslint-disable-line
    {   
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(res => res.json())
);

module.exports = signIn;
