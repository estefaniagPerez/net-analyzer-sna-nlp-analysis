import pandas as pd
import random
import string

def generate_random_string():
    return ''.join(random.choices('0123456789ABCDEF', k=6))

csv_file = './scripts/anonimizing_datasets/demo_graph.csv'  
df = pd.read_csv(csv_file)
data_mapping = {}

def map_to_random_string(name):
    if name not in data_mapping:
        data_mapping[name] = generate_random_string()
    return data_mapping[name]

# Apply the function to both 'source' and 'target' columns
df['Source'] = df['Source'].apply(map_to_random_string)
df['Target'] = df['Target'].apply(map_to_random_string)

output_file = './scripts/anonimizing_datasets/graph_data_with_random_names.csv'  # Output CSV file
df.to_csv(output_file, index=False)

print(f"CSV saved to {output_file}")
