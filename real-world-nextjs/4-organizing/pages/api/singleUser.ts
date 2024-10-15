import axios from "axios";
export default async function handler(req: any, res: any) {
  const username = req.query.username;
  const API_ENDPOINT = process.env.API_ENDPOINT;
  const API_TOKEN = process.env.API_TOKEN;
  const userReq = await axios.get(`${API_ENDPOINT}/04/users/${username}`, {
    headers: { authorization: API_TOKEN },
  });

  res
    .status(200)
    .json(userReq.data);
}
