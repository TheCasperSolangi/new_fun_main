const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="px-6 py-4">
        <p className="text-sm text-center text-gray-500">
          © {new Date().getFullYear()} Admin Dashboard. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;