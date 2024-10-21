import Fastify from 'fastify';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';


const server = Fastify();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

server.get('/file/:fileName', async (request, reply) => {
    const fileName = request.params.fileName;
    console.log(fileName);
    const filePath = path.join(__dirname, 'files', fileName);
    console.log(filePath);
    if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        reply.send({ data: fileContent });
    } else {
        reply.send(`File ${fileName} not found`);
    }
});

server.get('/files', async (request, reply) => {

    const files = fs.readdirSync(path.join(__dirname, 'files'));
    const numOfFiles = files.length;
    reply.send({ numOfFiles });


});

server.post('/writeFile/:fileName', async (request, reply) => {
    const fileName = request.params.fileName;
    const filePath = path.join(__dirname, 'files', fileName);
    const fileContent = request.body;
    // convert this to json
    console.log('fileContent', fileContent);

    fs.writeFileSync(filePath ,JSON.stringify(fileContent));
    // fs.writeFileSync(filePath, fileContent);
    reply.send(`File ${fileName} written`);
});


// all other routes
server.get('/*', async (request, reply) => {
    reply.statusCode = 404;
    reply.send('Not found');
});
server.post('/*', async (request, reply) => {
    reply.statusCode = 404;
    reply.send('Not found');
});
server.put('/*', async (request, reply) => {
    reply.statusCode = 404;
    reply.send('Not found');
})
server.delete('/*', async (request, reply) => {
    reply.statusCode = 404;
    reply.send('Not found');
})

server.listen({ port: 3000 }, function (err) {
    if (err) throw err
    console.log(`server listening on ${server.server.address().port}`)
});