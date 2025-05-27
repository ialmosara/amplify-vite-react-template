import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
    name: 'bg-audience-data-3008',
    access: (allow) => ({
        'cleanroom/data/table/*': [
            allow.guest.to(['read']),
            allow.entity('identity').to(['read', 'write', 'delete'])
        ],
    })
});