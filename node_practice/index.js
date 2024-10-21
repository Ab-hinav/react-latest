import Fastify from 'fastify'

const fastify = Fastify({ logger: true })


const users = [{
    name: 'John',
    kidneys: [{
        healthy: false
    }]
}]

fastify.get('/allusers', function (request, reply) {
    reply.send(users);
})

fastify.get('/', function (request, reply) {

    let totalKidneys = 0;
    for (let user of users) {
        totalKidneys += user.kidneys.length
    }
    let healthyKidneys = 0;
    for (let user of users) {
        healthyKidneys += user.kidneys.filter(kidney => kidney.healthy).length
    }

    const unhealthyKidneys = totalKidneys - healthyKidneys
    reply.send({ totalKidneys, healthyKidneys, unhealthyKidneys });


})


fastify.post('/kidneys', function (request, reply) {

    const kidney = {
        healthy: request.body.healthy
    }
    const userName = request.body.userName;
    let user = users.find(user => user.name === userName);

    if (!user) {
        user = {
            name: userName,
            kidneys: [kidney]
        }
        users.push(user)
    } else {
        user.kidneys.push(kidney)
    }

    reply.send(users.kidneys)

})


fastify.delete('/kidneys', function (request, reply) {


    let noOfHeathyKidneys = 0;
    let noOfUnhealthyKidneys = 0;
    let totalKidneys = 0;
    for (let user of users) {
        totalKidneys += user.kidneys.length
        user.kidneys = user.kidneys.filter(kidney => kidney.healthy)
        noOfHeathyKidneys += user.kidneys.length
    }
    noOfUnhealthyKidneys = totalKidneys - noOfHeathyKidneys
    console.log(noOfHeathyKidneys)
    if (noOfUnhealthyKidneys === 0) {
        reply.statusCode = 411;
        reply.send('No unhealthy kidneys found');
        return;

    }

    reply.send(users)


});





fastify.listen({ port: 3000 }, function (err) {
    if (err) throw err
    console.log(`server listening on ${fastify.server.address().port}`)
})


