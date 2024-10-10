<!DOCTYPE html>
<html>
<head>
    <title>Product Page</title>
</head>
<body>
<h1>Add Product</h1>
<form action="product" method="post">
    <input type="hidden" name="action" value="add">
    Product ID: <input type="text" name="productId"><br>
    Name: <input type="text" name="name"><br>
    Price: <input type="text" name="price"><br>
    <input type="submit" value="Add">
</form>

<h1>Delete Product</h1>
<form action="product" method="post">
    <input type="hidden" name="action" value="delete">
    Product ID: <input type="text" name="productId"><br>
    <input type="submit" value="Delete">
</form>
</body>
</html>
