#!/bin/bash
# Wait for MongoDB to start
until mongosh --username root --password example --eval "db.stats()" > /dev/null 2>&1; do
    echo "Waitting stats"
    sleep 2
done

until [ $(mongosh --username root --password example --eval 'db.getMongo().getDBNames().indexOf("netanalyzer")' --quiet) -gt 0 ]; do
    echo "Waitting db"
    sleep
done


# Import the JSON data into MongoDB
echo "Importing"
mongoimport --uri "mongodb://root:example@localhost:27017/netanalyzer" --collection hate_speech --type json --file /data/dataset.json --jsonArray
echo "Data Imported"