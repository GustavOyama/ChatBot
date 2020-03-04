const dialogflow = require('dialogflow');
const uuid = require('uuid');


require('dotenv').config()

module.exports={
    async runSample(question) {
        // A unique identifier for the given session
        const sessionId = uuid.v4();
      
        // Create a new session
        const sessionClient = new dialogflow.SessionsClient();
        const sessionPath = sessionClient.sessionPath('tester-dialogflow', sessionId);
      
        // The text query request.
        const request = {
          session: sessionPath,
          queryInput: {
            text: {
              // The query to send to the dialogflow agent
              text: `"${question}"`,              
              languageCode: 'pt-br',
            },
          },
        };
      
        // Send request and log result
        const responses = await sessionClient.detectIntent(request);
    
        const result = responses[0].queryResult;
        return result.fulfillmentText
      }
}





