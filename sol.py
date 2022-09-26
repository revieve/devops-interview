#!/usr/bin/env python3

import csv
import pandas as pnd

# Vars
CUSTOMERS_CSV = "customers.csv"
ORDERS_CSV = "orders.csv"
PRODUCTS_CSV = "products.csv"
IN_DIR = '/res/'

# Read CSV file
def readCSV(csv_file):
	with open(csv_file, newline='') as f:
		csv_reader = csv.reader(f, delimiter=',')
		data = list(csv_reader)
	return data

# Write CSV file
def writeCSV(csv_file,fields,data):
	with open(csv_file, 'w') as f:
		write = csv.writer(f)
		write.writerow(fields)
		write.writerows(data)

def calculate_total(order_line):
	order_id = order_line[0]
	products = order_line[2]
	product_id = ' '.join(products).split()
	cost=0;
	for i in product_id:
		index = product_ids.index(i)
		cost += int(product_cost[index])
	order_price = [order_id,cost]
	return order_price

def task1():
	orders_list = readCSV(IN_DIR.CUSTOMERS_CSV)
	i=1
	order_prices = []
	while i < len(orders_list):
	    line = (orders_list[i])
                order_total = calculate_total(line)
                order_prices.append(order_total)
                i += 1
	headers = ["order_id","total_cost"]
	writeCSV("order_prices.csv",headers,order_prices)

def task2():
	orders_list = readCSV(IN_DIR.ORDERS_CSV)
	i=0
	customers_list = []
	while i<len(product_ids):
		temp_product = [product_ids[i],""]
		j=0
		while j < len(orders_list):
			line = (orders_list[j])
			customer_name = line[1]
			products = line[2]
			if product_ids[i] in products :
				temp_product[1] += customer_name +" "
			j+=1

		customers_list.append(temp_product)
		i+=1
	
	fields = ["id","customers_list"]
	writeCSV("product_customers.csv",fields,customers_list)
    
    products_list = readCSV(IN_DIR.PRODUCTS_CSV)	
    product_ids = []
    product_names = []
    product_cost = []
    while i<len(products_list):
        line = products_list[i]
        product_ids.append(line[0])
        product_names.append(line[1])
        product_cost.append(line[2])
    i+=1

    task1()
    task2()
