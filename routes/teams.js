const express = require('express')
const router = express.Router();
var connectDialogFlowV2 = require('../connectors/connectDialogFlowV2')

function buildResp(resposta){
    return {
        "type" : "message",
        "text" : `"${resposta}"`,
        "attachments" : [
            {
                "contentType": "application/vnd.microsoft.card.adaptive",
                "content": {
                    "type": "AdaptiveCard",
                    "version": "1.0",
                    "body": [
                    {
                        "type": "TextBlock",
                        "text": "Hello World!",
                        "size": "large"
                    },
                    {
                        "type": "TextBlock",
                        "text": "*Sincerely yours,*"
                    },
                    {
                        "type": "TextBlock",
                        "text": "Adaptive Cards",
                        "separation": "none"
                    }
                    ],
                    "actions": [
                        {
                        "type": "Action.OpenUrl",
                        "url": `"https://${resposta}"`,
                        "title": "Learn More"
                        }
                    ]

                }
            }
        ]
    }
          
      
}


router.post('/', async function(req, res, next) {
    var text = req.body.text;
    var result = text.split(/;/);
    
    try {         
        var resp = await connectDialogFlowV2.runSample(result[1])
        var responseMsg = buildResp(resp)
        
        res.send(responseMsg)
        res.end();                    
    } catch (error) { 
        console.log(error)       
    }
});


module.exports = router;