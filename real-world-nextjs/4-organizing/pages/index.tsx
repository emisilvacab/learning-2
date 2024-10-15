import { useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import GET_LATEST_SIGNS from "@/lib/apollo/queries/getLatestsSigns";
import { useQuery } from "@apollo/client";

export type User = {
  id: string;
  username: string;
  profile_picture: string;
  first_name: string;
  last_name: string;
  company: string;
  email: string;
  job_title: string;
};

export async function getServerSideProps() {
  const usersReq = await axios.get("https://api.rwnjs.com/04/users", {
    headers: {
      authorization: process.env.API_TOKEN,
    },
  });

  return {
    props: {
      users: usersReq.data,
    },
  };
}

function HomePage(params: { users: Array<User> }) {
  const {loading, data} = useQuery(GET_LATEST_SIGNS, {fetchPolicy: 'no-cache'});

  return (
    <ul>
      {params.users.map((user: User) => (
        <li key={user.id}>
          <Link href={`/users/${user.username}`} passHref>
            <a> {user.username} </a>
          </Link>
        </li>
      ))}
    </ul>
  );
}
export default HomePage;
