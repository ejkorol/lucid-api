import api from "./api";
import "dotenv/config";

const PORT = process.env.PORT || 3000;

api.listen(PORT, () => {
  console.log(`API is running on port: ${PORT}`);
});
