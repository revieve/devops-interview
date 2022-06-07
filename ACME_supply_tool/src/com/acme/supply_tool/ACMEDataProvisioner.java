package com.acme.supply_tool;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.acme.supply_tool.data.Customer;
import com.acme.supply_tool.data.CustomerRanking;
import com.acme.supply_tool.data.Order;
import com.acme.supply_tool.data.OrderPrice;
import com.acme.supply_tool.data.Product;
import com.acme.supply_tool.data.ProductCustomer;

public class ACMEDataProvisioner {

	// p prefix stands for PATH TO.
	private String pCustomers;
	private String pProducts;
	private String pOrders;
	// Actual files.
	private File customersF, productsF, ordersF;

	private boolean loaded;

	public ACMEDataProvisioner() {
		this.loaded = false;
	}

	public boolean isLoaded() {
		return loaded;
	}

	public void setLoaded(boolean loaded) {
		this.loaded = loaded;
	}

	public String getpCustomers() {
		return pCustomers;
	}

	public void setpCustomers(String pCustomers) {
		this.pCustomers = pCustomers;
	}

	public String getpProducts() {
		return pProducts;
	}

	public void setpProducts(String pProducts) {
		this.pProducts = pProducts;
	}

	public String getpOrders() {
		return pOrders;
	}

	public void setpOrders(String porders) {
		this.pOrders = porders;
	}

	public void loadData(List<Customer> customers, List<Product> products, List<Order> orders)
			throws FileNotFoundException, IOException {
		customersF = new File(pCustomers);
		productsF = new File(pProducts);
		ordersF = new File(pOrders);

		if (!customersF.exists() || !productsF.exists() || !ordersF.exists())
			this.loaded = false;
		else
			this.loaded = true;

		List<String> collection;

		try (BufferedReader bReader = new BufferedReader(new FileReader(customersF))) {
			collection = this.loadCollection(bReader);

			for (String line : collection) {
				int id = Integer.parseInt(line.split(",")[0]);
				String fName = line.split(",")[1];
				String lName = line.split(",")[2];

				customers.add(new Customer(id, fName, lName));
			}
		}

		try (BufferedReader bReader = new BufferedReader(new FileReader(productsF))) {
			collection = this.loadCollection(bReader);

			for (String line : collection) {
				int id = Integer.parseInt(line.split(",")[0]);
				String name = line.split(",")[1];
				Double cost = Double.parseDouble(line.split(",")[2]);

				products.add(new Product(id, name, cost));
			}
		}

		try (BufferedReader bReader = new BufferedReader(new FileReader(ordersF))) {
			collection = this.loadCollection(bReader);

			for (String line : collection) {
				int id = Integer.parseInt(line.split(",")[0]);
				int idCustomer = Integer.parseInt(line.split(",")[1]);
				String productsLine = line.split(",")[2];

				List<Integer> productsIds = new ArrayList();
				for (String field : productsLine.split(" ")) {
					productsIds.add(Integer.parseInt(field));
				}

				orders.add(new Order(id, idCustomer, productsIds));
			}
		}

	}

	public void saveData(List<OrderPrice> orderPrices, List<ProductCustomer> productCustomers,
			List<CustomerRanking> customerRankings) throws FileNotFoundException, IOException {

		try (BufferedWriter bWriter = new BufferedWriter(new FileWriter(new File("order_prices.csv")))) {

			//Write headers.
			bWriter.write("id,euros");
			bWriter.newLine();
			
			for (OrderPrice orderPrice : orderPrices) {
				bWriter.write(orderPrice.toString());
				bWriter.newLine();
			}

			bWriter.flush();
		}

		try (BufferedWriter bWriter = new BufferedWriter(new FileWriter(new File("product_customers.csv")))) {

			//Write headers.
			bWriter.write("id,customer_ids");
			bWriter.newLine();
			
			for (ProductCustomer productCustomer: productCustomers) {
				bWriter.write(productCustomer.toString());
				bWriter.newLine();
			}

			bWriter.flush();
		}

		try (BufferedWriter bWriter = new BufferedWriter(new FileWriter(new File("customer_rankings.csv")))) {

			//Write headers.
			bWriter.write("id,firstname,lastname,total_euros");
			bWriter.newLine();
			
			for (CustomerRanking customerRanking : customerRankings) {
				bWriter.write(customerRanking.toString());
				bWriter.newLine();
			}

			bWriter.flush();
		}

	}

	private List<String> loadCollection(BufferedReader bReader) throws IOException {

		List<String> collection = new ArrayList<String>();
		String line;

		int currentLine = 0;
		
		while ((line = bReader.readLine()) != null) {
			if(currentLine > 0)
				collection.add(line);
			
			currentLine++;
		}

		return collection;
	}

}
