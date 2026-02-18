export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} DomikStay. Все права защищены.
          </p>
          <div className="flex gap-4 text-sm text-gray-500">
            <a href="tel:+70000000000" className="hover:text-emerald-600 transition-colors">
              Телефон
            </a>
            <a href="mailto:info@domikstay.ru" className="hover:text-emerald-600 transition-colors">
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
