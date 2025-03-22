function saveUserDetails(user) {
    let jsonArray = [];
    let storedUserDetailsString = localStorage.getItem('userDetails');

    if (storedUserDetailsString == null) {
        jsonArray.push(user);
        let userDetailsString = JSON.stringify(jsonArray);
        localStorage.setItem('userDetails', userDetailsString);
        return true;
    }
    else {
        jsonArray = JSON.parse(storedUserDetailsString);
        for (let userInfo of jsonArray) {
            if (userInfo.email == user.email) {
                return false;
            }
        }
        jsonArray.push(user);
        let userDetailsString = JSON.stringify(jsonArray);
        localStorage.setItem('userDetails', userDetailsString);
        return true;
    }
} 

function getUserDetails(user) {
    //localStorage.clear();
    let jsonArray = [];
    let storedUserDetailsString = localStorage.getItem('userDetails');
    if (storedUserDetailsString == null) {
        return null;
    }
    else {
        console.log(storedUserDetailsString);
        jsonArray = JSON.parse(storedUserDetailsString);
        console.log(jsonArray);
        console.log(user.email);
        console.log(user.password);
        for (let userInfo of jsonArray) {
            console.log(userInfo.email);
            console.log(userInfo.password);
            if (userInfo.email == user.email && userInfo.password == user.password) {
                console.log("if inside if condition");
                return userInfo;
            }
            else if (userInfo.email == user.email && userInfo.password != user.password) {
                console.log("if inside elseif condition");
                return "Please enter the correct password";
            }

        }
        console.log("if returning null");
        return null;
    }
}

function saveProductDetails(product) {
    //localStorage.clear();
    let productArray = [];
    let storedProductDetails = localStorage.getItem('productDetails');
    if (storedProductDetails == null) {
        productArray.push(product);
        let productDetailString = JSON.stringify(productArray);
        localStorage.setItem('productDetails', productDetailString);
        return true;
    } else {
        productArray = JSON.parse(storedProductDetails);
        let isAlreadyExist = false;
        for (let productInfo of productArray) {
            if (productInfo.name == product.name && productInfo.brand == product.brand) {
                isAlreadyExist = true;
            }

        }
        if (!isAlreadyExist) {
            productArray.push(product);
            let productDetailString = JSON.stringify(productArray);
            localStorage.setItem('productDetails', productDetailString);
            return true;
        }
        return null;
    }
}

function displayProductDetails() {
    $("#update").hide();
    //localStorage.clear();
    let productArray = [];
    let storedProductDetails = localStorage.getItem('productDetails');
    if (storedProductDetails == null) {
        return null;
    }
    productArray = JSON.parse(storedProductDetails);
    console.log(productArray);

    let tbody = $("#tablebody");
    tbody.empty();
    for (let productInfo of productArray) {

        let row = '<tr>' +
            '<td>' + productInfo.name + '</td>' +
            '<td>' + productInfo.price + '</td>' +
            '<td>' + productInfo.brand + '</td>' +
            '<td><button class="edit-btn">Edit</button><button class="delete-btn">Delete</button></td>' + '</tr>';

        tbody.append(row);
    }

    //Attach click event handler to edit buttons
    $(".edit-btn").click(function () {
        $("#wrapper").show();
        $("#save").hide();
        $("#update").show();
        // Get the parent <tr> element of the clicked edit 
        let row = $(this).closest("tr");
        console.log(row);
        let productname = row.find('td:eq(0)').text(); // Get name from first column
        console.log(productname);
        let productprice = row.find('td:eq(1)').text(); // Get age from second colum
        console.log(productprice);
        let productbrand = row.find('td:eq(2)').text(); // Get email from third colum
        console.log(productbrand);


        // Prompt for new name and age
        $("#productname").val(productname);
        $("#productprice").val(productprice);
        $("#productbrand").val(productbrand);

        // Get index of edited row
        let index = row.index();
        console.log(index);

        $("#update").attr('data-index', index);
    });

    //Attach click event handler to update button
    $("#update").click(function () {
        let index = $(this).attr('data-index'); // Retrieve the index from the button's data attribute
        console.log('Index passed to outside button action:', index);
        let row = $('#tabledata tr').eq(index);
        console.log(row);

        let newProductName = $("#productname").val();
        console.log(newProductName);
        let newProductPrice = $("#productprice").val();
        console.log(newProductPrice);
        let newProductBrand = $("#productbrand").val();
        console.log(newProductBrand);

        // Parse new age as a number
        newProductPrice = parseInt(newProductPrice);

        if (validateProduct(newProductName, newProductPrice, newProductBrand)) {
            // Update row data
            row.find('td:eq(0)').text(newProductName);
            row.find('td:eq(1)').text(newProductPrice);
            row.find('td:eq(2)').text(newProductBrand);




            // Retrieve existing data from local storage
            let productDetails = JSON.parse(localStorage.getItem('productDetails')) || [];

            // Update existing data
            productDetails[index] = { name: newProductName, price: newProductPrice, brand: newProductBrand };
            console.log(productDetails[index]);
            // Update local storage
            localStorage.setItem('productDetails', JSON.stringify(productDetails));
             location.reload();
            }

        else {
            showToast("Please fill all the details");
        }
    });

    // Attach click event handler to delete buttons
    $(".delete-btn").click(function () {
        // Get the parent <tr> element of the clicked delete button
        let row = $(this).closest("tr");
        let index = row.index();
        console.log("index = " + index);
        deleteDetails(index);
        row.remove();
    });
}
function deleteDetails(index) {
    let productArray = [];
    let storedProductDetails = localStorage.getItem('productDetails');
    if (storedProductDetails == null) {
        return null;
    }
    else {
        productArray = JSON.parse(storedProductDetails);
        productArray.splice(index, 1);
        localStorage.setItem('productDetails', JSON.stringify(productArray));
        console.log(productArray);
        displayProductDetails();
    }
}

function emailVerification(email) {
    let userArray = [];
    let storedUserDetailsString = localStorage.getItem('userDetails');
    if (storedUserDetailsString == null) {
        return null;
    }
    else {
        userArray = JSON.parse(storedUserDetailsString);
        for (let userInfo of userArray) {
            if (userInfo.email == email) {
                console.log("inside if");
                console.log(userInfo.email);
                console.log(email);
                return true;

            }

        }
        console.log("outside if");
        return false;
    }
}


function forgotPassword(email, password) {
    let isAlreadyExist = emailVerification(email); // Get the result from emailVerification
    console.log(isAlreadyExist);
    if (isAlreadyExist == true) { // Check if emailVerification returns true
        // Retrieve user details from local storage
        let userArray = JSON.parse(localStorage.getItem('userDetails'));

        // Find the index of the email ID in the userData array
        let userIndex = userArray.findIndex(function (user) {
            return user.email == email;
        });

        // Update the password for the user at the found index
        userArray[userIndex].password = password;

        // Save the updated userData back to local storage
        localStorage.setItem('userDetails', JSON.stringify(userArray));
        console.log("Password updated successfully!");
        // Optionally, you can clear the form fields or show a success message
    } else {
        console.error("Email not found in local storage.");
    }

}
function showToast(message) {
    let toast = $("<div class='toast'></div>").text(message);
    $("body").append(toast);
    toast.fadeIn(300).delay(2000).fadeOut(300, function () {
        $(this).remove();
    });
}
