import { LightningElement, api, wire } from 'lwc';
import getPoaMembers from '@salesforce/apex/POAMembersController.getPoaMembers';

export default class PowerOfAttorneyMembers extends LightningElement {

    @api recordId;

    members = [];
    error;

    @wire(getPoaMembers, { poaAccountId: '$recordId' })
    wiredMembers({ error, data }) {

        console.log('WE are in POA');
        if (data) {
            this.members = data.map(member => ({
                ...member,
                recordUrl: '/' + member.Id
            }));
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.members = [];
            console.error('Error retrieving POA members:', error);
            console.log('POA MEMBERS:', JSON.stringify(this.members));
        }
    }

    get hasPoaMembers() {
        return this.members.length > 0;
    }
   
}
