const AWS = require('aws-sdk');

require('dotenv').config();

AWS.config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.ASW_SECRET_ACCESS_KEY
})


const dynamoClient = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = "harryPotter-api"

const getCharachters = async () => {
    let params = {
        TableName: TABLE_NAME
    }
    const characters = await dynamoClient.scan(params).promise()
    // console.log(characters);
    return characters
}





const addOrUpdate = async (characters) => {
    const params = {
        TableName: TABLE_NAME,
        Item: characters
    }
    return await dynamoClient.put(params).promise()
}


const getCharById = async (id) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            id
        }
    }

    return await dynamoClient.get(params).promise()

}


const deleteCharById = async (id) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            id
        }
    }

    return await dynamoClient.delete(params).promise()
}


getCharachters()


module.exports = {
    addOrUpdate, deleteCharById, getCharById, getCharachters, dynamoClient
}