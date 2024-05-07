function emailValidation(email) {
  return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email));

}

function validatePassword(password) {

  // Define your password criteria
  let minLength = 8;
  let hasLowerCase = /[a-z]/.test(password);
  let hasNumbers = /\d/.test(password);
  let hasSpecialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);

  // Check if password meets all criteria
  return (password.length >= minLength &&
    hasLowerCase &&
    hasNumbers &&
    hasSpecialChars);
}

function validateFullName(fullname) {

  // Regular expression for validating first name (allows letters only)
  return (/^[a-zA-Z]+$/.test(fullname));
}

function validateProduct(name, price, brand) {
  // Convert price to a number
  let productPrice = parseInt(price);
  if (name == null || name == "") {
    if (isNaN(productPrice)) {
      if (brand == null || brand == "") {
          return false;
      }
      else{
          return true;
      }
    }
    else{
      return true;
    }
  }
  else{
    return true;
  }
}