
config = exports;

config.listen = {
  port: 3232,
  host: 'localhost'
};

config.amqp = {
  reconnect_timeout: 10000,
  connection: {
    host: '10.42.1.73',
    port: 5672,
    login: 'guest',
    password: 'guest',
    vhost: '/'
  },
  exchange: {
    type: 'fanout'
  },
  queue: {
    name: 'mailsrc',
    options: { autoDelete: false }
  }
};

