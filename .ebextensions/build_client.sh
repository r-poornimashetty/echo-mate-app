# .ebextensions/build_client.sh

# Navigate to the client directory
cd /client

# Install client dependencies
npm install

# Build the client app
npm run build

# Navigate back to the parent directory
cd ..

# Install server dependencies
npm install

# Start the Node.js server
# Use 'npm start' or specify the command to start your server
npm start &