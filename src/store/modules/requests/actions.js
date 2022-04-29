export default {
    async contactCoach(context, payload) {
        const newRequest = {
            //id: new Date().toISOString(),     // now, using firebase, id will be generated
            //coachId: payload.id,              // not needed
            userEmail: payload.email,
            message: payload.message
        };
        const response = await fetch(`https://vue-find-a-coach-96fc8-default-rtdb.firebaseio.com/requests/${payload.id}.json`, {
            method: 'POST',
            body: JSON.stringify(newRequest)
        });

        const responseData = await response.json();

        if ( !response.ok ) {
            const error = new Error( responseData.message || 'Failed to send request.' );
            throw error;
        }

        newRequest.id = responseData.name;
        newRequest.coachId = payload.id;

        context.commit('addRequest', newRequest);
    },
    async fetchRequests(context) {
        const coachId = context.rootGetters.userId;
        const response = await fetch(`https://vue-find-a-coach-96fc8-default-rtdb.firebaseio.com/requests/${coachId}.json`);
        const responseData = await response.json();

        if ( !response.ok ) {
            const error = new Error( responseData.message || 'Failed to fetch requests.' );
            throw error;
        }

        const requests = [];

        for( const key in responseData ) {
            const request = {
                id: key,
                coachId: coachId,
                userEmail: responseData[key].userEmail,
                message: responseData[key].message
            };
            requests.push(request);
        }

        context.commit('setRequests', requests);
    }
};