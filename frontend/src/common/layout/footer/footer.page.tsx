const Footer = () => {

  return (
    <footer
      className="position-fixed bottom-0 w-100 text-center text-white bg-black"
      style={{ zIndex: 1000, boxShadow: "rgba(0, 0, 0, 0.45) 0px -25px 20px -20px" }}
    >
      <div className="container mt-3">
        <p>&copy; 2026 Galaxon. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;