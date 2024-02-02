# **BubbleMateee Client Setup Guide**

## 📋 **Requirements**

Before starting, ensure the following is completed:

- **Docker Installation**: Verify that Docker is correctly installed on your system.

## 🚀 **Workflow Steps**

Follow these steps to set up your environment:

1. ### 📥 **Pull Repository**

   Clone or download the necessary repository from its source.

2. ### 🖥️ **Open Terminal**

   Launch the terminal or command prompt on your computer.

3. ### 📂 **Navigate to Directory**

   Use the command line to navigate to the directory where the repository is located. The right directory is: **Client_BubbleMatee**

   ```bash
   [command] path/to/repository/Client_BubbleMatee/
   ```

4. ### **Create a .env File in this Directory**

   In this Folder is a .env.exammple File, which describes how to setup your .env File:

   ```bash
   # Copy the content of this file to a local created .env file
   # Select your backend -Server
   #PUBLIC_BASE_URL=https://server-alpha.tech
   #PUBLIC_BASE_URL=http://0.0.0.0:3000
   #PUBLIC_BASE_URL=https://server-beta.de

   # Add an API Key for the Geoapify

   # If you have access you can get the API Key from: https://github.com/wwi21seb-projekt/Client_BubbleMatee/settings/environments/2136678618/edit
   # Otherwise get an API KEY from: https://myprojects.geoapify.com/projects
   # PRIVATE_GEO_API_KEY = https://myprojects.geoapify.com/projects
   ```

5. ### **npm run build**

Run following command:

```bash
   npm run build
```

5. ### 🐳 **Execute Docker Command**

   Within the directory, initiate the Docker environment by running:

   ```bash
   docker compose up
   ```

   Please wait, it requires time.

6. ### 🌐 **Access Webpage**

   Once Docker has successfully started the services, open your web browser and go to:

   ```

   http://localhost:4173/
   or
   http://192.168.16.2:4173/
   ```

   This URL will lead you to the webpage hosted locally on your machine.
