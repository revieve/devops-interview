import pandas as ranking

# Read the CSV files
customers_file = ranking.read_csv('customers.csv')
products_file = ranking.read_csv('products.csv')
orders_file = ranking.read_csv('orders.csv')

# Total euros spent by each customer
def total_euros(customer_id):
    customer_orders = orders_file[orders_file['customer'] == customer_id]
    total_euros = 0
    for index, row in customer_orders.iterrows():
        product_ids = row['products'].split()
        total_euros += sum(products_file[products_file['id'].isin(map(int, product_ids))]['cost'])
    return total_euros

# Total euros spent by each customer and add it as a new column
customers_file['total_euros'] = customers_file['id'].apply(total_euros)

# Sort Customers in descending order by total euros
customer_ranking_file = customers_file.sort_values(by='total_euros', ascending=False)

# New DataFrame with the required columns
customer_ranking_file = customer_ranking_file[['id', 'firstname', 'lastname', 'total_euros']]

# Save result to 'customer_ranking.csv' file
customer_ranking_file.to_csv('customer_ranking.csv', index=False)
