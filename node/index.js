const express = require('express')
const jsforce = require('jsforce')
require('dotenv').config()
const app = express()
const PORT = 3001

const { SF_LOGIN_URL, SF_USERNAME, SF_PASSWORD, SF_TOKEN } = process.env
const conn = new jsforce.Connection({
    loginUrl: SF_LOGIN_URL,

})
conn.login(SF_USERNAME, SF_PASSWORD + SF_TOKEN, (err, userInfo) => {
    if (err) {
        console.error(err)
    } else {
        console.log("User Id:" + userInfo.id)
        console.log("Org id:" + userInfo.organizationId)
    }
    conn.sobject('Opportunity').create({
            Name: 'Theo Test',
            StageName: 'Closed Won',
            LeadSource: 'Public Relations',
            OrderNumber__c: '654986',
            CloseDate: '2022-04-03'

        },
        function(err, ret) {
            if (err || !ret.success) {
                return console.error(err, ret)
            }
            console.log('Created record id : ' + ret.id)
        }
    )
})


app.get('/', (req, res) => {
    conn.query("SELECT Id, Name, StageName, LeadSource, OrderNumber__c, CloseDate FROM Opportunity", (err, result) => {
            if (err) {
                res.send(err)
            } else {
                console.log("Total records" + result.totalSize)
                res.json(result.records)
            }
        })
        // res.send("Salesforce integration with nodejs")

})

app.post('/', (req, res) => {
    res.send("POST Request Called")
    req.body('{"Id":"0067Q000005x2n9QAA","Name":"Theo Test","StageName":"Closed Won","LeadSource":"Public Relations","OrderNumber__c":"654986"}')
    console.log(req.body)
})

app.listen(PORT, () => {
    console.log('Server is running at http://localhost:${PORT}')
})