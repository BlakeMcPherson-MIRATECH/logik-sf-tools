import os
import requests
from dotenv import load_dotenv
import csv
import argparse
from datetime import datetime
import webbrowser
import platform
import pathlib

# Load environment variables
load_dotenv()

# CLI arguments
parser = argparse.ArgumentParser(description="Export active Logik.io rules that match a variableName string.")
parser.add_argument('--search', type=str, help='Substring to search for in variableName', default="")
args = parser.parse_args()
search_string = args.search

envs = {
    "DEV": {
        "tenant": "miratech-sandbox02",
        "sector": "test"
    },
    "UAT": {
        "tenant": "miratech",
        "sector": "test02"
    },
    "PROD": {
        "tenant": "miratech",
        "sector": "prod01"
    }
}

env = envs["DEV"]

tenant = env["tenant"]
sector = env["sector"]
blueprint_name = "productConfigurator40"
api_key = os.getenv("LOGIK_DEV_IO_API_KEY")

if not api_key:
    raise ValueError("API key not found. Please check your environment variables.")

def build_url(tenant, sector, endpoint):
    return f"https://{tenant}.{sector}.logik.io{endpoint}"

def make_api_request(url, api_key):
    headers = {
        "accept": "application/json",
        "Authorization": f"Bearer {api_key}"
    }
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error: {response.status_code} - {response.text}")
        return None

# Determine Downloads folder
downloads_folder = str(pathlib.Path.home() / "Downloads")
timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
csv_filename = f"{blueprint_name}_rules_export_{timestamp}.csv"
csv_path = os.path.join(downloads_folder, csv_filename)

# Fetch all rules
all_rules = []
page = 0
page_size = 100

while True:
    endpoint = f"/api/admin/v2/blueprints/{blueprint_name}/rules?page={page}&size={page_size}&sort=modified%2CDESC"
    url = build_url(sector, endpoint)
    rules_list = make_api_request(url, api_key)
    if rules_list and "content" in rules_list and rules_list["content"]:
        all_rules.extend(rules_list["content"])
        page += 1
    else:
        break

# Export filtered results
if all_rules:
    exported_count = 0
    with open(csv_path, mode='w', newline='', encoding='utf-8') as file:
        writer = csv.DictWriter(file, fieldnames=["Name", "Variable Name", "Status", "Action Summary"])
        writer.writeheader()
        for rule in all_rules:
            if rule.get("status") == "active" and search_string.lower() in rule.get("variableName", "").lower():
                writer.writerow({
                    "Name": rule.get("name"),
                    "Variable Name": rule.get("variableName"),
                    "Status": rule.get("status"),
                    "Action Summary": rule.get("actionSummary")
                })
                exported_count += 1
    print(f"✅ Exported {exported_count} active rules to:\n{csv_path}")

    # Open the file
    if platform.system() == "Windows":
        os.startfile(csv_path)
    elif platform.system() == "Darwin":  # macOS
        os.system(f"open '{csv_path}'")
    else:  # Linux and others
        os.system(f"xdg-open '{csv_path}'")

else:
    print("No rules found.")
