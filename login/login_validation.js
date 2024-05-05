$(document).ready(function () {
    $("#login").click(function () {
        let email = $("#email").val();
        let password = $("#password").val();
        let userData = {
            "email": email,
            "password": password
        };
        if (emailValidation(email)) {
            if (validatePassword(password)) {
                let userInformation = getUserDetails(userData);
                console.log(userInformation);
                if (userInformation != null &&userInformation.username!=null) {
                    alert("Welcome " + userInformation.username);
                    window.location.href = "../product_form/product_form.html";
                }
                else if(userInformation == "Please enter the correct password"){
                    showToast("Please enter the correct password");
                }
                else {
                    showToast("No user found. Please sign up first.");
                    return;
                }
            } else {
                showToast("Password length should be 8 with special character and numbers");
            }
        }
        else {
            showToast("please enter valid email");
        }

        //clearing input fields
        $("#email").val("");
        $("#password").val("");
    });
    $("#lock").click(function () {
        let password = $("#password");
        if (password.prop("type") == "password") {
            $(this).toggleClass('fa fa-lock fa fa-unlock-alt');
            password.attr("type", "text");
        }
        else {
            $(this).toggleClass('fa fa-unlock-alt fa fa-lock');
            password.attr("type", "password");
        }
    });

    $("#sign_up").click(function () {
        window.location.href = "../sign_up/sign_up.html";
    });
});

