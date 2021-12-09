const { ListBucketsCommand, PutObjectCommand, ListObjectsCommand, GetObjectCommand } = require('@aws-sdk/client-s3')
const path = require('path')
const fs = require('fs')
const { s3Client } = require('../config/aws-config')

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

    static async list() {
        try {
            const bucketParams = {
                Bucket: 'anomalys-mundiale',
                Key: 'sftp/'
            }
            // Create a helper function to convert a ReadableStream to a string.
            const streamToString = stream =>
                new Promise((resolve, reject) => {
                    const chunks = []
                    stream.on('data', chunk => chunks.push(chunk))
                    stream.on('error', reject)
                    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
                })

            // Get the object} from the Amazon S3 bucket. It is returned as a ReadableStream.
            const data = await s3Client.send(new GetObjectCommand(bucketParams))
            // return data // For unit tests.
            // Convert the ReadableStream to a string.
            const bodyContents = await streamToString(data.Body)
            console.log(bodyContents)
            return bodyContents
        } catch (err) {
            console.log('Error', err)
        }
    }

    static async listObject() {
        try {
            const bucketParams = {
                Bucket: 'anomalys-mundiale'
            }
            const data = await s3Client.send(new ListObjectsCommand(bucketParams))
            console.log('Success', data)
            return data // For unit tests.
        } catch (err) {
            console.log('Error', err)
        }
    }

    static async put() {
        try {
            const file = './imgs/tiburcio.jfif' // Path to and name of object. For example '../myFiles/index.js'.
            const fileStream = fs.createReadStream(file)

            const uploadParams = {
                Bucket: 'anomalys-mundiale',
                Key: `sftp/`,
                // Add the required 'Body' parameter
                Body: fileStream
            }

            const data = await s3Client.send(new PutObjectCommand(uploadParams))
            console.log('Success', data)
            return data // For unit tests.
        } catch (err) {
            console.log('Error', err)
        }
    }
}

module.exports = AwsController
