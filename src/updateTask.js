const AWS = require('aws-sdk')
const middy = require('@middy/core')
const jsonBodyParser = require('@middy/http-json-body-parser')

const updateTask = async (event)=>{

    try{

        const dynamodb = new AWS.DynamoDB.DocumentClient()
        const { id } = event.pathParameters
        const { title, description } = event.body

        await dynamodb.update({
            TableName: 'TaskTable',
            Key: {
                id,
            },
            UpdateExpression: 'set description = :description, title = :title',
            ExpressionAttributeValues: {
                ':title': title,
                ':description': description
            },
            ReturnValues: 'ALL_NEW'       

        }).promise()

        return {
            status: 200,
            body: {
                message: `Task id: ${id} updated successfully`
            }
        } 

    }catch(err){
        console.error(err)
    }

};

module.exports = {
    updateTask: middy(updateTask).use(jsonBodyParser()),
}