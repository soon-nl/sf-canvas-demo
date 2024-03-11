#!/bin/bash

# Change to the directory of your React project
cd app

# Run npm run build to build the React website
npm install

npm run build

# Check if the build was successful
if [ $? -eq 0 ]; then
    echo "Build successful. Copying dist folder..."
    # Copy the build folder to a different location
    rm -r ../dist
    cp -r dist ../
    echo "dist folder copied"

    rm -f ../dist/index.html

    # Copy and rename index.html to app.ejs
    cp dist/index.html ../views/app.ejs
    echo "index.html copied and renamed to app.ejs"
else
    echo "Build failed. Exiting..."
    exit 1
fi