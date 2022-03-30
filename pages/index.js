import EventItem from "@/components/EventItem";
import Layout from "@/components/Layout";
import { API_URL, POPULATE_FILTER } from "@/config/index";
import axios from "axios";
import Link from "next/link";

export default function Home({ data }) {
  return (
    <Layout>
      <div className="main">
        <h1>Upcoming Events</h1>
        {data?.length === 0 && <h3>No Upcoming Events</h3>}
        {data.map((evt) => (
          <EventItem key={evt.id} evt={evt.attributes} id={evt.id} />
        ))}
        {data.length > 0 && (
          <Link href={{ pathname: "/events", query: { page: 1 } }}>
            <a className="btn-secondary">Show More</a>
          </Link>
        )}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const { data } = await axios
    .get(`${API_URL}/api/events?${POPULATE_FILTER}`)
    .then((res) => res.data);
  return {
    props: { data: data?.slice(0, 3) },
  };
}
