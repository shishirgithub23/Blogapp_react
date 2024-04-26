import React from "react";

function Footer() {
  return (
    <div>
      <footer id="footer" className="footer">
        <div className="footer-legal text-center position-relative">
          <div className="container">
            <div className="copyright">
              © Copyright{" "}
              <strong>
                <span>Blog</span>
              </strong>
              . All Rights Reserved
            </div>
            <div className="credits">
              Designed by <a href="https://thesoftminds.com/">Blog</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
