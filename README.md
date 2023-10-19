# GitHub PRs Web App

This web application is built using React to display a list of Pull Requests (PRs) fetched from the GitHub API. It offers a responsive and accessible interface to view PRs, including their titles, authors, and comment counts.

## Features
- Fetches a list of PRs from the GitHub API.
- Dynamically renders PRs on a web page.
- Displays PR titles, authors, and comment counts.
- Responsive design for desktop and mobile screens.
- Accessibility features for enhanced usability.

## Project Structure

The project's folder structure is organized as follows:

- `src/`: Contains the source code of the web application.
    - `components/`: Holds React components.
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
```
npm start
```

7. Open your web browser and visit `http://localhost:3000` to view the app.

## Accessibility Features

This project follows best practices for web accessibility, including semantic HTML, keyboard navigation, focus styles, and descriptive alt text for images. It has been tested with screen readers to ensure compatibility.

## Issues and Contributions

If you encounter any issues or have suggestions for improvements, please open an issue in the GitHub repository. Contributions are also welcome; feel free to submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).