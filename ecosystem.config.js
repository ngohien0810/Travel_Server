module.export = {
    apps: [
        {
            name: 'app',
            script: './server.js',
            append_env_to_name: true,
            instances: 1,
            autorestart: true,
            max_memory_restart: '1G',
            env_development: {
                NODE_ENV: 'development',
                PORT: 5000,
            },
            env_production: {
                NODE_ENV: 'production',
                PORT: 5000,
            },
        },
    ],
    deploy: {
        production: {
            user: 'root', // user để ssh
            host: '52.221.186.107', // IP của server này (theo sơ đồ)
            ref: 'origin/mongodb-mysql', // branch để pull source
            repo: 'https://github.com/nhuydev1704/Node-Server.git', // repo của project
            path: '/var/www/html/nhuydevnode', // sẽ deploy vào thư mục này
            'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js --env production', // cmd để deploy
        },
    },
};
