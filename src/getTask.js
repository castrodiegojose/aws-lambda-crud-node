const AWS = require('aws-sdk')

const getTask = async (event)=>{

    try{

        const dynamodb = new AWS.DynamoDB.DocumentClient()
        const { id } = event.pathParameters

        const result = await dynamodb.get({
            Key: {
                id,
            },
            TableName: 'TaskTable'
        }).promise()

        const task = result.Item

        return {
            status: 200,
            body: task
        } 

    }catch(err){
        console.error(err)
    }

};

module.exports = {
    getTask,
}