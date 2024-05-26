$(document).ready(function () {
    $("#submit").click(function () {
        let email = $("#email").val();
        if (emailValidation(email)) {
            if (emailVerification(email)) {
                $("#wrapper-resetPassword").show();
            }
            else {
                showToast("Email not found");
                $("#email").val("");
            }
        }
        else {
            showToast("please enter valid email");
            $("#email").val("");

        }

    });
    $("#lockChangePassword").click(function () {
        let changePassword = $("#changePassword");
        if (changePassword.prop("type") == "password") {
            $(this).toggleClass('fa fa-lock fa fa-unlock-alt');
            changePassword.attr("type", "text");
        }
        else {
            $(this).toggleClass('fa fa-unlock-alt fa fa-lock');
            changePassword.attr("type", "password");
        }
    });
    $("#lockConfirmPassword").click(function () {
        let confirmPassword = $("#confirmPassword");
        if (confirmPassword.prop("type") == "password") {
            $(this).toggleClass('fa fa-lock fa fa-unlock-alt');
            confirmPassword.attr("type", "text");
        }
        else {
            $(this).toggleClass('fa fa-unlock-alt fa fa-lock');
            confirmPassword.attr("type", "password");
        }
    });

    $("#resetPassword").click(function () {
        let email = $("#email").val();
        let changePassword = $("#changePassword").val();
        let confirmPassword = $("#confirmPassword").val();
        if (validatePassword(changePassword, confirmPassword)) {
            if (changePassword == confirmPassword) {
                forgotPassword(email, confirmPassword);
                showToast("Password reset successfully!");
                window.location.href = "../login/login.html";

            }
            else {
                showToast("Password Not match");
            }

        }
        else {
            showToast("Password length should be 8 with special character and numbers");
        }


        //clearing input fields
        $("#changePassword").val("");
        $("#confirmPassword").val("");
    });
});