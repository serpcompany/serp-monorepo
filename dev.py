#!/usr/bin/env python3

import argparse
import os
import sys
import subprocess
import shutil
import glob


def parse_arguments():
    """Parse command line arguments"""
    parser = argparse.ArgumentParser(description="SERP Monorepo Development Tool")
    parser.add_argument("project", help="Project name (e.g. @serp-media)")
    parser.add_argument(
        "command",
        nargs="?",
        default="dev:docker",
        help="Command to run (e.g. dev, test, build)",
    )
    parser.add_argument(
        "--no-infisical", action="store_true", help="Skip Infisical setup"
    )
    parser.add_argument(
        "--rebuild", action="store_true", help="Rebuild Docker container"
    )
    return parser.parse_args()


def get_project_path(project):
    """Get the path to the project directory"""
    if project.startswith("@"):
        project_name = project[1:]  # Remove @ prefix
    else:
        project_name = project

    # Search in apps and packages directories
    for location in ["apps", "packages"]:
        path = os.path.join(location, project_name)
        if os.path.isdir(path):
            return path

    print(f"Error: Project {project} not found in apps or packages directories")
    sys.exit(1)


def setup_infisical(project_path):
    """Copy the project's .infisical.json file to the root directory"""
    source_file = os.path.join(project_path, ".infisical.json")
    target_file = ".infisical.json"

    if not os.path.exists(source_file):
        print(f"Warning: .infisical.json not found in {project_path}")
        return False

    print(f"Copying {source_file} to root directory")
    shutil.copy2(source_file, target_file)
    return True


def run_docker_command(project, command, rebuild=False):
    """Run the docker compose command with the specified project and command"""
    docker_cmd = f"pnpm --filter {project} {command}"
    env = os.environ.copy()
    env["DOCKER_CMD"] = docker_cmd

    compose_cmd = "docker compose"

    # Build command
    build_option = "--build" if rebuild else ""
    cmd = f"infisical run -- {compose_cmd} -f docker-compose-dev.yml up {build_option}"

    # Execute command
    print(f"Running: {cmd}")
    print(f"Container command will be: {docker_cmd}")
    subprocess.run(cmd, shell=True, env=env)


def list_available_projects():
    """List all available projects in the monorepo"""
    projects = []

    # Find all directories in apps and packages that have a package.json file
    for location in ["apps", "packages"]:
        if os.path.exists(location):
            for dir_name in os.listdir(location):
                if os.path.isdir(os.path.join(location, dir_name)) and os.path.exists(
                    os.path.join(location, dir_name, "package.json")
                ):
                    projects.append(f"@{dir_name}")

    return projects


def main():
    """Main function"""
    # Check if we're in the root directory of the monorepo
    if not (
        os.path.exists("docker-compose-dev.yml") and os.path.exists("Dockerfile.dev")
    ):
        print("Error: This script must be run from the root directory of the monorepo")
        sys.exit(1)

    # If no arguments provided, list available projects
    if len(sys.argv) == 1:
        projects = list_available_projects()
        print("Available projects:")
        for project in projects:
            print(f"  {project}")
        print("\nUsage: python dev.py @project-name [command]")
        sys.exit(0)

    args = parse_arguments()

    # Find the project directory
    project_path = get_project_path(args.project)

    # Setup Infisical if not disabled
    if not args.no_infisical:
        setup_infisical(project_path)

    # Run Docker command
    run_docker_command(args.project, args.command, args.rebuild)


if __name__ == "__main__":
    main()
