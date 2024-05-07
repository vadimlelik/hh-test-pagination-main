import Head from "next/head";
import {Inter} from "next/font/google";
import {Alert, Container} from "react-bootstrap";
import {GetServerSideProps, GetServerSidePropsContext} from "next";
import Pagination from "@/components/Pagination";
import UsersTable from "@/components/UsersTable";
import _ from "lodash";
import {useState} from "react";

const inter = Inter({subsets: ["latin"]});

export type TUserItem = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  updatedAt: string;
};

export type TGetServerSideProps = {
  statusCode: number;
  users: TUserItem[];
  totalPages: number;
  currentPage: number;
  firstPage: number;
  lastPage: number;
};

type OrderType = boolean | "desc" | "asc";

interface SortByState {
  iter: string;
  order: OrderType;
}

export const getServerSideProps = (async (ctx: GetServerSidePropsContext): Promise<{ props: TGetServerSideProps }> => {
  const page = ctx.query.page || 1;
  const perPage = ctx.query.perPage || 20;

  try {
    const res = await fetch(`http://localhost:3000/users/?page=${page}&perPage=${perPage}`, {method: "GET"});

    if (!res.ok) {
      return {props: {statusCode: res.status, users: [], totalPages: 1, currentPage: 1, firstPage: 1, lastPage: 1}};
    }

    return {
      props: {statusCode: 200, ...(await res.json())},
    };
  } catch (e) {
    return {props: {statusCode: 500, users: [], totalPages: 1, currentPage: 1, firstPage: 1, lastPage: 1}};
  }
}) satisfies GetServerSideProps<TGetServerSideProps>;

export default function Home({statusCode, users, currentPage, firstPage, lastPage, totalPages}: TGetServerSideProps) {


  const [sortBy, setSortBy] = useState<SortByState>({iter: 'name', order: 'desc'});
  const sortedUsers = _.orderBy(users, [sortBy.iter], [sortBy.order]);

  const handleSort = (item: string) => {
    if (sortBy.iter === item) {
      setSortBy((prevState) => ({...prevState, order: prevState.order === 'asc' ? 'desc' : 'asc'}));
    } else {
      setSortBy({iter: item, order: 'asc'});
    }
  }

  if (statusCode !== 200) {
    return <Alert variant={"danger"}>Ошибка {statusCode} при загрузке данных</Alert>;
  }


  return (
    <>
      <Head>
        <title>Тестовое задание</title>
        <meta name="description" content="Тестовое задание"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <main className={inter.className}>
        <Container>
          <h1 className={"mb-5"}>Пользователи</h1>
          <UsersTable users={sortedUsers} onSort={handleSort}/>
          <Pagination totalPages={totalPages} firstPage={firstPage} lastPage={lastPage} currentPage={currentPage}/>
        </Container>
      </main>
    </>
  );
}
