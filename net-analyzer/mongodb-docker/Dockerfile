FROM mongo

# Copy the dataset and the import script
COPY mongo-seed/dataset.json /data/dataset.json
COPY  mongo-seed/01_import_dataset.sh /docker-entrypoint-initdb.d/01_import_dataset.sh

# Make the script executable
RUN chmod +x /docker-entrypoint-initdb.d/01_import_dataset.sh
