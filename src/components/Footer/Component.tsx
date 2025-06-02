import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer, Service, ServicesCollection } from '@/payload-types'

import { CMSLink } from '../Link'
import { Logo } from '@/components/Logo/Logo'

export async function Footer() {
  const footerData = (await getCachedGlobal('footer', 1)()) as Footer
  const services = (await getCachedGlobal('services', 0)()) as Service

  const navItems = footerData?.navItems || []

  const year = new Date().getFullYear()

  return (
    <footer className="text-gray-600 body-font">
      <div className="container p-6 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        <div className="text-left">
          <Link className="flex items-center" href="/">
            <Logo />
          </Link>
        </div>
        <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:justify-end">
          <div className="px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
              SERVICES
            </h2>
            <nav className="list-none mb-10 flex flex-col gap-1">
              {services.services?.map(({ service }, i) => {
                return (
                  <CMSLink
                    key={i}
                    className="hover:underline"
                    label={(service as ServicesCollection).title}
                    url={`/services/${(service as ServicesCollection).slug}`}
                  />
                )
              })}
            </nav>
          </div>

          <div className="px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
              LINKS
            </h2>
            <nav className="list-none mb-10 flex flex-col gap-1">
              {navItems.map(({ link }, i) => {
                return <CMSLink key={i} className="hover:underline" {...link} />
              })}
            </nav>
          </div>

          <div className="px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
              CONTACT
            </h2>
            <nav className="list-none mb-10">
              <li>
                <a className="text-gray-600 hover:text-gray-800">
                  Call: {footerData?.contact?.call}
                </a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800">
                  Chat: {footerData?.contact?.chat}
                </a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800">
                  Email: {footerData?.contact?.email}
                </a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800">
                  Address: {footerData?.contact?.address}
                </a>
              </li>
            </nav>
          </div>
        </div>
      </div>
      <div className="bg-gray-100">
        <div className="container mx-auto py-4 pb-14 md:py-4 px-5 flex flex-wrap flex-col sm:flex-row">
          <p className="text-gray-500 text-sm">© {year} Unisys Overseas. All rights reserved.</p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-2">
            <a
              href={footerData?.socials?.facebook}
              className="text-gray-500 hover:text-secondary cursor-pointer"
            >
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
            <a
              href={footerData?.socials?.twitter}
              className="ml-3 text-gray-500 hover:text-secondary cursor-pointer"
            >
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
            <a
              href={footerData?.socials?.instagram}
              className="ml-3 text-gray-500 hover:text-secondary cursor-pointer"
            >
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
              </svg>
            </a>
            <a
              href={footerData?.socials?.linkedin}
              className="ml-3 text-gray-500 hover:text-secondary cursor-pointer"
            >
              <svg
                fill="currentColor"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="none"
                  d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                ></path>
                <circle cx="4" cy="4" r="2" stroke="none"></circle>
              </svg>
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}
