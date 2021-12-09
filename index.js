require('dotenv').config()

const AwsController = require('./src/controllers/aws-controller')

AwsController.listBuckets()
