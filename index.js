require('dotenv').config({ path: 'env/.env' })

const AwsController = require('./src/controllers/aws-controller')

AwsController.listBuckets()
