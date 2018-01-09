const initData = () => (
    //fetch('http:192.168.0.110/api/')// eslint-disable-line
    fetch('https://mylifevungtau.000webhostapp.com/api/')// eslint-disable-line
    
    .then(res => res.json())
);

export default initData;
