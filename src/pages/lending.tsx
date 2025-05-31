"use client";

const Page: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col container">
      <header className="bg-white py-8 sm:py-12 lg:py-16">
        <p className="mon text-3xl sm:text-4xl lg:text-6xl font-semibold text-black text-center">
          Саха тыына
        </p>
        <p className="mt-2 text-base sm:text-lg lg:text-xl text-gray-600 text-center">
          Платформа для развития интереса
          <br />
          к якутской истории и культуры
        </p>
      </header>
      <section className="py-8 sm:py-10 lg:py-12">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-4 text-center">
          Мы создали квиз-игру, которая в увлекательной форме поможет вам узнать больше о прошлом региона, его выдающихся личностях и богатом наследии.
        </h2>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="w-full sm:w-1/2 h-40 sm:h-48 lg:h-56 bg-yellow-300 rounded-lg"></div>
          <div className="w-full sm:w-1/2 h-40 sm:h-48 lg:h-56 bg-purple-600 rounded-lg"></div>
        </div>
      </section>
      <section className="py-8 sm:py-10 lg:py-12">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-4 text-center">
          Наша цель — пробудить интерес к якутской истории среди молодежи и широкой аудитории через игру, визуальные материалы и доступный формат.
        </h2>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="w-full sm:w-1/2 h-40 sm:h-48 lg:h-56 bg-pink-400 rounded-lg"></div>
          <div className="w-full sm:w-1/2 h-40 sm:h-48 lg:h-56 bg-green-400 rounded-lg"></div>
        </div>
        <p className="mt-4 text-base sm:text-lg lg:text-xl text-gray-600 text-center">
          Вас ждут вопросы по четырем темам: от древних традиций и оленеводства до советского периода и национальной кухни.
          <br />
          Проверьте свои знания и узнайте новое о Якутии — весело, познавательно и адаптировано для любого устройства!
        </p>
      </section>
      <footer className="bg-white py-6 text-center mt-auto">
        <p className="text-base sm:text-lg font-semibold">
          Открой Якутии заново — играй, учись, вдохновляйся!
        </p>
      </footer>
    </div>
  );
};

export default Page;