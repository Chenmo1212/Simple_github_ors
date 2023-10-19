# GitHub PRs Web App

This web application is built using React to display a list of Pull Requests (PRs) fetched from the GitHub API. It offers a responsive and accessible interface to view PRs, including their titles, authors, and comment counts.

## Features
- Fetches a list of PRs from the GitHub API.
- Dynamically renders PRs on a web page.
- Displays PR titles, authors, and comment counts.
- Switches users and choose repositories with ease.
- Responsive design for desktop and mobile screens.
- Accessibility features for enhanced usability.
- Keyboard navigation for a smoother user experience.

## Project Structure

The project's folder structure is organized as follows:

- `src/`: Contains the source code of the web application.
    - `components/`: Holds React components.
    - `containers/`: Manages pages in the app.
    - `images/`: Stores images and icons used in the app.
    - `axios`: Manages API requests to the GitHub API.
  - `App.js`: The main component rendering the PR list.
  - `index.js`: Entry point of the application.
- `public/`: Contains the public assets for the app.

## Installation and Usage

Follow these steps to run the project locally:

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/Chenmo1212/Simple_github_prs.git
   ```

2. Change to the project directory:

   ```bash
   cd Simple_github_prs
   ```
3. Install the project dependencies:

   ```bash
   npm install
   ```
4. Create a GitHub personal access token:

   - Go to your GitHub account settings.

   - Click on "Developer settings" > "Personal access tokens."

   - Generate a token with the required permissions for the app.

5. Update the access token:

   - Open `src/axios/fetch.js`.

   - Replace `'YOUR_ACCESS_TOKEN'` with your GitHub personal access token.

6. Start the development server:

   ```bash
   npm start
   ```
7. Open your web browser and visit `http://localhost:3000` to view the app.

## Accessibility Features

here are some accessibility features and improvements implemented in the GitHub PRs web app:
- **Semantic HTML**: All HTML elements are used semantically, such as using ```<button>``` for clickable elements and `<ul>` for lists. This ensures that screen readers and assistive technologies can interpret the content correctly.
- **Aria-label Attributes**: Aria-label attributes have been added to various elements, providing descriptive labels for components like the pull request list and the user selection input field. This helps screen readers provide context to users. 
- **Keyboard Navigation**: The app now supports keyboard navigation, allowing users to navigate and interact with the UI using only keyboard inputs. For example, users can navigate through the list of pull requests and switch between pages with keyboard arrow keys. 
- **Focus Styles**: Proper focus styles are implemented, ensuring that keyboard and screen reader users can clearly identify which element is currently in focus. This helps users navigate through the interface without confusion. 
- **Alt Text for Images**: Images, including icons and avatars, are accompanied by descriptive alt text. This makes visual content accessible to users who rely on screen readers. 
- **Pagination Accessibility**: The pagination component includes descriptive aria-label attributes for each page number, making it clear to screen reader users which page they are on and which page they can navigate to. 
- **Error Handling**: When an error occurs, such as a failed API request, an error message is displayed and automatically removed after a short time. This ensures that users are aware of the issue and the message doesn't clutter the interface.

## Issues and Contributions

If you encounter any issues or have suggestions for improvements, please open an issue in the GitHub repository. Contributions are also welcome; feel free to submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).