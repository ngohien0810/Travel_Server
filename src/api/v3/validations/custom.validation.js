const objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" phải là 1 id hợp lệ.');
  }
  return value;
};

const password = (value, helpers) => {
  if (value.length < 8) {
    return helpers.message("Mật khẩu tối thiếu 8 ký tự.");
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.message("Mật khẩu phải chứa ít nhất 1 chữ cái và 1 số");
  }
  return value;
};

module.exports = {
  objectId,
  password,
};
