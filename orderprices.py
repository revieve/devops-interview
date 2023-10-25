import pandas as prices

# Read the CSV files
customers_file = prices.read_csv('customers.csv')
orders_file = prices.read_csv('orders.csv')
products_file = prices.read_csv('products.csv')

# Total cost of an order
def order_total(products_list):
    product_ids = [int(product_id) for product_id in products.split()]
    total_cost = sum(products_file[products_file['id'].isin(product_ids)]['cost'])
    return total_cost

# Add a new column 'euros' to the 'orders_file' with the total cost
orders_file['euros'] = orders_file['products'].apply(order_total)

# Save the 'orders_file' to 'order_prices.csv' without the index column
orders_file[['id', 'euros']].to_csv('order_prices.csv', index=False)
