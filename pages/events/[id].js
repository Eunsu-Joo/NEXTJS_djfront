import React, { useContext } from "react";
import Layout from "@/components/Layout";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import defaultImage from "@/image/event-default.png";
import { useRouter } from "next/router";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import { BsArrowLeftShort } from "react-icons/bs";
import { API_URL, POPULATE_FILTER } from "@/config/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EventMap from "@/components/EventMap";
import { parseCookie } from "@/helpers/index";
import AuthContext from "@/context/AuthContext";
export default function EventPage({ data, token }) {
  const { attributes: evt } = data;
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const imgUrl = evt.image.data ? evt.image.data.attributes.url : defaultImage;
  const author = evt.users_permissions_user.data.attributes.username;
  const isAuth = user && user.username === author;
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
    <Layout title={`디제잉 상세 ${evt.name} `}>
      <div className="eventPage">
        <span>
          {new Date(evt.date).toLocaleDateString("kr")} at {evt.time}
        </span>
        <span className="author">
          Author : <strong>{author}</strong>
        </span>
        <ToastContainer hideProgressBar />
        <h1>{evt.name}</h1>
        {isAuth && (
          <p className="controls">
            <Link href={`/events/edit/${data.id}`}>
              <a>
                <FaPencilAlt /> Edit Event
              </a>
            </Link>
            <a href="#" className="delete" onClick={deleteHandler}>
              <FaTimes /> Delete Event
            </a>
          </p>
        )}
        <div className="image">
          <Image src={imgUrl} width={960} height={600} alt="image" objectFit="contain" />
        </div>
        <h3>Performers:</h3>
        <p>{evt.performers}</p>
        <h3>Description:</h3>
        <p>{evt.description}</p>
        <h3>Venue: {evt.venue}</h3>
        <p>{evt.address}</p>
        <EventMap evt={evt} />
        <a className="back" onClick={() => router.back()}>
          {" "}
          <BsArrowLeftShort /> Go Back
        </a>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ query: { id }, req }) {
  const { data } = await axios
    .get(`${API_URL}/api/events/${id}?${POPULATE_FILTER}`)
    .then((res) => res.data);
  const token = parseCookie(req).token || null;
  return {
    props: { data: data, token: token },
  };
}
