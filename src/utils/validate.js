const validate = (formData) => {
  const errors = {};

  if (!formData.riderFirstName) {
    errors.riderFirstName = "Please add your first name.";
  }

  if (!formData.riderLastName) {
    errors.riderLastName = "Please add your last name.";
  }

  if (!formData.riderEmail) {
    errors.riderEmail = "Please add your email.";
  } else if (!validateEmail(formData.riderEmail)) {
    errors.riderEmail = "Email format is invalid.";
  }

  if (!formData.riderPhoneNumber) {
    errors.riderPhoneNumber = "Please add your phone number.";
  } else if (!validatePhoneNumber(formData.riderPhoneNumber)) {
    errors.riderPhoneNumber = "Phone number is incomplete";
  }

  if (!formData.vendorFirstName) {
    errors.vendorFirstName = "Please add your first name.";
  }

  if (!formData.vendorLastName) {
    errors.vendorLastName = "Please add your last name.";
  }

  if (!formData.vendorEmail) {
    errors.vendorEmail = "Please add your email.";
  } else if (!validateEmail(formData.vendorEmail)) {
    errors.vendorEmail = "Email format is invalid.";
  }

  if (!formData.officialEmail) {
    errors.officialEmail = "Please add your email.";
  } else if (!validateEmail(formData.officialEmail)) {
    errors.officialEmail = "Email format is invalid.";
  }

  if (!formData.vendorPhoneNumber) {
    errors.vendorPhoneNumber = "Please add your phone number.";
  } else if (!validatePhoneNumber(formData.vendorPhoneNumber)) {
    errors.vendorPhoneNumber = "Phone number is incomplete";
  }

  if (!formData.riderNextOfKinName) {
    errors.riderNextOfKinName = "Required.";
  }

  if (!formData.riderGuarantorName) {
    errors.riderGuarantorName = "Required.";
  }

  if (!formData.riderNextOfKinPhoneNumber) {
    errors.riderNextOfKinPhoneNumber = "Please add next of kin phone number.";
  } else if (!validatePhoneNumber(formData.riderNextOfKinPhoneNumber)) {
    errors.riderNextOfKinPhoneNumber = "Phone number is incomplete";
  }

  if (!formData.officialPhoneNumber) {
    errors.officialPhoneNumber = "Please add next of kin phone number.";
  } else if (!validatePhoneNumber(formData.officialPhoneNumber)) {
    errors.officialPhoneNumber = "Phone number is incomplete";
  }

  if (!formData.riderGuarantorPhoneNumber) {
    errors.riderGuarantorPhoneNumber = "Please add guarantor phone number.";
  } else if (!validatePhoneNumber(formData.riderGuarantorPhoneNumber)) {
    errors.riderGuarantorPhoneNumber = "Phone number is incomplete";
  }

  if (!formData.riderVehicleType) {
    errors.riderVehicleType = "Required.";
  }

  if (!formData.restaurantName) {
    errors.restaurantName = "Required.";
  }

  if (!formData.restaurantAddress) {
    errors.restaurantAddress = "Required.";
  }

  if (formData.riderVehicleType !== "bicycle" && !formData.riderPlateNumber) {
    errors.riderPlateNumber = "Plate number is required";
  }

  if (!formData.riderPassword) {
    errors.riderPassword = "Please add your password.";
  } else if (formData.riderPassword.length < 8) {
    errors.riderPassword = "Password must be at least 8 characters.";
  }

  if (formData.riderPassword && !formData.riderConfirmPassword) {
    errors.riderConfirmPassword = "Please re-enter password.";
  } else if (formData.riderPassword !== formData.riderConfirmPassword) {
    errors.riderConfirmPassword = "Confirm password did not match.";
  }

  if (!formData.vendorPassword) {
    errors.vendorPassword = "Please add your password.";
  } else if (formData.vendorPassword.length < 8) {
    errors.vendorPassword = "Password must be at least 8 characters.";
  }

  if (formData.vendorPassword && !formData.vendorConfirmPassword) {
    errors.vendorConfirmPassword = "Please re-enter password.";
  } else if (formData.vendorPassword !== formData.vendorConfirmPassword) {
    errors.vendorConfirmPassword = "Confirm password did not match.";
  }

  if (!formData.riderGuarantorRelationship) {
    errors.riderGuarantorRelationship = "Required.";
  }

  if (!formData.riderBankName) {
    errors.riderBankName = "Required.";
  }

  if (!formData.riderAccountNumber) {
    errors.riderAccountNumber = "Required.";
  }

  if (!formData.riderAccountName) {
    errors.riderAccountName = "Required.";
  }

  return errors;
};

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function validatePhoneNumber(phoneNumber) {
  const regex = /^\d{11}$/;
  return regex.test(phoneNumber);
}

export default validate;
