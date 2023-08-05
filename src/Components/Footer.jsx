import "./Footer.css";
import CallIcon from "@mui/icons-material/Call";
import LocationOnIcon from "@mui/icons-material/LocationOn";
// import {icon} from "../img/index";


export default function Footer() {
  return (
    <div className="Footer-container">
      <section className="contact-area" id="contact">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="contact-content text-center">
                <div className="contact-social">
                {/* <img src={icon} alt="..." width="100"/> */}

                  <ul style={{display: "flex", alignItems: "center", justifyContent: "center"}}>

                    <li>
                      <CallIcon /> +91-123445678
                    </li>
                    <li>
                      <LocationOnIcon /> Ratlam [M.P.]
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer>
        <p>Copyright &copy; 2023 Rights Reserved.</p>
      </footer>
    </div>
  );
}
