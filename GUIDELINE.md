
# GUIDELINE.md

## Introduction

This document provides instructions on how to set up and run the script for this Node.js project.

## Implementation

1. This is a simple project using Node.js to process and transform a CSV data based on the requirements.
2. This project csv-parser, csv-writer, and file stream library for the main logic.
3. As for additional task, a simple unit test is also being added using mocha chai testing framework that are quite popular and easy to use.
4. On the logger feature, I am using winston logging library because it supports different logging levels, transports, and formats.
5. Lastly, on the linter library, I am using the eslint and prettier library to ensure code quality and adherence to best practices.

## Code Optimization

In the solution code, there are also some code technique being used for a better performance and to ensure that we can handle a large datasets:

1. Stream Processing:
   * The use of fs.createReadStream and csv-parser allows processing large files in chunks rather than loading the entire file into memory.
2. Asynchronous Processing:
   * The parseCsv function is asynchronous, which helps in processing files without blocking the event loop, enhancing performance.
3. Batch Processing:
   * Writing all processed data at once using createObjectCsvWriter minimizes the number of I/O operations, which is more efficient than writing data one record at a time.

## Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (version 14.x or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Installation

1. **Clone the repository** (if you haven't already):
    \`\`\`sh
    git clone https://github.com/aditioagungnugroho/devops-interview.git
    \`\`\`

2. **Navigate to the project directory**:
    \`\`\`sh
    cd devops-interview
    \`\`\`

3. **Install the dependencies**:
    \`\`\`sh
    npm install
    \`\`\`

## Running the Script

### Production Mode

To run the data processing script:

\`\`\`sh
node index.js
\`\`\`

## Project Structure

- **index.js**: The main entry point of the application.
- **logger.js**: A module for logging functionalities.
- **data/**: Directory containing data files used by the script.
- **scripts/**: Directory containing additional scripts.
- **test/**: Directory containing test files.
- **.eslintrc.json**: Configuration file for ESLint.
- **.gitignore**: Git ignore file.
- **.prettierrc**: Configuration file for Prettier.
- **package.json**: Contains metadata about the project and its dependencies.
- **package-lock.json**: Describes the exact dependency tree that was generated.

## Testing

To run the tests:

\`\`\`sh
npm test
\`\`\`

## Linting

To check for linting errors:

\`\`\`sh
npm run lint
\`\`\`

## Additional Notes

- Ensure that the `data/` directory contains all necessary data files required by the script.
- Adjust any configuration settings in the `.eslintrc.json` and `.prettierrc` files as needed.

## Troubleshooting

If you encounter any issues:

1. Ensure all dependencies are installed correctly by running `npm install`.
2. Check the logs for any error messages and follow the hints provided.
3. Refer to the existing `README.md` for additional context and instructions.
