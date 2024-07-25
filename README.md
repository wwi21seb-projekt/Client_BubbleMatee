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

   Obtain your private API-KEY from <https://myprojects.geoapify.com/projects>

5. ### 🧬 **Edit Network Adapter**

   To properly configure the adapter for Docker, follow these steps:

   **Open the `svelte.config.js` File**: Locate the `svelte.config.js` file in your project directory.

   **Change Adapter Configuration**:

   - Change the adapter import line from `@sveltejs/adapter-auto` to `@sveltejs/adapter-node` to ensure that your application functions correctly in a Docker environment.

     ```javascript
     // Before
     import adapter from '@sveltejs/adapter-auto';

     // After
     import adapter from '@sveltejs/adapter-node';
     ```

---

6. ### 🐳 **Execute Docker Command**

   From within the directory, activate the Docker environment by executing:

   ```bash
   docker-compose up
   ```

   Please be patient, this process to build the image takes some time.
   Please pay attention to your internet connection.

   ### Building and Running Individual Services

   If you only want to build and run a specific service, you can do so as follows:

   #### Only `web-alpha` Service

   To build and run the `web-alpha` service:

   ```bash
   docker-compose up --build web-alpha
   ```

   To only build the `web-alpha` service without running it:

   ```bash
   docker-compose build web-alpha
   ```

   To run the previously built `web-alpha` service:

   ```bash
   docker-compose up web-alpha
   ```

   #### Only `web-beta` Service

   To build and run the `web-beta` service:

   ```bash
   docker-compose up --build web-beta
   ```

   To only build the `web-beta` service without running it:

   ```bash
   docker-compose build web-beta
   ```

   To run the previously built `web-beta` service:

   ```bash
   docker-compose up web-beta
   ```

   ***

7. ### 🌐 **Access Webpage**

   Once the Docker containers are fully operational, they can be accessed through the following endpoints:

   They can be accessed inside the Docker Containers at:

   ```
   Server Alpha
   http://0.0.0.0:4173/
   Server Beta
   http://0.0.0.0:4172/
   ```

   Accessibility from outside the Docker containers is configured through port redirection at the following URLs:

   - Server Alpha

   ```
   http://127.0.0.1:4173/
   ```

   - Server Beta

   ```
   http://127.0.0.1:4172/
   ```

   Additionally, the website is accessible at:

   ```
   https://bubblematee.me
   ```
