import os
import requests
import zipfile

# URLs for the datasets
datasets = {
    "FaceForensics++": "https://someurl/faceforensics.zip",  # Replace with actual URL
    "DeepFake Detection Challenge": "https://someurl/deepfake-detection.zip",  # Replace with actual URL
    "Celeb-DF": "https://someurl/celeb-df.zip"  # Replace with actual URL
}

# Directory to store datasets
data_dir = "dataset/"

if not os.path.exists(data_dir):
    os.makedirs(data_dir)

def download_and_extract(url, save_path):
    print(f"Downloading {url}")
    response = requests.get(url, stream=True)
    with open(save_path, 'wb') as file:
        for chunk in response.iter_content(chunk_size=1024):
            file.write(chunk)
    print(f"Extracting {save_path}")
    with zipfile.ZipFile(save_path, 'r') as zip_ref:
        zip_ref.extractall(data_dir)
    os.remove(save_path)
    print(f"Finished downloading and extracting {save_path}")

# Download and extract each dataset
for name, url in datasets.items():
    save_path = os.path.join(data_dir, f"{name}.zip")
    download_and_extract(url, save_path)
