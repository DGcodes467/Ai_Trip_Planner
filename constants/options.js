export const selectTravellerList=[
    {   id:1,
        title:'Just Me',
        desc:'A sole traveller in exploration',
        icon:'⛷️',
        people:'1 people'
    },

    {
        id:2,
        title:'A Couple',
        desc:'Two travellers in tandem',
        icon:'🥂',
        people:'2 people'
    },

    {
        id:3,
        title:'Family',
        desc:'A group of fun loving people',
        icon:'🏡',
        people:'3 to 5 people'
    },
    {
        id:4,
        title:'Friends',
        desc:'A bunch of thrill-seekers',
        icon:'⛵',
        people:'5 to 10 people'
    }
]

export const selectBudgetOptions=[
    {
        id:1,
        title:'Cheap',
        desc:'Stay Concious of costs',
        icon:'💰'
    },
    {
        id:2,
        title:'Moderate',
        desc:'Keep cost on the average',
        icon:'💸'
    },

    {
        id:3,
        title:'Luxury',
        desc:'Dont worry about cost',
        icon:'💳'
    },

]

export const AI_PROMPT='Generate Travel Plan for Location {location}, for {totalDay} Days and {totalNight} Night for {traveller} with a {budget} budget with a Flight and Train details, Flight & Train price with Booking url ,Hotels options list with HotelName,Hotel address,price,hotel image url, geo coordinates, ratings, description and places to visit nearby with place name,place details,place image url, geo coordinates,ticket pricing, time to travel  each of the location in  {totalDay} days and {totalNight} night with each day plan with best time to visit. in JSON format'



