export default function Footer() {  
  return (
    <footer className="border-t border-gray-200 g-black-800 text-white py-4 mt-12">
      <div className="container mx-auto text-center">
        <p>Copyright &copy; {new Date().getFullYear()} | OFI-S | All rights reserved</p>
      </div>
    </footer>
  );
}