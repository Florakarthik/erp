$(document).ready(function () {
    $(".add").click(function(){
        $("#productname").val("");
        $("#productprice").val("");
        $("#productbrand").val("");
        $("#wrapper").show();
    });
    $(".close").click(function(){
        $("#wrapper").hide();
      });
    $("#save").click(function() {
        $("#update").hide();
        let productName = $("#productname").val();
        //console.log(productName);
        let productPrice = $("#productprice").val();
        //console.log(productPrice);
        let productBrand = $("#productbrand").val();
        //console.log(productBrand);
        let productDetails = {
            "name": productName,
            "price": productPrice,
            "brand": productBrand
              };

           if(validateProduct(productName,productPrice,productBrand)){
            if(saveProductDetails(productDetails)){
                displayProductDetails();
                showToast("product details are added");
            }
            else{
                showToast("product already exists");
            }
           }
           else{
            showToast("Please fill all the details");
           }

        $("#productname").val("");
        $("#productprice").val("");
        $("#productbrand").val("");

    });
    displayProductDetails();

});


