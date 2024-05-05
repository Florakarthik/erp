$(document).ready(function () {
    $("#signUp").click(function () {
        //localStorage.clear();
        let userNameInput = $("#userName").val().trim();
        let email = $("#email").val();
        let signUpPassword = $("#password").val();
        let userDetails = {
            "username": userNameInput,
            "email": email,
            "password": signUpPassword
        };

        if (validateFullName(userNameInput) != "" && validateFullName(userNameInput)) {
                if (emailValidation(email)) {
                    if (validatePassword(signUpPassword)) {
                        if(saveUserDetails(userDetails)) {
                            showToast("user added");
                            window.location.href = "../login/login.html";
                        }
                        else{
                            showToast("user already added");
                        }
                    }
                    else {
                        showToast("Password length should be 8 with special character and numbers");
                    }
                }
                else {
                    showToast("Please enter valid email");
                }
            }
            else {
                showToast("Please enter valid Username");
            }
        
       //clearing input fields
        $("#userName").val("");
        $("#email").val("");
        $("#password").val("");
    });
    $("#lock").click(function () {
        let signUpPassword = $("#password");
        if (signUpPassword.prop("type") == "password") {
            $(this).toggleClass('fa fa-lock fa fa-unlock-alt');
            signUpPassword.attr("type", "text");
        }
        else {
            $(this).toggleClass('fa fa-unlock-alt fa fa-lock');
            signUpPassword.attr("type", "password");
        }
    });
    $("#log_in").click(function () {
        window.location.href = "../login/login.html";
    });

});
