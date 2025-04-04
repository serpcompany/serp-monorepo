import requests
import os
import json
import xml.etree.ElementTree as ET
from google.oauth2 import service_account
from googleapiclient.discovery import build

# Hardcoded list of domains
DOMAINS = [
    "daft.fm",
    "serp.co",
    "serp.ai",
    "serp.media",
    # "boxingundefeated.com",
    "serp.wiki",
    # "serp.games"
]

# Configuration: update with your service account JSON file path
SERVICE_ACCOUNT_FILE = os.path.join(os.path.dirname(__file__), 'gsc-service-account.json')
SCOPES = ['https://www.googleapis.com/auth/webmasters']

def get_sitemap_urls(domain):
    """
    Fetch the sitemap index from the domain and extract all <loc> URLs.
    """
    sitemap_index_url = f"https://{domain}/sitemap_index.xml"
    headers = {
        "User-Agent": "my program (gzip)",
        "Accept-Encoding": "gzip"
    }
    try:
        response = requests.get(sitemap_index_url, headers=headers, timeout=10)
        response.raise_for_status()
    except Exception as e:
        print(f"[ERROR] Fetching sitemap index for {domain}: {e}")
        return []

    try:
        ns = {'sm': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
        root = ET.fromstring(response.content)
        sitemap_urls = []
        for sitemap in root.findall('sm:sitemap', ns):
            loc = sitemap.find('sm:loc', ns)
            if loc is not None and loc.text:
                sitemap_urls.append(loc.text.strip())
        return sitemap_urls
    except Exception as e:
        print(f"[ERROR] Parsing sitemap index for {domain}: {e}")
        return []

def submit_sitemap(service, site_property, sitemap_url):
    """
    Submit a single sitemap URL to Google Search Console.
    """
    try:
        service.sitemaps().submit(siteUrl=site_property, feedpath=sitemap_url).execute()
        print(f"[SUCCESS] Submitted sitemap: {sitemap_url}")
    except Exception as e:
        print(f"[ERROR] Submitting sitemap {sitemap_url} for {site_property}: {e}")

def main():
    # Build credentials and initialize the Search Console API service
    try:
        credentials = service_account.Credentials.from_service_account_file(
            SERVICE_ACCOUNT_FILE, scopes=SCOPES)
    except json.decoder.JSONDecodeError as e:
        print(f"[ERROR] Error decoding service account file: {e}")
        print("[INFO] Checking if this is a CI environment...")

        # If in CI and the file is malformed, exit with error
        if os.environ.get('CI') == 'true':
            print("[ERROR] Running in CI environment with invalid service account file.")
            raise

        print("[INFO] Not in CI environment. Attempting to use existing service account file if available.")
        if not os.path.exists(SERVICE_ACCOUNT_FILE) or os.path.getsize(SERVICE_ACCOUNT_FILE) < 10:
            print(f"[ERROR] No valid service account file found at {SERVICE_ACCOUNT_FILE}")
            return

    service = build('webmasters', 'v3', credentials=credentials)

    for domain in DOMAINS:
        print(f"\nProcessing domain: {domain}")
        # For domain properties, the siteUrl must be in the form "sc-domain:{domain}"
        site_property = f"sc-domain:{domain}"

        sitemap_urls = get_sitemap_urls(domain)
        if not sitemap_urls:
            print(f"[WARNING] No sitemaps found for {domain}. Skipping.")
            continue

        sitemap_urls += [f"https://{domain}/sitemap_index.xml"]
        print(f"Found {len(sitemap_urls)} sitemap(s) for {domain}:")
        for url in sitemap_urls:
            print("  ", url)

        for sitemap_url in sitemap_urls:
            submit_sitemap(service, site_property, sitemap_url)

if __name__ == '__main__':
    main()
