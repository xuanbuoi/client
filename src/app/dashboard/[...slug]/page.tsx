'use client'
import Connect from '@/components/admin/Connect'
import CreditCard from '@/components/admin/CreditCard'
import EditConnect from '@/components/admin/EditConnect'
import EditImg from '@/components/admin/EditImg'
import EditPro from '@/components/admin/EditPro'
import EditUser from '@/components/admin/EditUser'
import History from '@/components/admin/History'
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
// export default Slug
import Navbar from '@/components/admin/Navbar'
import Products from '@/components/admin/Products'
import Recharge from '@/components/admin/Recharge'
import Slidebar from '@/components/admin/SlideBar'
import Users from '@/components/admin/Users'
import Withdraw from '@/components/admin/Withdraw'
import Head from 'next/head'
const routes = [
  {
    path: 'users',
    component: <Users />
  },
  {
    path: 'products',
    component: <Products />
  },
  {
    path: 'connects',
    component: <Connect />
  },
  {
    path: 'recharge',
    component: <Recharge />
  },
  {
    path: 'withdraw',
    component: <Withdraw />
  },
  {
    path: 'credits',
    component: <CreditCard />
  },
  {
    path: 'history',
    component: <History />
  }
]

const Slug = ({ params }: { params: any }) => {
  const { slug } = params

  return (
    <>
      {slug[1] === 'edit' && (
        <>
          <div>
            <Navbar />
            <div className="flex">
              <Slidebar />
              <div className="ml-64 h-screen flex-1">
                <div className="p-4 ">
                  <EditImg id={slug[0]} />
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {slug[0] === 'products' && slug[2] === 'edit' && (
        <>
          <div>
            <Navbar />
            <div className="flex">
              <Slidebar />
              <div className="ml-64 h-screen flex-1">
                <div className="p-4 ">
                  <EditPro id={slug[1]} />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {slug[0] === 'connects' && slug[2] === 'edit' && (
        <>
          <div>
            <Navbar />
            <div className="flex">
              <Slidebar />
              <div className="ml-64 h-screen flex-1">
                <div className="p-4 ">
                  <EditConnect id={slug[1]} />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {slug[0] === 'users' && slug[2] === 'edit' && (
        <>
          <div>
            <Navbar />
            <div className="flex">
              <Slidebar />
              <div className="ml-64 h-screen flex-1">
                <div className="p-4 ">
                  <EditUser id={slug[1]} />
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {routes.map((route, index) => {
        if (route.path === `${slug}`) {
          return (
            <>
              <Head>
                {/* <title>{route.path.charAt(0).toUpperCase()}</title> */}
                <title>long</title>
              </Head>
              <div key={index}>
                <Navbar />
                <div className="flex">
                  <Slidebar />
                  <div className="ml-64 h-screen flex-1">
                    <div className="p-4 ">{route.component}</div>
                  </div>
                </div>
              </div>
            </>
          )
        }
      })}
    </>
  )
}

export default Slug
