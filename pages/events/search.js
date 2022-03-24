import EventItem from "@/components/EventItem";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { BsArrowLeftShort } from "react-icons/bs";
import qs from "qs";
export default function SearchPage({ data }) {
  const router = useRouter();
  return (
    <Layout title="search Result">
      <Link href="/events">
        <a>
          {" "}
          <BsArrowLeftShort /> Go Back
        </a>
      </Link>
      <h1>Search Results for {router.query.term}</h1>
      {data?.length === 0 && <h3>No Search Results</h3>}
      {data.map((evt) => (
        <EventItem key={evt.id} evt={evt.attributes} id={evt.id} />
      ))}
    </Layout>
  );
}

export async function getServerSideProps({ query: { term } }) {
  const query = qs.stringify({
    filters: {
      $or: [
        {
          name: { $contains: term },
        },
        {
          performers: { $contains: term },
        },
        {
          description: { $contains: term },
        },
        {
          venue: { $contains: term },
        },
      ],
    },
  });
  const { data } = await axios
    .get(`${API_URL}/api/events?${query}&populate=*`)
    .then((res) => res.data);
  return {
    props: { data },
  };
}
