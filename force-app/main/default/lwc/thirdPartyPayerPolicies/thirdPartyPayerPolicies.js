import { LightningElement, api, wire } from 'lwc';
import getPolicies from '@salesforce/apex/TPPPolicyController.getPolicies';

const COLUMNS = [
    {
        label: 'Policy Number',
        fieldName: 'policyUrl',
        type: 'url',
        typeAttributes: {
            label: { fieldName: 'policyNumber' },
            target: '_blank'
        }
    },
    {
        label: 'Policyholder',
        fieldName: 'policyholderName'
    },
    {
        label: 'Status',
        fieldName: 'status'
    }
];

export default class ThirdPartyPayerPolicies extends LightningElement {

    @api recordId;

    policies = [];
    error;

    columns = COLUMNS;

    @wire(getPolicies, { accountId: '$recordId' })
    wiredPolicies({ error, data }) {

        if (data) {

            this.policies = data.map(policy => {
                return {
                    ...policy,
                    policyUrl: '/' + policy.policyId
                };
            });

            this.error = undefined;

        } else if (error) {

            this.error = error;
            this.policies = [];
        }
    }

    get policyCount() {
        return this.policies.length;
    }

    get isThirdPartyPayer() {
        return this.policyCount > 0;
    }

    get bannerMessage() {
        return `This person is currently paying for ${this.policyCount} polic${this.policyCount === 1 ? 'y' : 'ies'}.`;
    }
}