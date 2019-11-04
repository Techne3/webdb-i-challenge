# Database Queries

## Find all customers with postal code 1010
    SELECT *
    FROM Customers
    WHERE postalcode =1010;
## Find the phone number for the supplier with the id 11
    SELECT phone
    FROM Suppliers
    WHERE supplierId =11
## List first 10 orders ever places, descending by the order date
    SELECT *
    FROM orders
    ORDER BY orderdate DESC
    LIMIT 10

## Find all customers that live in London, Madrid, or Brazil
    SELECT * from Customers
    WHERE City IN 
    ('London','Madrid','Brazil')

    <!-- WHERE City = 'London'  -- USE for one city -->

## Add a customer record for "The Shire", the contact name is "Bilbo Baggins" the address is -"1 Hobbit-Hole" in "Bag End", postal code "111" and the country is "Middle Earth"
    INSERT into customers (customername, contactName, address,city, postalCode,country)
    Values('The Shire','Bilbo Baggins', '1 Hobbit-Hole', 'Bag End' , '111', 'Middle Earth')

## Update Bilbo Baggins record so that the postal code changes to "11122"
    Update Customers
    Set postalCode = '11122'
    Where contactName = 'Bilbo Baggins'

## (Stretch) Find a query to discover how many different cities are stored in the Customers table. Repeats should not be double counted
    Select Count
    (Distinct City)
    From Customers

## (Stretch) Find all suppliers who have names longer than 20 characters. You can use `length(SupplierName)` to get the length of the name
    Select *
    FROM suppliers where length(supplierName) > 20;