"use client";
import Image from "next/image";
import logo from "./assets/logo.svg"
import { AlertCircle, Search, Check } from 'lucide-react';
import React, { useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('Owners');
  const [activeStatus, setActiveStatus] = useState('All');
  const [activeView, setActiveView] = useState('Grid View');

  const statuses = [
    { name: 'All', color: 'bg-blue-100 text-blue-600' },
    { name: 'Registered', color: 'bg-green-400 text-green-600' },
    { name: 'Pending', color: 'bg-yellow-400 text-yellow-600' },
    { name: 'Abandoned', color: 'bg-red-400 text-red-600' },
    { name: 'Others', color: 'bg-blue-400 text-blue-600' },
  ];

  const owners = [
    { name: 'Tesla, Inc.', checked: true },
    { name: 'LEGALFORCE RAPC.', checked: false },
    { name: 'SpaceX Inc.', checked: false },
    { name: 'SpaceX Inc.', checked: false },
  ];
  const tableData = [
    {
      details: {
        name: 'Meta Logo',
        company: 'FACEBOOK INC.',
        number: '88713620',
        date: '26th Jan 2020',
      },
      status: {
        state: 'Live/Registered',
        date: '26 Jun 2020',
        renewalDate: '26 Dec 2027',
      },
      description: 'Computer services, Social Media, Networking, Virtual Communities, Community',
      classes: ['Class 45', 'Class 8', 'Class 8'],
    },
    // Duplicate row data for the second row
    {
      details: {
        name: 'Meta Logo',
        company: 'FACEBOOK INC.',
        number: '88713620',
        date: '26th Jan 2020',
      },
      status: {
        state: 'Live/Registered',
        date: '26 Jun 2020',
        renewalDate: '26 Dec 2027',
      },
      description: 'Computer services, Social Media, Networking, Virtual Communities, Community',
      classes: ['Class 45', 'Class 8', 'Class 8'],
    },
    {
      details: {
        name: 'Meta Logo',
        company: 'FACEBOOK INC.',
        number: '88713620',
        date: '26th Jan 2020',
      },
      status: {
        state: 'Live/Registered',
        date: '26 Jun 2020',
        renewalDate: '26 Dec 2027',
      },
      description: 'Computer services, Social Media, Networking, Virtual Communities, Community',
      classes: ['Class 45', 'Class 8', 'Class 8'],
    },
  ];

  return (
    <div className="flex flex-col items-center">
      {/*Navbar*/}
      <div className="nav bg-[#F8FAFE] h-28 w-full flex justify-start pl-16 items-center border-solid border-b-8 border-blue-100">
        <Image src={logo} className="logo" alt="logo w-24" />
        <div className="search ml-14 w-[500px] h-[50px] flex justify-start items-center rounded-md border-solid border-2 border-gray-300 bg-white text-gray-500">
          <svg className="ml-4" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.976 20.4554L15.0377 16.5101M17.2202 11.2373C17.2202 13.2164 16.434 15.1145 15.0345 16.514C13.6351 17.9134 11.737 18.6996 9.75789 18.6996C7.77876 18.6996 5.8807 17.9134 4.48125 16.514C3.0818 15.1145 2.29559 13.2164 2.29559 11.2373C2.29559 9.25819 3.0818 7.36013 4.48125 5.96068C5.8807 4.56123 7.77876 3.77502 9.75789 3.77502C11.737 3.77502 13.6351 4.56123 15.0345 5.96068C16.434 7.36013 17.2202 9.25819 17.2202 11.2373V11.2373Z" stroke="#636363" stroke-width="1.75583" stroke-linecap="round"/>
          </svg>
          <input type="text" placeholder="Search Trademark Here eg. Mickey Mouse " className="searchbar h-8 border-none focus:outline-none bg-none w-[450px] " />
        </div>
        <button className="ml-4 bg-blue-500 text-white rounded-md h-[50px] w-24">Search</button>
      </div>
      {/*Main*/}
      <div className="main w-full p-10">
        {/*First Section*/}
        <div className="found font-semibold h-10 border-solid border-b-2 border-gray-300">About 159 Trademarks found for “nike”</div>
        {/*Second Section*/}
        <div className="flex flex-wrap justify-between items-center pt-5 pb-5">
          <div className="suggestion flex">
            <div className="suggestion-title font-semibold h-8 flex justify-center items-center">Also try searching for</div>
            <div className="suggestion-list flex flex-wrap">
              <div className="suggestion-item ml-6 bg-[#FEF7F0] h-8 w-12 flex justify-center items-center border-[1px] border-[#E7760E] border-solid rounded-md text-[#E7760E] text-sm">nike*</div>
              <div className="suggestion-item ml-6 bg-[#FEF7F0] h-8 w-12 flex justify-center items-center border-[1px] border-[#E7760E] border-solid rounded-md text-[#E7760E] text-sm">ike*</div>
            </div>
          </div>
          <div className="options flex w-80 justify-between items-center pr-20">
            <div className="filter flex justify-center items-center border-gray-400 border-[1px] border-solid rounded-md text-gray-400 text-sm h-12 w-24">
              <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.83751 2.50004H11.1708L6.99584 7.75004L2.83751 2.50004ZM0.545843 2.17504C2.22918 4.33337 5.33751 8.33337 5.33751 8.33337V13.3334C5.33751 13.7917 5.71251 14.1667 6.17084 14.1667H7.83751C8.29584 14.1667 8.67084 13.7917 8.67084 13.3334V8.33337C8.67084 8.33337 11.7708 4.33337 13.4542 2.17504C13.8792 1.62504 13.4875 0.833374 12.7958 0.833374H1.20418C0.51251 0.833374 0.120843 1.62504 0.545843 2.17504Z" fill="#575757"/>
              </svg>
              <span className="ml-2">Filter</span>
            </div>
            <div className="share flex justify-center items-center rounded-full border-solid border-gray-400 border-[1px] text-gray-400 text-sm h-10 w-10">
              <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 12.4333C12.3667 12.4333 11.8 12.6833 11.3667 13.075L5.425 9.61662C5.46667 9.42495 5.5 9.23328 5.5 9.03328C5.5 8.83328 5.46667 8.64162 5.425 8.44995L11.3 5.02495C11.75 5.44162 12.3417 5.69995 13 5.69995C14.3833 5.69995 15.5 4.58328 15.5 3.19995C15.5 1.81662 14.3833 0.699951 13 0.699951C11.6167 0.699951 10.5 1.81662 10.5 3.19995C10.5 3.39995 10.5333 3.59162 10.575 3.78328L4.7 7.20828C4.25 6.79162 3.65833 6.53328 3 6.53328C1.61667 6.53328 0.5 7.64995 0.5 9.03328C0.5 10.4166 1.61667 11.5333 3 11.5333C3.65833 11.5333 4.25 11.275 4.7 10.8583L10.6333 14.325C10.5917 14.5 10.5667 14.6833 10.5667 14.8666C10.5667 16.2083 11.6583 17.2999 13 17.2999C14.3417 17.2999 15.4333 16.2083 15.4333 14.8666C15.4333 13.525 14.3417 12.4333 13 12.4333ZM13 2.36662C13.4583 2.36662 13.8333 2.74162 13.8333 3.19995C13.8333 3.65828 13.4583 4.03328 13 4.03328C12.5417 4.03328 12.1667 3.65828 12.1667 3.19995C12.1667 2.74162 12.5417 2.36662 13 2.36662ZM3 9.86662C2.54167 9.86662 2.16667 9.49162 2.16667 9.03328C2.16667 8.57495 2.54167 8.19995 3 8.19995C3.45833 8.19995 3.83333 8.57495 3.83333 9.03328C3.83333 9.49162 3.45833 9.86662 3 9.86662ZM13 15.7166C12.5417 15.7166 12.1667 15.3416 12.1667 14.8833C12.1667 14.425 12.5417 14.05 13 14.05C13.4583 14.05 13.8333 14.425 13.8333 14.8833C13.8333 15.3416 13.4583 15.7166 13 15.7166Z" fill="#575757"/>
              </svg>
            </div>
            <div className="sort flex justify-center items-center rounded-full border-solid border-gray-400 border-[1px] text-gray-400 text-sm h-10 w-10">
              <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.5 10H5.5V8.33333H0.5V10ZM0.5 0V1.66667H15.5V0H0.5ZM0.5 5.83333H10.5V4.16667H0.5V5.83333Z" fill="#575757"/>
              </svg>
            </div>
          </div>
        </div>
        {/*Third Section*/}
        <div className="flex justify-between">
          {/*Table*/}
          {/*<table className="w-8/12 text-center">
            <tr className="border-solid border-b-[1px] border-gray-400">
              <th>Mark</th>
              <th>Details</th>
              <th>Status</th>
              <th>Class/Description</th>
            </tr>
            <tr>
              <td className="flex h-28" rowSpan={2}>
                <Image src={logo} className="logo" alt="logo w-16" />
              </td>
              <td className="">
                <div className="mark-name">Nike</div>
                <div className="mark-country">United States</div>
              </td>
              <td>
                <div className="mark-status">Registered</div>
                <div className="mark-date">07/12/2021</div>
              </td>
              <td>
                <div className="mark-class">Class 25</div>
                <div className="mark-desc">Clothing, footwear, headgear</div>
              </td>
            </tr>
            <tr>
              <td className="">
                <div className="mark-name">Nike</div>
                <div className="mark-country">United States</div>
              </td>
              <td>
                <div className="mark-status">Registered</div>
                <div className="mark-date">07/12/2021</div>
              </td>
              <td>
                <div className="mark-class">Class 25</div>
                <div className="mark-desc">Clothing, footwear, headgear</div>
              </td>
            </tr>
          </table>*/}
          <table className="w-8/12 border-collapse text-center">
          <thead>
            <tr className="border-solid border-b-[1px] border-gray-40">
              <th className="p-2">Mark</th>
              <th className="p-2">Details</th>
              <th className="p-2">Status</th>
              <th className="p-2">Class/Description</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index} className="">
                <td className="p-2">
                  <div className="bg-gray-200 p-4 rounded-lg w-28 h-28 flex items-center justify-center">
                    <AlertCircle size={36} className="text-gray-500" />
                  </div>
                </td>
                <td className="p-2 w-60 flex flex-col justify-between h-36">
                  <div className="div">
                    <div className="font-bold">{row.details.name}</div>
                    <div className="text-sm text-gray-600">{row.details.company}</div>
                  </div>
                  <div className="div">
                    <div className="text-sm">{row.details.number}</div>
                    <div className="text-sm text-gray-500">{row.details.date}</div>
                  </div> 
                </td>
                <td className="p-2 h-36">
                  <div className="flex flex-col justify-between items-center h-36">
                    <div className="flex flex-col">
                      <div className="flex items-center">
                        <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
                        <span className="text-green-500">{row.status.state}</span>
                      </div>
                      <div className="text-sm">on <b>{row.status.date}</b></div>
                    </div>
                    <div className="text-sm flex items-center font-semibold">
                      <svg className="h-4 w-4 mr-1 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      {row.status.renewalDate}
                    </div>
                  </div>             
                </td>
                <td className="p-2">
                  <div className="flex flex-col items-center">
                    <div>{row.description}</div>
                    <div className="flex mt-2 items-center">
                      {row.classes.map((cls, idx) => (
                        <span key={idx} className=" text-gray-700 px-2 py-1 rounded-full text-xs mr-1 flex items-center">
                          <svg width="17" height="22" viewBox="0 0 17 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M13.1289 10.1218L15.3047 5.61839L15.8339 5.87407C16.2085 6.05504 16.6589 5.89808 16.8399 5.52351C17.0208 5.14891 16.8639 4.69851 16.4893 4.51754C16.3119 4.43181 9.30265 1.04538 8.80709 0.805952C8.43252 0.624983 7.98212 0.781945 7.80115 1.15651C7.62018 1.53108 7.77714 1.98148 8.15171 2.16245L8.68093 2.41814L6.50513 6.92159C-0.456288 7.56705 -2.33925 17.1719 4.12813 20.2965C10.6042 23.4254 16.9495 15.9749 13.1289 10.1218ZM7.0169 8.39842C7.29679 8.38916 7.5484 8.22537 7.67021 7.97325L10.0374 3.07357L13.9481 4.96298L11.5809 9.86266C11.4591 10.1148 11.4872 10.4137 11.6538 10.6387C12.8302 12.2269 12.9644 13.8731 12.5923 15.2646L8.29117 13.1866C8.58073 12.4928 8.27935 11.683 7.59435 11.352L3.80026 9.51896C4.61344 8.88053 5.67642 8.44287 7.0169 8.39842ZM4.78353 18.94C1.35956 17.2857 0.87055 13.3112 2.71758 10.669L6.86988 12.6752C6.58031 13.3689 6.88169 14.1788 7.56669 14.5097L12.0157 16.6592C10.637 19.0657 7.69006 20.3443 4.78353 18.94Z" fill="#575757"/>
                          </svg>

                          {cls}
                        </span>
                      ))}
                      <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs flex items-center">...</span>
                    </div>
                  </div>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
          {/*Right Section*/}
          <div className="w-72 space-y-6 mr-16">
            {/* Status Section */}
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="font-bold mb-3">Status</h2>
              <div className="flex flex-wrap gap-2">
                {statuses.map((status) => (
                  <button
                    key={status.name}
                    className={`px-3 py-1 rounded-md text-sm ${
                      activeStatus === status.name ? 'bg-blue-100 text-gray-600 border-solid border-[1px] border-blue-400' : 'bg-none text-gray-600 border-solid border-[1px] border-gray-400'
                    }`}
                    onClick={() => setActiveStatus(status.name)}
                  >
                    {status.name !== 'All' && (
                      <span className={`inline-block w-2 h-2 rounded-full mr-1 ${status.color.split(' ')[0]}`}></span>
                    )}
                    {status.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Owners Section */}
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex space-x-4 mb-3">
                {['Owners', 'Law Firms', 'Attorneys'].map((tab) => (
                  <button
                    key={tab}
                    className={`${
                      activeTab === tab ? 'font-bold border-b-2 border-black' : 'text-gray-500'
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="relative mb-3">
                <input
                  type="text"
                  placeholder="Search Owners"
                  className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
              </div>
              <div className="space-y-2">
                {owners.map((owner) => (
                  <div key={owner.name} className="flex items-center">
                    <input
                      type="checkbox"
                      id={owner.name}
                      checked={owner.checked}
                      onChange={() => {}}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor={owner.name} className="ml-2 text-sm">
                      {owner.name}
                    </label>
                    {owner.checked && <Check className="ml-auto text-blue-600" size={16} />}
                  </div>
                ))}
              </div>
            </div>

            {/* Display Section */}
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="font-bold mb-3">Display</h2>
              <div className="flex rounded-lg bg-gray-100 p-1">
                {['Grid View', 'List View'].map((view) => (
                  <button
                    key={view}
                    className={`flex-1 py-1 text-sm rounded-md ${
                      activeView === view ? 'bg-white shadow' : 'text-gray-500'
                    }`}
                    onClick={() => setActiveView(view)}
                  >
                    {view}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
