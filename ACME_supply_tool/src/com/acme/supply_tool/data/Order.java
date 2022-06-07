package com.acme.supply_tool.data;

import java.util.List;

public class Order implements ACMEData{

	private int id;
	private int idCustomer;
	private List<Integer> products;
	
	public Order(int id, int idCustomer, List<Integer> products) {
		super();
		this.id = id;
		this.idCustomer = idCustomer;
		this.products = products;
	}

	@Override
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getIdCustomer() {
		return idCustomer;
	}

	public void setIdCustomer(int idCustomer) {
		this.idCustomer = idCustomer;
	}

	public List<Integer> getProducts() {
		return products;
	}

	public void setProducts(List<Integer> products) {
		this.products = products;
	}
	
}
