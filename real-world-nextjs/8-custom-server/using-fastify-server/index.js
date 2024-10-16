const fastify = require('fastify')();

fastify
  .register(require('@fastify/nextjs'))
  .after(() => {
    fastify.next('/');
    fastify.next('/about');
    fastify.next('/greet/:user');
    fastify.get('/contacts', (req, reply) => {
      reply
        .type('html')
        .send('<h1>Contacts page</h1>');
    });
  })
  .listen({ port: 3000 }, (err, addr) => {
    if (err) {
      fastify.log.error('Error:', err);
      process.exit(1);
    }

    console.log(`Server listening on ${addr}`);
  });