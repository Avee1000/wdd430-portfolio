export default function Footer() {  
  return (
    <footer className="bg-black border-t border-gray-200 g-black-800 text-white py-4">
      <div className="container mx-auto text-center">
        <p>Copyright &copy; {new Date().getFullYear()} | OFI-S | All rights reserved</p>
      </div>
    </footer>
  );
}