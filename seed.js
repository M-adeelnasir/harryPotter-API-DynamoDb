const axios = require('axios');
const { addOrUpdate } = require('./dynamoDB')

const putData = async () => {
    try {
        const { data: charachters } = await axios.get('http://hp-api.herokuapp.com/api/characters')
        const charPromise = charachters.map((charachter, i) => (
            addOrUpdate({ ...charachter, id: i + "" })
        ))



        await Promise.all(charPromise)

    } catch (err) {
        console.log(err);
    }
}

putData()