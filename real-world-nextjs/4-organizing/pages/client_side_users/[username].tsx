import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { User } from "..";

export async function getServerSideProps(ctx: { query: { username: string } }) {
  const { username } = ctx.query;
  return {
    props: {
      username,
      authorization: process.env.API_TOKEN,
    },
  };
}

function UserData({ user }: { user: User }) {
  return (
    <div style={{ display: "flex" }}>
      <Image
        src={user.profile_picture}
        alt={user.username}
        width={150}
        height={150}
      />
      <div>
        <div>
          <b>Username:</b> {user.username}
        </div>
        <div>
          <b>Full name:</b>
          {user.first_name} {user.last_name}
        </div>
        <div>
          <b>Email:</b> {user.email}
        </div>
        <div>
          <b>Company:</b> {user.company}
        </div>
        <div>
          <b>Job title:</b> {user.job_title}
        </div>
      </div>
    </div>
  );
}

function UserPage({
  username,
  authorization,
}: {
  username: string;
  authorization: string;
}) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  useEffect(() => {
    async function fetchData() {
      const req = await fetch(`/api/singleUser?username=${username}`, {
        headers: { authorization },
      });
      const reqData = await req.json();

      setLoading(false);
      setData(reqData);
    }

    fetchData();
  }, []);

  return (
    <div>
      <div>
        <Link href="/" passHref>
          Back to home
        </Link>
      </div>
      <hr />
      {loading && <div>Loading user data...</div>}
      {data && <UserData user={data} />}
    </div>
  );
}
export default UserPage;
