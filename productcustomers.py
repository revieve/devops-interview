import pandas as customers

# Read the CSV files
products_file = customers.read_csv('products.csv')
orders_file = customers.read_csv('orders.csv')

# New CSV file to store the customers for each product
product_customers = {}

# Iterate through the orders 
for index, row in orders_file.iterrows():
    order_id = row['id']
    product_ids = row['products'].split()
    for product_id in product_ids:
        if product_id not in product_customers:
            product_customers[product_id] = []
        product_customers[product_id].append(order_id)

# DataFrame for product_customers.csv
product_customers_file = customers.DataFrame(product_customers.items(), columns=['id', 'customer_ids'])

# Save the results to 'product_customers.csv' file
product_customers_file.to_csv('product_customers.csv', index=False)
