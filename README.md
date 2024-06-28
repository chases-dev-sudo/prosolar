# Visualize GeoTIFF

## Overview

The `Visualize GeoTIFF` project is a web application that fetches solar data using an API key and address. It then visualizes the solar data on a map using GeoTIFF files. The project is built with TypeScript and bundled using Webpack, and it is deployed on Vercel.

## Features

- Fetch solar data based on address and API key
- Process and visualize GeoTIFF files
- Display solar panel configurations on a map

## Project Structure

```
.
├── dist
├── node_modules
├── public
│   ├── bundle.js
│   └── index.html
├── README.md
├── app.ts
├── config.json
├── custom.d.ts
├── index.html
├── package-lock.json
├── package.json
├── server.mjs
├── tsconfig.json
├── vercel.json
└── webpack.config.js
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Git

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/chases-dev-sudo/prosolar.git
   cd prosolar
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

### Configuration

1. **Set up API keys and address:**

   Create a `config.json` file in the project root with the following structure:

   ```json
   {
     "apiKey": "YOUR_GOOGLE_API_KEY",
     "address": "YOUR_ADDRESS"
   }
   ```

### Build

1. **Build the project:**

   ```sh
   npm run build
   ```

   This will compile the TypeScript files and bundle them into `public/bundle.js`.

### Deployment

The project is set up to deploy on Vercel. Follow these steps to deploy:

1. **Push the changes to GitHub:**

   ```sh
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Configure Vercel:**

   - Go to the Vercel dashboard.
   - Import the project from GitHub.
   - In the project settings, set the output directory to `public`.

### Usage

1. **Run the server locally:**

   ```sh
   node dist/server.mjs
   ```

2. **Access the application:**

   Open your browser and navigate to `http://localhost:8080` to see the application in action.

## Development

### Running Locally

1. **Start a local server:**

   ```sh
   npm run serve
   ```

2. **Open the application:**

   Navigate to `http://localhost:8080` in your web browser.

### Making Changes

1. **Modify the TypeScript files in the project root.**
2. **Rebuild the project:**

   ```sh
   npm run build
   ```

3. **Push the changes to GitHub to trigger a new deployment on Vercel.**

### Adding Environment Variables in Vercel

1. **Go to the Vercel dashboard.**
2. **Navigate to your project.**
3. **Go to the "Settings" tab and then "Environment Variables".**
4. **Add your variables, such as `API_KEY` and `ADDRESS`.**

## Troubleshooting

### Common Issues

1. **404 Not Found Error:**

   - Ensure the `public` directory contains `index.html` and `bundle.js`.
   - Check the `vercel.json` configuration to ensure correct routing.

2. **Unexpected Token '<' Error:**

   - Ensure the `bundle.js` file is correctly generated and placed in the `public` directory.
   - Verify the `index.html` file references `bundle.js` correctly.

## License

This project is licensed under the MIT License.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## Acknowledgements

- [Google Maps API](https://developers.google.com/maps/documentation)
- [GeoTIFF Library](https://geotiffjs.github.io/geotiff.js/)
- [Vercel](https://vercel.com/)
