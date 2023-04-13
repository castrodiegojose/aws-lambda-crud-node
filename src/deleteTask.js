const AWS = require('aws-sdk')

const deleteTask = async (event)=>{

    try{

        const dynamodb = new AWS.DynamoDB.DocumentClient()
        const { id } = event.pathParameters

        await dynamodb.delete({
            TableName: 'TaskTable',
            Key: {
                id,
            },
        }).promise()

        return {
            status: 200,
            body: {
                message: `Task id: ${id} deleted successfully`
            }
        } 

    }catch(err){
        console.error(err)
    }

};

module.exports = {
    deleteTask,
}