@RestResource(urlMapping='/Users/*')
global with sharing class UserCreation {
    @HttpGet
    global static Opportunity getOpportunityById(){
        RestRequest request = Restcontext.request;
        String oppId = request.requestURI.substring(request.requestURI.lastIndexOf('/')+1);
        Opportunity result = [SELECT Name, StageName, LeadSource, Closedate, Probability 
                             FROM Opportunity
                             WHERE Id =: oppId];
        return result;
    }
    
    @HttpPost
    global static ID createOpportunity(String name, String stage, String closedate, String source){
        Opportunity newOpportunity = new Opportunity(
        											name = name,
        											stageName = stage,
        											leadSource = source,
        											closedate = Date.valueOf(closedate));
        insert newOpportunity;
        return newOpportunity.Id;
    }
    @HttpPut
    global static ID upsertOpportunity(String name, String stage, String closedate, String source, String id) {
        Opportunity thisOpportunity = new Opportunity(
        Id = id,
        name = name,
        stageName = stage,
        leadSource = source,
        closedate = Date.valueOf(closedate));
        upsert thisOpportunity;
        return thisOpportunity.Id;
    }

}
