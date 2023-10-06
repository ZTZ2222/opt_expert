const Loading = () => {
  return (
    <main className="mx-5 mb-10 flex animate-pulse flex-col gap-5 md:flex-row lg:mx-8 xl:mx-24">
      <div className="flex w-full flex-col gap-4 md:w-1/2 md:gap-10 lg:m-5 lg:w-1/2">
        <div className="h-12 w-10/12 self-center rounded-lg bg-gray-600 md:hidden"></div>
        <div className="h-[300px] w-2/3 self-center rounded-xl bg-gray-600 md:h-[400px] md:w-full xl:h-[600px]"></div>
        <ul className="flex items-center justify-center gap-3">
          <li className="h-3 w-3 rounded-lg bg-gray-600 md:h-16 md:w-1/6 xl:h-24"></li>
          <li className="h-3 w-3 rounded-lg bg-gray-600 md:h-16 md:w-1/6 xl:h-24"></li>
          <li className="h-3 w-3 rounded-lg bg-gray-600 md:h-16 md:w-1/6 xl:h-24"></li>
          <li className="h-3 w-3 rounded-lg bg-gray-600 md:h-16 md:w-1/6 xl:h-24"></li>
        </ul>
      </div>
      <div className="flex w-full flex-col md:w-1/2 lg:m-5 lg:w-1/2">
        <ul className="flex flex-col gap-4 xl:gap-5">
          <li className="h-12 w-10/12 self-center rounded-lg bg-gray-600 md:self-start lg:h-10"></li>
          <li className="h-4 w-1/4 self-center rounded-lg bg-gray-600 md:self-start lg:h-6"></li>
          <li className="h-8 w-2/3 self-center rounded-lg bg-gray-600 md:self-start lg:h-10"></li>
          <li className="h-10 w-2/5 self-center rounded-3xl bg-purple-600 md:self-start lg:h-12"></li>
          <li className="h-4 w-1/3 rounded-lg bg-gray-600 lg:h-6"></li>
          <li className="h-12 w-2/3 rounded-lg bg-gray-600 lg:h-20"></li>
          <li className="h-4 w-1/3 rounded-lg bg-gray-600 lg:h-6"></li>
          <li className="h-6 w-2/3 rounded-lg bg-gray-600 lg:h-10"></li>
          <li className="h-6 w-2/3 rounded-lg bg-gray-600 lg:h-10"></li>
          <li className="h-4 w-1/3 rounded-lg bg-gray-600 lg:h-6"></li>
          <li className="h-6 w-2/3 rounded-lg bg-gray-600 lg:h-10"></li>
        </ul>
      </div>
    </main>
  );
};

export default Loading;
