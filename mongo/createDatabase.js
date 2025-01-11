db = db.getSiblingDB('contactbook');

db.counters.drop();

db.counters.insertOne({
    _id: 'main',
    value: 0
});

