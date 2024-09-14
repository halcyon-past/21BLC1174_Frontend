"use client";
import Image from "next/image";
import logo from "./assets/logo.svg"
import { Search, Check } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
/*import data from '../utils/dummyData';*/

type TabName = 'Owners' | 'Law Firms' | 'Attorneys';

interface ListItem {
  name: string;
  checked: boolean;
}

interface SearchResult {
  _id: string;
  _source: {
    mark_identification: string;
    current_owner: string;
    registration_number: string;
    registration_date: number;
    status_date: number;
    renewal_date: number;
    status_code: number;
    status_type: string;
    mark_description_description: string[];
    class_codes: string[];
  };
}

type ListData = {
  [key in TabName]: ListItem[];
};

export default function Home() {
  const searchResultsRef = useRef<HTMLDivElement | null>(null);
  const [activeTab, setActiveTab] = useState<TabName>('Owners');
  const [activeStatus, setActiveStatus] = useState('All');
  const [activeView, setActiveView] = useState('Grid View');
  const [data, setData] = useState({ body: { hits: { hits: [] } } });
  const [tableData, setTableData] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [selectedResult, setSelectedResult] = useState<SearchResult | null>(null);
  const [listData, setListData] = useState<ListData>({
    Owners: [
      { name: 'Tesla, Inc.', checked: true },
      { name: 'LEGALFORCE RAPC.', checked: false },
      { name: 'SpaceX Inc.', checked: false },
    ],
    'Law Firms': [
      { name: 'Smith & Associates', checked: false },
      { name: 'Johnson Legal Group', checked: false },
    ],
    Attorneys: [
      { name: 'John Doe, Esq.', checked: false },
      { name: 'Jane Smith, Esq.', checked: false },
    ],
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchResultsRef.current && !searchResultsRef.current.contains(event.target as Node)) {
        setSearchResults([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const statuses = [
    { name: 'All', color: 'bg-blue-400 text-blue-600' },
    { name: 'Registered', color: 'bg-green-400 text-green-600' },
    { name: 'Pending', color: 'bg-yellow-400 text-yellow-600' },
    { name: 'Abandoned', color: 'bg-red-400 text-red-600' },
    { name: 'Others', color: 'bg-blue-400 text-blue-600' },
  ];

  const tabs = ['Owners', 'Law Firms', 'Attorneys'];

  const toggleCheck = (index:number) => {
    setListData(prevData => {
      const newData = { ...prevData };
      newData[activeTab] = [...newData[activeTab]];
      newData[activeTab][index] = {
        ...newData[activeTab][index],
        checked: !newData[activeTab][index].checked
      };
      return newData;
    });
  };

  const fetchSearchResults = async (query: string) => {
    const requestData = JSON.stringify({
      "input_query": query,
      "input_query_type": "",
      "sort_by": "default",
      "status": [],
      "exact_match": false,
      "date_query": false,
      "owners": [],
      "attorneys": [],
      "law_firms": [],
      "mark_description_description": [],
      "classes": [],
      "page": 1,
      "rows": 10,
      "sort_order": "desc",
      "states": [],
      "counties": []
    });
  
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://vit-tm-task.api.trademarkia.app/api/v3/us',
      headers: { 
        'accept': 'application/json, text/plain, */*', 
        'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8', 
        'content-type': 'application/json', 
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'
      },
      data: requestData
    };
  
    try {
      const response = await axios.request(config);
      setData(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching search results:', error);
      return { body: { hits: { hits: [] } } };
    }
  };

  useEffect(() => {
    fetchSearchResults('nike');
  },[]);

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
  
    if (query.length > 2) {
      const searchResults = await fetchSearchResults(query);
      const results = searchResults.body.hits.hits;
  
      setSearchResults(results);
      console.log(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleSearchClick = async () => {
    if (searchQuery.length > 2) {
      const results = await fetchSearchResults(searchQuery);
      if (results) {
        setTableData(results.body.hits.hits);
        setSelectedResult(null);
      }
    }
  };

  const handleResultClick = (result: SearchResult) => {
    setSelectedResult(result);
    setSearchQuery(result._source.mark_identification);
    setSearchResults([]);
  };

  useEffect(() => {
    if (selectedResult) {
      setTableData([selectedResult]);
    } else if (data && data.body && data.body.hits && data.body.hits.hits) {
      setTableData(data.body.hits.hits.slice(0, 5));
    }
  }, [selectedResult, data]);

  const formatDate = (date: Date): string => {
    const day = String(date.getUTCDate()).padStart(2, '0');
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    const month = monthNames[date.getUTCMonth()];
    const year = date.getUTCFullYear();
    return `${day} ${month} ${year}`;
  };

  return (
    <div className="flex flex-col items-center">
      {/*Navbar*/}
      <div className="nav bg-[#F8FAFE] h-28 w-full flex justify-start pl-16 items-center border-solid border-b-8 border-blue-100">
        <Image src={logo} className="logo" alt="logo w-24" />
        <div className="search ml-14 w-[500px] h-[50px] flex justify-start items-center rounded-md border-solid border-2 border-gray-300 bg-white text-gray-500 relative">
          <svg className="ml-4" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.976 20.4554L15.0377 16.5101M17.2202 11.2373C17.2202 13.2164 16.434 15.1145 15.0345 16.514C13.6351 17.9134 11.737 18.6996 9.75789 18.6996C7.77876 18.6996 5.8807 17.9134 4.48125 16.514C3.0818 15.1145 2.29559 13.2164 2.29559 11.2373C2.29559 9.25819 3.0818 7.36013 4.48125 5.96068C5.8807 4.56123 7.77876 3.77502 9.75789 3.77502C11.737 3.77502 13.6351 4.56123 15.0345 5.96068C16.434 7.36013 17.2202 9.25819 17.2202 11.2373V11.2373Z" stroke="#636363" strokeWidth="1.75583" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            placeholder="Search Trademark Here eg. Mickey Mouse"
            aria-label="Trademark Search"
            className="searchbar h-8 border-none focus:outline-none bg-none w-[450px]"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          {searchResults.length > 0 && (
            <div ref={searchResultsRef} className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-b-md shadow-lg z-10">
              {searchResults.map((result) => (
                <div
                  key={result._id}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleResultClick(result)}
                >
                  {result._source.mark_identification + ' - ' + result._source.current_owner}
                </div>
              ))}
            </div>
          )}
        </div>
        
        <button onClick={handleSearchClick} className="ml-4 bg-blue-500 text-white rounded-md h-[50px] w-24">Search</button>
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
          <div className="w-8/12 overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="p-4 font-semibold">Mark</th>
                  <th className="p-4 font-semibold">Details</th>
                  <th className="p-4 font-semibold w-40">Status</th>
                  <th className="p-4 font-semibold">Class/Description</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row: SearchResult) => (
                  <tr key={row._id} className="border-b border-gray-100">
                    <td className="p-4 align-top">
                      <div className="bg-white shadow-lg p-4 rounded-lg w-40 h-32 flex items-center justify-center">
                        <svg width="56" height="62" viewBox="0 0 56 62" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M49.226 0.613403H1.82021C1.37165 0.613403 0.923096 0.987373 0.923096 1.51051V57.6647C0.923096 58.1133 1.29706 58.5619 1.82021 58.5619L31.9536 58.5624C32.2524 58.5624 32.4772 58.1884 32.3275 57.8895C29.2617 52.9544 29.486 46.4493 33.4489 41.6639C34.2714 40.6171 35.2436 39.7946 36.2904 39.0466C36.6644 38.8223 36.4401 38.2986 36.0661 38.2986L5.11027 38.2992C5.03568 38.2992 4.96057 38.2246 4.96057 38.1495V4.42702C4.96057 4.35244 5.03516 4.27733 5.11027 4.27733H45.8613C45.9359 4.27733 46.011 4.35191 46.011 4.42702V36.3549C46.011 36.5792 46.1607 36.7289 46.385 36.7289C47.4318 36.8786 48.4786 37.1775 49.5255 37.626C49.8243 37.7757 50.1237 37.5514 50.1237 37.252V1.51073C50.1237 0.987589 49.7497 0.613619 49.2266 0.613619L49.226 0.613403Z" fill="#C8C8C8"/>
                              <path d="M49.226 0.613403H1.82021C1.37165 0.613403 0.923096 0.987373 0.923096 1.51051V57.6647C0.923096 58.1133 1.29706 58.5619 1.82021 58.5619L31.9536 58.5624C32.2524 58.5624 32.4772 58.1884 32.3275 57.8895C29.2617 52.9544 29.486 46.4493 33.4489 41.6639C34.2714 40.6171 35.2436 39.7946 36.2904 39.0466C36.6644 38.8223 36.4401 38.2986 36.0661 38.2986L5.11027 38.2992C5.03568 38.2992 4.96057 38.2246 4.96057 38.1495V4.42702C4.96057 4.35244 5.03516 4.27733 5.11027 4.27733H45.8613C45.9359 4.27733 46.011 4.35191 46.011 4.42702V36.3549C46.011 36.5792 46.1607 36.7289 46.385 36.7289C47.4318 36.8786 48.4786 37.1775 49.5255 37.626C49.8243 37.7757 50.1237 37.5514 50.1237 37.252V1.51073C50.1237 0.987589 49.7497 0.613619 49.2266 0.613619L49.226 0.613403Z" fill="#C8C8C8"/>
                              <path d="M20.3156 18.8327L25.9072 13.2411L32.5025 19.8364L26.9109 25.428L20.3156 18.8327Z" fill="#C8C8C8"/>
                              <path d="M29.1376 27.9668C28.6558 28.4485 27.8747 28.4485 27.3929 27.9668C26.9111 27.485 26.9111 26.7039 27.3929 26.2221L33.2978 20.3171C33.7796 19.8354 34.5607 19.8354 35.0425 20.3171C35.5243 20.7989 35.5243 21.58 35.0425 22.0618L29.1376 27.9668Z" fill="#C8C8C8"/>
                              <path d="M19.5198 18.349C19.0381 18.8307 18.2569 18.8307 17.7751 18.349C17.2934 17.8672 17.2934 17.0861 17.7751 16.6043L23.6801 10.6993C24.1618 10.2176 24.943 10.2176 25.4248 10.6993C25.9065 11.1811 25.9065 11.9622 25.4248 12.444L19.5198 18.349Z" fill="#C8C8C8"/>
                              <path d="M22.9646 21.481L24.2619 22.7782L14.8675 32.1722C14.5092 32.5305 13.9256 32.5277 13.5673 32.1694C13.3881 31.9902 13.2999 31.757 13.2999 31.5223C13.2999 31.2874 13.3909 31.0542 13.5701 30.875L22.9646 21.481Z" fill="#C8C8C8"/>
                              <path d="M20.9531 32.4289C20.9531 31.0945 22.0436 29.9957 23.3887 29.9957H35.134C36.4792 29.9957 37.5698 31.0946 37.5698 32.4289H20.9531Z" fill="#C8C8C8"/>
                              <path d="M51.2449 41.9627C46.5341 38.0743 39.5053 38.7477 35.6174 43.458C31.7291 48.1688 32.4025 55.1975 37.1128 59.0854C41.8236 62.9738 48.8523 62.3004 52.7402 57.5901C56.6285 52.8798 55.9557 45.8511 51.2449 41.9627ZM49.1513 44.5048C51.9177 46.7481 52.7402 50.5612 51.3194 53.7017C51.2448 53.8514 51.0206 53.926 50.8709 53.7763L39.73 44.5799C39.5803 44.4302 39.5803 44.2059 39.73 44.1313C42.5715 42.187 46.3848 42.262 49.1512 44.5048L49.1513 44.5048ZM39.2065 56.6183C36.4401 54.375 35.6176 50.5619 37.0384 47.4215C37.113 47.2718 37.3372 47.1972 37.4869 47.3469L48.7028 56.5438C48.8525 56.6935 48.8525 56.9177 48.7028 56.9923C45.8613 58.9363 41.9736 58.8616 39.2066 56.6183H39.2065Z" fill="#C8C8C8"/>
                        </svg>
                      </div>
                    </td>
                    <td className="p-4 align-top">
                      <div className="flex flex-col justify-between h-full">
                        <div>
                          <div className="font-bold">{row._source.mark_identification}</div>
                          <div className="text-sm text-gray-600">{row._source.current_owner}</div>
                        </div>
                        <div className="mt-2">
                          <div className="text-sm">{row._source.registration_number}</div>
                          <div className="text-sm text-gray-500">{formatDate(new Date(row._source.status_date * 1000))}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 align-top">
                      <div className="flex flex-col justify-between h-full">
                        <div>
                          <div className="flex items-center">
                            <span className={`h-2 w-2 ${row._source.status_code === 700 ? 'bg-green-500' : 'bg-yellow-500'} rounded-full mr-2`}></span>
                            <span className={row._source.status_code === 700 ? 'text-green-500' : 'text-yellow-500'}>{row._source.status_type}</span>
                          </div>
                          <div className="text-sm mt-2">on <b>{formatDate(new Date(row._source.registration_date * 1000))}</b></div>
                        </div>
                        <div className="text-xs flex items-center font-semibold mt-2">
                          <svg className="h-4 w-4 mr-1 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                          {formatDate(new Date(row._source.renewal_date * 1000))}
                        </div>
                      </div>
                    </td>
                    <td className="p-4 align-top">
                      <div>
                        <div>{row._source.mark_description_description[0].length > 200
                          ? row._source.mark_description_description[0].slice(0, 200) + '...'
                          : row._source.mark_description_description[0]}
                        </div>
                        <div className="flex mt-2 flex-wrap">
                          {row._source.class_codes.map((cls, idx) => (
                            <span key={idx} className="text-gray-700 px-2 py-1 rounded-full text-xs mr-1 mb-1 flex items-center font-semibold">
                              <svg width="17" height="22" viewBox="0 0 17 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                                <path d="M13.1289 10.1218L15.3047 5.61839L15.8339 5.87407C16.2085 6.05504 16.6589 5.89808 16.8399 5.52351C17.0208 5.14891 16.8639 4.69851 16.4893 4.51754C16.3119 4.43181 9.30265 1.04538 8.80709 0.805952C8.43252 0.624983 7.98212 0.781945 7.80115 1.15651C7.62018 1.53108 7.77714 1.98148 8.15171 2.16245L8.68093 2.41814L6.50513 6.92159C-0.456288 7.56705 -2.33925 17.1719 4.12813 20.2965C10.6042 23.4254 16.9495 15.9749 13.1289 10.1218ZM7.0169 8.39842C7.29679 8.38916 7.5484 8.22537 7.67021 7.97325L10.0374 3.07357L13.9481 4.96298L11.5809 9.86266C11.4591 10.1148 11.4872 10.4137 11.6538 10.6387C12.8302 12.2269 12.9644 13.8731 12.5923 15.2646L8.29117 13.1866C8.58073 12.4928 8.27935 11.683 7.59435 11.352L3.80026 9.51896C4.61344 8.88053 5.67642 8.44287 7.0169 8.39842ZM4.78353 18.94C1.35956 17.2857 0.87055 13.3112 2.71758 10.669L6.86988 12.6752C6.58031 13.3689 6.88169 14.1788 7.56669 14.5097L12.0157 16.6592C10.637 19.0657 7.69006 20.3443 4.78353 18.94Z" fill="#575757"/>
                              </svg>
                              {"class "+cls}
                            </span>
                          ))}
                          {row._source.class_codes.length > 3 && (
                            <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs flex items-center">...</span>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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

            {/* Check Section */}
            <div className="w-72 bg-white rounded-lg shadow p-4">
              <div className="flex space-x-4 mb-3">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    className={`${
                      activeTab === tab ? 'font-bold border-b-2 border-black' : 'text-gray-500'
                    }`}
                    onClick={() => setActiveTab(tab as TabName)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="relative mb-3">
                <input
                  type="text"
                  placeholder={`Search ${activeTab}`}
                  className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
              </div>
              <div className="h-48 overflow-y-auto">
                {listData[activeTab].map((item, index) => (
                  <div key={item.name} className="flex items-center py-2">
                    <div 
                      className={`w-5 h-5 mr-3 rounded ${
                        item.checked ? 'bg-blue-500' : 'border border-gray-300'
                      } flex items-center justify-center`}
                      onClick={() => toggleCheck(index)}
                    >
                      {item.checked && <Check className="text-white" size={16} />}
                    </div>
                    <span className={item.checked ? 'text-blue-500' : 'text-gray-700'}>
                      {item.name}
                    </span>
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
