# Overview

Choose whatever language you’re most comfortable with to solve these problems. The tasks are designed to test your ability to work with data and scripts and showcase relevant skills for the DevOps role at Revieve.

# Exercise

The ACME inc. tool supply company manages its operations with 3 csv files:

1. `customers.csv` keeps customer information:
    * `id` is a numeric customer id
    * `firstname` is the customer's first name
    * `lastname` is the customer's last name
2. `products.csv` keeps product info:
    * `id` is a numeric product id
    * `name` is the human-readable name
    * `cost` is the product cost in euros
3. `orders.csv` keeps order information:
    * `id` is a numeric order id
    * `customer` is the numeric id of the customer who created the order
    * `products` is a space-separated list of product ids ordered by the customer

Manually dealing with those files is hard and error-prone, and they've asked for your help writing some code to make their lives easier.

### Task 1

Right now the `orders.csv` doesn't have total order cost information.

We need to use the data in these files to emit a `order_prices.csv` file with the following columns:
* `id` the numeric id of the order
* `euros` the total cost of the order

### Task 2

The marketing department wants to know which customers are interested in each product; they've asked for a `product_customers.csv` file that, for each product, gives the list of customers who have purchased this product:
* `id` numeric product id
* `customer_ids` a space-separated list of customer ids of the customers who have purchased this product

### Task 3

To evaluate our customers, we need a `customer_ranking.csv` containing the following columns, ranked in descending order by total_euros:
* `id` numeric id of the customer
* `firstname` customer first name
* `lastname` customer last name
* `total_euros` total euros this customer has spent on products

### Additional Requirements

- Automation: Create a script or configuration to automate the execution of these data processing tasks. Consider using a task runner or a simple CI/CD pipeline setup (e.g., GitHub Actions) to automate the generation of the CSV files whenever new data is added.
- Documentation: Provide clear and concise documentation on how to run your solution, including any setup steps and dependencies.

### Optional Requirements

For those who wish to go above and beyond, consider implementing one or more of the following optional features:

1. Unit Testing:
- Write unit tests for your data processing scripts using a testing framework of your choice.
- Include the tests in your GitHub Actions workflow to run automatically on each push and pull request.
2. Error Handling and Logging:
- Implement robust error handling and logging for your scripts.
- Use a logging library to capture and store logs.
3. Code Quality:
- Ensure your code follows best practices for code quality and style.
- Use tools like flake8, pylint, or black to lint and format your code.
4. Performance Optimization:
- Optimize your scripts for better performance, especially if handling large datasets.
- Provide a brief explanation of the optimizations you implemented.
5. Dockerization:
- Create a Dockerfile to containerize your scripts.
- Update the GitHub Actions workflow to use the Docker container for running the scripts.

### Submission Instructions

1. Fork this repository to your own GitHub account.
2. Implement your solutions.
3. Create a pull request in your forked repository with your solution.
4. Ensure your pull request includes clear instructions and explanations of your approach.