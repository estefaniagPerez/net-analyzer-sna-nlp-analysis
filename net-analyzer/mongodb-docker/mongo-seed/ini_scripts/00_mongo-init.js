db = db.getSiblingDB('netanalyzer');
db.createUser(
    {
        user: "root",
        pwd: "example",
        roles: [
            {
                role: "readWrite",
                db: "netanalyzer"
            }
        ]
    }
);
db.createCollection('hate_speech');