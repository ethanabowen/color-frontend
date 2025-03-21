#!/bin/bash

# To decouple the frontend and backend, we don't assign credentials from the backend to the frontend
# Instead we run this script locally to set the GitHub secrets

# Check if AWS profile is provided
if [ -z "$1" ]; then
    echo "Usage: $0 <aws-profile>"
    exit 1
fi

AWS_PROFILE=$1

# Check if GitHub CLI is installed
if ! which gh > /dev/null 2>&1; then
    echo "GitHub CLI is not installed. Please install it first:"
    echo "https://cli.github.com/manual/installation"
    exit 1
fi

# Check if user is logged into GitHub CLI
if ! gh auth status > /dev/null 2>&1; then
    echo "Please login to GitHub CLI first:"
    echo "gh auth login"
    exit 1
fi

# Get AWS credentials from backend Terraform output
echo "Getting AWS credentials from backend Terraform output..."
cd ../../favorite-color-backend/terraform || exit 1

# Get the values using the specified AWS profile
AWS_KEY_ID=$(AWS_PROFILE=$AWS_PROFILE terraform output -raw frontend_ci_access_key_id)
AWS_SECRET=$(AWS_PROFILE=$AWS_PROFILE terraform output -raw frontend_ci_secret_access_key)
WEBSITE_BUCKET=$(AWS_PROFILE=$AWS_PROFILE terraform output -raw website_bucket_name)
API_URL=$(AWS_PROFILE=$AWS_PROFILE terraform output -raw api_url)

# Return to frontend directory
cd ../../favorite-color-frontend || exit 1

# Set GitHub secrets
echo "Setting GitHub secrets..."
gh secret set AWS_ACCESS_KEY_ID -b "$AWS_KEY_ID"
gh secret set AWS_SECRET_ACCESS_KEY -b "$AWS_SECRET"
gh secret set WEBSITE_BUCKET_NAME -b "$WEBSITE_BUCKET"
gh secret set API_URL -b "$API_URL"

# Verify secrets were set
echo "Verifying secrets..."
gh secret list

echo "GitHub secrets have been set successfully!" 