 var firebaseRef = firebase.database().ref();
 	firebaseRef.child("Menu").on("child_added", function(snapshot){
		
		var id = snapshot.child("menuId").val(); 
		var genre = snapshot.child("menuGenre").val();
		var food = snapshot.child("menuName").val();
		var price = snapshot.child("menuPrice").val();
		var img = snapshot.child("menuImgUrl").val();
		var quantity = 1;
		var cart = "<button id='button' class='btn btn-default' onclick='addToCart(\"" + food + "," + price +"," + img +"," + quantity +"\");'><span class='glyphicon glyphicon-shopping-cart' ></span></button>";
	
		$("#table_body").append(
		"<tr><td><img src='" + img + "' height = '250' width= '250' ></td><td>" 
		+ genre + "</td><td>" + food + "</td><td>"
		+ price + "</td><td>" 
		+ "<button type='button' onclick='sub(\"" + food +"\");' class='sub'>-</button><input type='text' value='0' class='field' /><button type='button' onclick='add(\"" + id + "\");' class='add'>+</button>" + "</td><td>"
		+ cart + "</td></tr>")
		
	});
	
// Button Settings
function add(id) {
	var target = $('.field', this.parentNode)[0];
  target.value = +target.value + 1; 
 
}

function sub(food) {
	var target = $('.field', this.parentNode)[0];
	  if (target.value > 0) {
		target.value = +target.value - 1;
	  }
	  
}

// if user changes value in field
$('.field').change(function() {
  // maybe update the total here?
}).trigger('change');


 /*  ==============Add to Firebase============= */
 
	// add to cart
function addToCart(data, dummy1, dummy2, dummy3) {
	
		var array = data.split(",");
		
		var food = array[0];
		var price = array[1];
		var img = array[2];
		var quantity = array[3];
		
	firebaseRef.child("Cart").push({
		
			"item_name" : food,
			"item_price": price,
			"item_img": img,
			"item_quantity": quantity
		
	});
	alert("You have successfully add your order!");

}

// Add to Cart Page
	firebaseRef.child("Cart").on("child_added", function(snapshot){
		
		var food = snapshot.child("item_name").val();
		var price = snapshot.child("item_price").val();
		var img = snapshot.child("item_img").val();
		var removeBtn = "<button class='btn-remove-key' onclick='remove(\""+ food + "\");'><span class='glyphicon glyphicon-trash'></span></button>";
		
		$("#item_list").append(
		"<dl><dt><img src='" + img + "' height = '250' width= '250' </dt><p>"
		+ food + " </p><p>" + price + " </p><p>" + removeBtn + "</p></dl>" )
	
	});
	
function remove(food){
	
	var key = firebaseRef.child("Cart").key;
	firebaseRef.child(key).remove();
			
	window.location.reload();
	
  alert("Your order has been deleted!");
  
}
	

	
	// Add to firebase
function checkout() {
	firebaseRef.child("Cart").on("child_added", function(snapshot){
	var food = snapshot.child("item_name").val();
	var price = snapshot.child("item_price").val();
	var img = snapshot.child("item_img").val();
	var quantity = snapshot.child("item_quantity").val();
	
	firebaseRef.child("Order_List").push({
			"item_name" : food,
			"item_price" : price,
			"item_quantity": quantity
			
		});
	});
	alert("Your order is confirm!")
}	
