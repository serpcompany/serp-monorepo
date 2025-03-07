import os


def generate_workflow_files():
    # Get the absolute path of the directory where this script is located
    base_dir = os.path.dirname(os.path.abspath(__file__))
    # Folder that contains the app directories (relative to script)
    apps_dir = os.path.join(base_dir, "..", "apps")
    # Destination for workflow files
    workflows_dir = os.path.join(base_dir, "..", ".github", "workflows")

    # Ensure the workflows directory exists
    if not os.path.exists(workflows_dir):
        os.makedirs(workflows_dir)

    # Iterate over every folder in ../apps
    for app in os.listdir(apps_dir):
        if app == "":
            continue
        app_path = os.path.join(apps_dir, app)
        if os.path.isdir(app_path):
            # For workflow names, replace dashes with underscores (ex: serp-wiki -> serp_wiki)
            workflow_app = app.replace("-", "_")
            # For secret IDs, use upper-case and replace dashes with underscores (ex: serp-wiki -> SERP_WIKI)
            app_secret = app.upper().replace("-", "_")

            # For the CI workflow, construct the staging URL
            parts = app.split("-")
            if len(parts) == 2:
                staging_url = f"https://staging.{parts[0]}.{parts[1]}"
            else:
                staging_url = "https://staging." + app.replace("-", ".")

            # 1. Build Staging Workflow
            filename1 = f"{app}_01_build_staging.yml"
            content1 = f"""name: build_staging_{workflow_app}

on:
  push:
    paths:
      - packages/**
      - apps/{app}/**
    branches:
      - staging
  workflow_dispatch:

jobs:
  build_staging_{workflow_app}:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: SSH and Deploy
        uses: appleboy/ssh-action@master
        with:
          host: ${{{{ secrets.SERVER_IP }}}}
          username: ${{{{ secrets.SERVER_USERNAME }}}}
          key: ${{{{ secrets.FRANCIS_SERVER_SSH_PRIVATE_KEY }}}}
          script: |
            cd serp-monorepo-staging/apps/{app}
            docker compose -f docker-compose-staging.yml down
            git pull https://${{{{ secrets.DEVIN_GITHUB_TOKEN }}}}@github.com/${{{{ github.repository }}}}.git ${{{{ github.ref_name }}}}
            infisical run --domain=https://secrets.serp.co --token=${{{{ secrets.INFISICAL_ACCESS_TOKEN_SERP }}}} --projectId=${{{{ secrets.INFISICAL_PROJECT_ID_{app_secret} }}}} -- docker compose -f docker-compose-staging.yml up --build -d
"""
            with open(os.path.join(workflows_dir, filename1), "w") as f:
                f.write(content1)

            # 2. CI Workflow
            filename2 = f"{app}_02_ci_2.yml"
            content2 = f"""name: ci_2_{workflow_app}

on:
  workflow_run:
    branches:
      - staging
    workflows:
      - build_staging_{workflow_app}
    types:
      - completed
  workflow_dispatch:

jobs:
  ci_2_{workflow_app}:
    if: ${{{{ github.event.workflow_run.conclusion == 'success' }}}}
    runs-on: ${{{{ matrix.os }}}}

    strategy:
      matrix:
        os: [ubuntu-latest]
        node: [18]

    steps:
      - uses: actions/setup-node@v3
        with:
          node-version: ${{{{ matrix.node }}}}

      - name: checkout
        uses: actions/checkout@master

      - name: sitespeed.io (staging.)
        run: docker run -v "$(pwd):/sitespeed.io" sitespeedio/sitespeed.io:35.5.0 {staging_url} --budget.configPath .github/budget.json -n 3 --axe.enable
"""
            #             content2 = f"""name: ci_2_{workflow_app}

            # on:
            #   workflow_run:
            #     branches:
            #       - staging
            #     workflows:
            #       - build_staging_{workflow_app}
            #     types:
            #       - completed
            #   workflow_dispatch:

            # jobs:
            #   ci_2_{workflow_app}:
            #     if: ${{{{ github.event.workflow_run.conclusion == 'success' }}}}
            #     runs-on: ${{{{ matrix.os }}}}

            #     strategy:
            #       matrix:
            #         os: [ubuntu-latest]
            #         node: [18]

            #     steps:
            #       - uses: actions/setup-node@v3
            #         with:
            #           node-version: ${{{{ matrix.node }}}}

            #       - name: checkout
            #         uses: actions/checkout@master

            #       # - name: Setup pnpm
            #       #   uses: pnpm/action-setup@v4

            #       # - name: Use Node.js ${{{{ matrix.node-version }}}}
            #       #   uses: actions/setup-node@v4
            #       #   with:
            #       #     node-version: ${{{{ matrix.node-version }}}}
            #       #     cache: pnpm

            #       # - name: cache node_modules
            #       #   uses: actions/cache@v3
            #       #   with:
            #       #     path: node_modules
            #       #     key: ${{{{ matrix.os }}}}-node-v${{{{ matrix.node }}}}-deps-${{{{ hashFiles(format('{{0}}{{1}}', github.workspace, '/pnpm-lock.yaml')) }}}}

            #       # - name: Install dependencies
            #       #   if: steps.cache.outputs.cache-hit != 'true'
            #       #   run: pnpm install

            #       - name: sitespeed.io (staging.)
            #         run: docker run -v "$(pwd):/sitespeed.io" sitespeedio/sitespeed.io:35.5.0 {staging_url} --budget.configPath .github/budget.json -n 3 --axe.enable

            #       #TODO: Uncomment this block to run the Postman API tests when we have the real API
            #       # - name: Install Newman
            #       #   run: pnpm i -g newman

            #       # - name: Postman API tests (real API)
            #       #   run: newman run "https://api.getpostman.com/collections/19081916-015d3af5-afc6-437f-b8a2-55a3f94ca09b?apikey=${{{{ secrets.POSTMAN_API_KEY }}}}"
            # """
            with open(os.path.join(workflows_dir, filename2), "w") as f:
                f.write(content2)

            # 3. Build Production Workflow
            filename3 = f"{app}_03_build_production.yml"
            content3 = f"""name: build_production_{workflow_app}

on:
  push:
    paths:
      - packages/**
      - apps/{app}/**
    branches:
      - main
  workflow_dispatch:

jobs:
  build_production_{workflow_app}:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: SSH and Deploy
        uses: appleboy/ssh-action@master
        with:
          host: ${{{{ secrets.SERVER_IP }}}}
          username: ${{{{ secrets.SERVER_USERNAME }}}}
          key: ${{{{ secrets.FRANCIS_SERVER_SSH_PRIVATE_KEY }}}}
          script: |
            cd serp-monorepo/apps/{app}
            docker compose -f docker-compose.yml down
            git pull https://${{{{ secrets.DEVIN_GITHUB_TOKEN }}}}@github.com/${{{{ github.repository }}}}.git ${{{{ github.ref_name }}}}
            infisical run --domain=https://secrets.serp.co --token=${{{{ secrets.INFISICAL_ACCESS_TOKEN_SERP }}}} --projectId=${{{{ secrets.INFISICAL_PROJECT_ID_{app_secret} }}}} -- docker compose -f docker-compose.yml up --build -d
"""
            with open(os.path.join(workflows_dir, filename3), "w") as f:
                f.write(content3)

            print(f"Generated workflows for {app}")


if __name__ == "__main__":
    generate_workflow_files()
