import React, { useState } from 'react';
import Image from 'next/image';
import {
  MagnifyingGlassIcon,
  UserIcon,
  GlobeAltIcon,
  Bars3Icon,
} from '@heroicons/react/24/solid';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { useRouter } from 'next/router';

const Header = ({ placeholder }: { placeholder: string }) => {
  const [searchInput, setSearchInput] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [numberOfGuests, setNumberOfGuests] = useState('1');
  const router = useRouter();

  const selectionRange = {
    startDate,
    endDate,
    key: 'selection',
  };

  const selectHandler = (ranges: any) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  const cancelHandler = () => {
    setSearchInput('');
    setStartDate(new Date());
    setEndDate(new Date());
    setNumberOfGuests('1');
  };

  const searchHandler = () => {
    router.push({
      pathname: '/search',
      query: {
        location: searchInput,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        numberOfGuests: numberOfGuests,
      },
    });
  };

  return (
    <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md p-5 md:px-10">
      <div
        onClick={() => router.push('/')}
        className="relative flex items-center h-10 cursor-pointer my-auto"
      >
        <Image
          src={'https://links.papareact.com/qd3'}
          alt="airbnb_image"
          fill
          style={{ objectFit: 'contain', objectPosition: 'left' }}
        />
      </div>
      <div className="flex items-center rounded-full md:border-2 py-2">
        <input
          type="text"
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
          placeholder={placeholder ? placeholder : 'Start your search'}
          className="pl-5 bg-transparent outline-none flex-grow"
        />
        <MagnifyingGlassIcon className="h-8 bg-red-400 text-white p-2 rounded-full cursor-pointer hidden md:inline-flex md:mx-2" />
      </div>
      <div className="flex items-center space-x-4 justify-end text-gray-500">
        <p className="hidden md:inline cursor-pointer">Become a host</p>
        <GlobeAltIcon className="h-6 cursor-pointer" />
        <div className="flex items-center space-x-2 border-2 rounded-full p-2 cursor-pointer">
          <Bars3Icon className="h-6" />
          <UserIcon className="h-6" />
        </div>
      </div>
      {searchInput && (
        <div className="flex flex-col col-span-3 mx-auto mt-10">
          <DateRangePicker
            ranges={[selectionRange]}
            minDate={new Date()}
            rangeColors={['#fd5b61']}
            onChange={ranges => selectHandler(ranges)}
          />
          <div className="flex items-center border-b mb-4">
            <h2 className="text-2xl flex-grow font-semibold">
              Number of guests
            </h2>
            <UserIcon className="h-5" />
            <input
              type="number"
              value={numberOfGuests}
              onChange={e => setNumberOfGuests(e.target.value)}
              min={'1'}
              className="w-12 pl-2 text-lg outline-none text-red-400"
            />
          </div>
          <div className="flex">
            <button
              className="flex-grow text-gray-500"
              onClick={() => cancelHandler()}
            >
              Cancel
            </button>
            <button
              onClick={() => searchHandler()}
              className="flex-grow text-red-400"
            >
              Search
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
