import Link from "next/link";
import styles from "./Pagination.module.scss";
import _ from "lodash";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useRouter } from "next/router";
import { PER_PAGE } from "@/config/index";
export default function Pagination({ pagination }) {
  const lastPage = Math.ceil(pagination.total / PER_PAGE);
  const paginationCount = _.range(1, lastPage + 1);
  const {
    query: { page: currentPage },
    asPath,
  } = useRouter();
  const prev = pagination.page > 1 ? `/events?page=${pagination.page - 1}` : asPath;
  const next =
    pagination.page < pagination.pageCount ? `/events?page=${pagination.page + 1}` : asPath;
  return (
    <div className={styles.pagination}>
      <Link href={prev}>
        <a>
          <FaAngleLeft />
        </a>
      </Link>
      {paginationCount.map((page) => (
        <Link href={`/events?page=${page}`} key={page}>
          <a className={page === +currentPage ? styles.current : ""}>{page}</a>
        </Link>
      ))}
      <Link href={next}>
        <a>
          <FaAngleRight />
        </a>
      </Link>
    </div>
  );
}
