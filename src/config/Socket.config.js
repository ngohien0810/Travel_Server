const db = require('../api/v2/models/index');

const SocketService = {
    //connection socket
    connection: (socket, users) => {
        // event on here
        socket.on('joinRoom', (id) => {
            const user = { userId: socket.id, room: id };

            const check = users.every((user) => user.userId !== socket.id);

            if (check) {
                users.push(user);
                socket.join(user.room);
            } else {
                users.map((user) => {
                    if (user.userId === socket.id) {
                        if (user.room !== id) {
                            socket.leave(user.room);
                            socket.join(id);
                            user.room = id;
                        }
                    }
                });
            }
        });

        socket.on('createComment', async (msg) => {
            const { name, message, todo_id, sentAt, avatar } = msg;

            const newComment = {
                name,
                message,
                avatar,
                todoId: todo_id,
                sentAt,
            };
            await db.Todo_Comments.create(newComment);
            socket.in(todo_id).emit('sendCommentToClient', newComment);
        });

        socket.on('disconnect', () => {
            users = users.filter((user) => user.userId !== socket.id);
        });
    },
};

module.exports = SocketService;
