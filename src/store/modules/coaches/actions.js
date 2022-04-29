export default {
    async registerCoach(context, data) {
        const userId = context.rootGetters.userId;
        const coachData = {
            // id: context.rootGetters.userId,
            firstName: data.first,
            lastName: data.last,
            description: data.desc,
            hourlyRate: data.rate,
            areas: data.areas
        };

        // Firebase requires '.json' at the end
        const response = await fetch(`https://vue-find-a-coach-96fc8-default-rtdb.firebaseio.com/coaches/${userId}.json`, {
            method: 'PUT',      // configure fetch: default = GET --> PUT = create or overwrite
            body: JSON.stringify(coachData)
        });          // .then(); --> async await is better

        //const responseData = await response.json();
        
        if (!response.ok) {
            // ERROR HANDLING
        }

        //context.commit('registerCoach', coachData);
        context.commit('registerCoach', {
            ...coachData,
            id: userId
        });
    },
    async loadCoaches(context) {
        const response = await fetch(
            `https://vue-find-a-coach-96fc8-default-rtdb.firebaseio.com/coaches.json`
        );

        const responseData = await response.json();

        if ( !response.ok ) {
            // ..
        }

        const coaches = [];

        for( const key in responseData ) {
            const coach = {
                id: key,
                firstName: responseData[key].firstName,
                lastName: responseData[key].lastName,
                description: responseData[key].description,
                hourlyRate: responseData[key].hourlyRate,
                areas: responseData[key].areas
            };
            coaches.push(coach);
        }
        context.commit('setCoaches', coaches) 
    }
};