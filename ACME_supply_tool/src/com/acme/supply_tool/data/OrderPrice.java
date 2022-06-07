package com.acme.supply_tool.data;

public class OrderPrice {

	private int id;
	private Double euros;
	
	public OrderPrice(int id, Double euros) {
		super();
		this.id = id;
		this.euros = euros;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Double getEuros() {
		return euros;
	}

	public void setEuros(Double euros) {
		this.euros = euros;
	}
	
	@Override
	public String toString() {
		
		return this.getId() + "," + this.getEuros();
		
	}
	
}
