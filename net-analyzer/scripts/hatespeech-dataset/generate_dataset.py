import pandas as pd
import random
import json
# Comment
# Function to generate the final dataset
def create_final_dataset(graph_csv, tweets_json_file):
    # Step 1: Load the graph CSV file and extract unique nodes
    df = pd.read_csv(graph_csv)
    unique_nodes = pd.concat([df['Source'], df['Target']]).unique()
    
    # Step 2: Load the tweets dataset from the JSON file
    with open(tweets_json_file, 'r') as file:
        tweets_dataset = json.load(file)
    
    # Create a mapping from user_id in tweets to their messages
    user_tweets_map = {user["user_id"]: user["msgs"] for user in tweets_dataset}
    
    # Collect all tweets in a flat list to use for assigning random tweets to users not in the dataset
    all_tweets = [tweet for user in tweets_dataset for tweet in user["msgs"]]
    
    final_dataset = []
    
    # Step 3: Iterate over unique nodes (users) from the graph
    for node in unique_nodes:
        if node in user_tweets_map:
            # If user is in the tweets dataset, use their tweets
            tweets = user_tweets_map[node]
        else:
            # If user is not in the tweets dataset, assign random tweets from the entire pool
            tweets = random.sample(all_tweets, min(random.randint(5, 20), len(all_tweets)))
        
        # Select between 5 to 10 random tweets for this user
        selected_tweets = random.sample(tweets, min(random.randint(5, 20), len(tweets)))
        
        # Create the user entry in the final dataset
        user_entry = {
            "user_id": node,
            "msgs": selected_tweets
        }
        
        final_dataset.append(user_entry)
    
    return final_dataset

# File paths
graph_csv = './scripts/hatespeech-dataset/graph_dataset.csv'
tweets_json_file = './scripts/hatespeech-dataset/tweets_by_user.json'

# Generate the final dataset
final_data = create_final_dataset(graph_csv, tweets_json_file, )

# Save the final dataset to a JSON file
output_file = './scripts/hatespeech-dataset/dataset.json'
with open(output_file, 'w') as outfile:
    json.dump(final_data, outfile, indent=4, ensure_ascii=False)
