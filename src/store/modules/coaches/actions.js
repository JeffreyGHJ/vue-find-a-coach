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
    }
};