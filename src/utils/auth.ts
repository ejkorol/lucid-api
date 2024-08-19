import bcrypt from "bcrypt";

const saltRounds = 10;

export const hashPassword = (password: string) => {
  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) return null;
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) return null;
      return hash;
    });
  });
};

export const compareHash = (password: string, hash: string) => {
  bcrypt.compare(password, hash, (err, result) => {
    if (err) return null;
    return result;
  });
};
