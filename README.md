# Salesforce-integration-with-NodeJS-server
In this simple aplication i create a handler (In Salesforce, using Apex) for POST callouts ( where i create an opportunity based on parameters that i sent from my server (the one in folder called Node, created with NodeJs), a GET method for retriving data and a PUT callout(for upsert).
In the node folder we have 3 files:
1. index.js where the server is created and i do the callouts, so basically i configure the modules that i used(express and jsforce) and i set the connection to Salesforce. Then i create one get method where i query Opportunities from salesforce and i displayed the json files on the web page. And also in the end i create an Opportunity record with dummy data just to show that connection really work. I use jsforce with con.sobject().create() method
2. package-lock.josn
3. package.josn where we can see details from the modules that i used

How to run it?
1. Create a folder, open it in Visual Studio code, open a new terminal and write: npm init -y
2. Install modules that we need, so write in terminal: npm install express jsforce dotenv --save
3. Create .env file (It should be in node folder but i can't attach my credential here, it should contain next fields:
SF_LOGIN_URL = https://login.salesforce.com
SF_USERNAME = your username
SF_PASSWORD = your pass
SF_TOKEN = security token
)
4. Now we have are ready to start the server and see the result of the simple query so write in terminal: node index.js
5. Now you can go to the server that we created: http://localhost:3001 in browser (3001 is the port that i set, but you can choose another one). Here we can observe the data that we are retrieving from salesforce, from the app.get request (You can change the query, or the fields and get another data)
6. You can open salesforce now and see that we created a new Opportunity record with the dummy data that i set on the conn.sobject('Opportunity').create({ 'dummy data'})
