# **BubbleMateee Client Setup Guide**

## 📋 **Requirements**

Before you begin, ensure you have completed the following:

- **Docker Installation**: Confirm Docker is properly installed on your system.
- **Ports free**: 4172 and 4173.

## 🚀 **Workflow Steps**

Adhere to these instructions to configure your environment:

1. ### 📥 **Pull Repository**

   Clone or download the desired repository from its source.

2. ### 🖥️ **Open Terminal**

   Open the terminal or command prompt on your machine.

3. ### 📂 **Navigate to Directory**

   Use command-line operations to move to the folder containing the repository. The correct directory is: **Client_BubbleMatee**

   ```bash
   [command] path/to/repository/Client_BubbleMatee/
   ```

4. ### 🐳 **Edit Dockerfile Files**

   In the `./Client_BubbleMatee` directory, modify the Dockerfile files:

   - DockerfileAlpha
   - DockerfileBeta

   Insert your `PRIVATE_GEO_API_KEY` within these files.

   Obtain your private API-KEY from https://myprojects.geoapify.com/projects

5. ### 🐳 **Execute Docker Command**

   From within the directory, activate the Docker environment by executing:

   ```bash
   docker compose up
   ```

   Please be patient, this process takes some time.

6. ### 🌐 **Access Webpage**

   Once both Docker containers are operational, they serve both backend systems within the Docker containers on port `4173`.

   They can be accessed within their respective Docker containers at:

   ```
   http://localhost:4173/
   or
   http://192.168.16.2:4173/
   ```

   Accessibility from outside the Docker containers is configured through port redirection at the following URLs:

   - Server Alpha

   ```
   http://localhost:4173/
   ```

   - Server Beta

   ```
   http://localhost:4172/
   ```

   Additionally, the website is accessible at:

   ```
   https://bubblematee.me
   ```
