package com.acme.supply_tool;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.acme.supply_tool.data.ACMEData;
import com.acme.supply_tool.data.Customer;
import com.acme.supply_tool.data.CustomerRanking;
import com.acme.supply_tool.data.Order;
import com.acme.supply_tool.data.OrderPrice;
import com.acme.supply_tool.data.Product;
import com.acme.supply_tool.data.ProductCustomer;

public class ACMEDataManager {

	private ACMEDataProvisioner dataProvisioner;

	private List<Customer> customers;
	private List<Product> products;
	private List<Order> orders;

	public ACMEDataManager(ACMEDataProvisioner provisioner) {
		this.dataProvisioner = provisioner;

		this.customers = new ArrayList();
		this.products = new ArrayList();
		;
		this.orders = new ArrayList();
		;
	}

	public void loadData() throws FileNotFoundException, IOException {
		this.dataProvisioner.loadData(customers, products, orders);
	}

	private Product findProductById(int id, List<Product> collection) {

		for (Product product : collection)
			if (product.getId() == id)
				return product;

		return null;
	}

	private boolean orderContainsProduct(Order order, int product) {

		return order.getProducts().contains(product);

	}

	private List<Order> findCustomerOrders(Customer customer) {

		List<Order> customerOrders = new ArrayList<>();

		for (Order order : orders) {
			if (order.getIdCustomer() == customer.getId()) {
				customerOrders.add(order);
			}
		}

		return customerOrders;
	}

	private Double calculateCustomerTotals(List<OrderPrice> orderPrices, List<Order> customerOrders) {

		Double totalEuros = 0.0;

		for (Order order : customerOrders) {
			for (OrderPrice orderPrice : orderPrices) {
				if (order.getId() == orderPrice.getId())
					totalEuros += orderPrice.getEuros();
			}
		}

		return totalEuros;
	}

	private void sortByTotal(List<CustomerRanking> customerRankings) {

		for (int i = 0; i < customerRankings.size() - 1; i++) {
			for(int j = i+1; j < customerRankings.size(); j++) {
				if(customerRankings.get(i).getTotalEuros() < customerRankings.get(j).getTotalEuros()) {
					CustomerRanking temp = customerRankings.get(i);
					
					customerRankings.add(i, customerRankings.get(j));
					customerRankings.remove(i+1);
					
					customerRankings.add(j, temp);
					customerRankings.remove(j+1);
				}
			}
		}
	}

	private List<OrderPrice> generateOrderPrices() {
		List<OrderPrice> orderPrices = new ArrayList();

		int id;
		List<Integer> productList;

		for (Order order : orders) {
			id = order.getId();
			productList = order.getProducts();

			Double total = 0.0;
			for (Integer product : productList) {
				total += findProductById(product, products).getCost();
			}

			orderPrices.add(new OrderPrice(id, total));
		}

		return orderPrices;
	}

	private List<ProductCustomer> generateProductCustomers() {

		List<ProductCustomer> productCustomers = new ArrayList();

		for (Product product : products) {

			ProductCustomer productCustomer = new ProductCustomer(product.getId(), new ArrayList());

			for (Order order : orders) {

				if (orderContainsProduct(order, product.getId())) {
					productCustomer.addCustomer(order.getIdCustomer());
				}

			}

			productCustomers.add(productCustomer);
		}

		return productCustomers;
	}

	private List<CustomerRanking> generateCustomerRankings() {

		List<CustomerRanking> customerRankings = new ArrayList<>();
		List<OrderPrice> orderPrices = this.generateOrderPrices();

		List<Order> customerOrders;
		Double totalEuros = 0.0;

		for (Customer customer : customers) {
			customerOrders = this.findCustomerOrders(customer);
			totalEuros = calculateCustomerTotals(orderPrices, customerOrders);

			customerRankings.add(
					new CustomerRanking(customer.getId(), customer.getFirstName(), customer.getLastname(), totalEuros));
		}

		this.sortByTotal(customerRankings);
		return customerRankings;
	}
	
	public void saveData()throws FileNotFoundException, IOException {
		this.dataProvisioner.saveData(this.generateOrderPrices(), this.generateProductCustomers(), this.generateCustomerRankings());
		
	}
	
	
}
