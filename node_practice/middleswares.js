import Fastify from 'fastify';

const server = Fastify();

let requestCount = 0;
let errorCount = 0;

server.addHook('onRequest', logRequest);

function logRequest(request, reply, next) {
    requestCount++;
    console.log(request.method, request.url, requestCount);
    next();
}

let userReqCount = [{
    user_id: '1',
    count: 0,
    timeStamp: new Date(),
    isBlocked: false
}];


function rateLimit(request, reply, next) {

    let userId = request.headers.user_id;
    let timeStamp = new Date();

    const userReq = userReqCount.find(user => user.user_id === userId);



    if (userReq) {

        if (userReq.isBlocked) {
            reply.code(429).send('Too many requests');
            return;
        }


        let timeDiff = timeStamp - userReq.timeStamp;
        if (timeDiff >= 5000) {
            userReq.count = 1;
            userReq.timeStamp = timeStamp;

        } else if (timeDiff < 5000 && userReq.count >= 5) {
            userReq.count = 0;
            userReq.timeStamp = timeStamp;
            userReq.isBlocked = true;
            console.log(userReqCount);
            reply.code(429).send('Too many requests');
        } else {
            userReq.count++;

        }
    } else {
        userReqCount.push({
            user_id: userId,
            count: 1,
            timeStamp: timeStamp,
            isBlocked: false
        });



    }
    console.log(userReqCount);
    next();
}

server.addHook('onRequest', rateLimit);

fastify.addHook('onRequest', (request, reply, done) => {
  // Log the method and URL of each incoming request
  console.log(`[${new Date().toISOString()}] ${request.method} ${request.url}`);
  
  // Log additional request details if needed (e.g., headers, query params)
  // console.log('Headers:', request.headers);
  // console.log('Query Params:', request.query);

  done(); // Call done to continue processing the request
});


function errorHandler(error, request, reply) {
    console.log(error);
    errorCount++;
    reply.code(500).send('Internal server error');
}

server.setErrorHandler(errorHandler);


server.get('/', (request, reply) => {
    reply.send('Hello world');
});

server.listen({ port: 3000 });

