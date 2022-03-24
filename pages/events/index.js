import EventItem from "@/components/EventItem";
import Layout from "@/components/Layout";
import { API_URL, PER_PAGE, POPULATE_FILTER } from "@/config/index";
import axios from "axios";
import Link from "next/link";
import { BsArrowLeftShort } from "react-icons/bs";
import qs from "qs";
import Pagination from "@/components/Pagination";
export default function EventsPage({ data, pagination }) {
  return (
    <Layout>
      <h1>All Events</h1>
      {data?.length === 0 && <h3>No Upcoming Events</h3>}
      {data.map((evt) => (
        <EventItem key={evt.id} evt={evt.attributes} id={evt.id} />
      ))}
      <Link href="/">
        <a>
          {" "}
          <BsArrowLeftShort /> Go Back
        </a>
      </Link>
      <Pagination pagination={pagination} />
    </Layout>
  );
}
export async function getServerSideProps({ query: { page = 1 } }) {
  const query = qs.stringify(
    {
      pagination: {
        page: page,
        pageSize: PER_PAGE,
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  const res = await axios
    .get(`${API_URL}/api/events?${query}&${POPULATE_FILTER}`)
    .then((response) => response.data);
  const { data } = res;
  const { pagination } = res.meta;
  return {
    props: { data, pagination },
  };
}
