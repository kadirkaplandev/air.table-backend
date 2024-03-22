const userValidator = {
    $jsonSchema: {
        bsonType: "object",
        properties: {
            name: {
                bsonType: "string",
                description: "Name"
            },
            username: {
                bsonType: "string",
                description: "user name"
            },
            email: {
                bsonType: "string",
                description: "email"
            },
            password: {
                bsonType: "string",
            },
            lastSeen: {
                bsonType: "date"
            }
        },
    },
};

export default userValidator