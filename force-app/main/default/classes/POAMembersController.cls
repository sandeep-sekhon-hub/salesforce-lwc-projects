public with sharing class POAMembersController {
    
    @AuraEnabled(cacheable=true)
    public static List<Account> getPoaMembers(Id poaAccountId) {

        if (poaAccountId == null) {
            return new List<Account>();
        }

        return [
            SELECT Id,
                   Name,
                   AccountNumber,
                   PersonEmail
            FROM Account
            WHERE Power_of_Attorney__c = :poaAccountId
            AND IsPersonAccount = true
            ORDER BY Name
        ];
    }
}