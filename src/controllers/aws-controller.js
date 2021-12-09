const { ListBucketsCommand } = require('@aws-sdk/client-s3')
const { s3Client } = require('../services/aws-service')

class AwsController {
    static async listBuckets() {
        try {
            const data = await s3Client.send(new ListBucketsCommand({}))
            console.log('Success', data.Buckets)
            return data // For unit tests.
        } catch (err) {
            console.log('Error', err)
        }
    }
}

module.exports = AwsController
