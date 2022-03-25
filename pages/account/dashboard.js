import Layout from "@/components/Layout";
import React from "react";
import { parseCookie } from "@/helpers/index";
import axios from "axios";
import { API_URL } from "@/config/index";
import { useRouter } from "next/router";
import DashboardEventItem from "@/components/DashboardEventItem";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function DashboardPage({ events, token }) {
  const router = useRouter();
  const deleteHandler = () => {
    if (confirm("are you sure delete?")) {
      deleteEvent();
      deleteImage();
      router.push("/events?page=1");
    }
  };
  const deleteEvent = async () => {
    const res = await fetch(`${API_URL}/api/events/${data.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 401) {
      toast.error("unAuthorization ! Check your account!");
    }
  };
  const deleteImage = async () => {
    const res = await fetch(`${API_URL}/api/upload/files/${evt.image.data.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 401) {
      toast.error("unAuthorization ! Check your account!");
    }
  };
  return (
    <Layout title="User Dashboard">
      <div className="dashboardPage">
        <h1>Dashboard</h1>
        <h3>My Events</h3>
        <ToastContainer hideProgressBar />
        {events.length > 0 ? (
          events.map((evt) => (
            <DashboardEventItem key={evt.id} evt={evt} handleDelete={deleteHandler} />
          ))
        ) : (
          <p>No DJ Events</p>
        )}
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookie(req);
  const { data } = await axios
    .get(`${API_URL}/api/events/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
  return {
    props: { events: data, token },
  };
}
