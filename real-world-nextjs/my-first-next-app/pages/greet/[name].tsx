export async function getServerSideProps({
  params,
}: {
  params: { name: string };
}) {
  const { name } = params as { name: string };

  return {
    props: {
      name,
    },
  };
}

function Greet({ name }: { name: string }) {
  return <h1> Hello, {name}! </h1>;
}

export default Greet;
